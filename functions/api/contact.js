const UPSTREAM_URL = 'https://script.google.com/macros/s/AKfycbwcgILUioi3I3ndTIrnlZ9KtdN-YxpwCQaLEcradUc1vDZfsa-jSwllYfSdOju4vj8/exec';
const MAX_BODY_BYTES = 24 * 1024;
const MIN_FILL_TIME_MS = 1800;
const MAX_FILL_TIME_MS = 24 * 60 * 60 * 1000;
const IP_COOLDOWN_SECONDS = 15;
const PHONE_COOLDOWN_SECONDS = 120;

const localRateLimits = globalThis.__CRUISE_CONTACT_RATE_LIMITS__ || new Map();
globalThis.__CRUISE_CONTACT_RATE_LIMITS__ = localRateLimits;

const ALLOWED_PEOPLE_COUNTS = new Set(['1', '2', '3', '4', '5+']);
const ALLOWED_AGE_GROUPS = new Set(['', '20대', '30대', '40대', '50대', '60대 이상']);
const ALLOWED_READY_STATUSES = new Set([
  '',
  '여권만 있습니다.',
  '해외결제카드만 있습니다.',
  '둘 다 가지고 있습니다.',
  '둘 다 없습니다.',
  '확인 후 안내드릴게요.',
  '있음',
  '없음'
]);

function jsonResponse(payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders
    }
  });
}

function stripControlCharacters(value) {
  return String(value == null ? '' : value)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
}

function cleanLine(value, maxLength) {
  return stripControlCharacters(value)
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function cleanMultiline(value, maxLength) {
  return stripControlCharacters(value)
    .replace(/\r\n?/g, '\n')
    .trim()
    .slice(0, maxLength);
}

function protectSheetFormula(value) {
  const text = String(value == null ? '' : value);
  return /^\s*[=+\-@]/.test(text) ? `'${text}` : text;
}

function safeAgentCode(value) {
  const text = cleanLine(value, 40);
  return /^[A-Za-z0-9_-]*$/.test(text) ? text : '';
}

function safeScheduleId(value) {
  const text = cleanLine(value, 80);
  return /^[A-Za-z0-9가-힣_.:+-]+$/.test(text) ? text : '';
}

function safeHttpUrl(value, baseOrigin, ownOriginOnly = false) {
  const text = cleanLine(value, 500);
  if (!text) return '';

  try {
    const parsed = new URL(text, baseOrigin);
    if (!['http:', 'https:'].includes(parsed.protocol)) return '';
    if (ownOriginOnly && parsed.origin !== baseOrigin) return '';
    parsed.username = '';
    parsed.password = '';
    return parsed.toString().slice(0, 500);
  } catch (error) {
    return '';
  }
}

function getRequestSiteOrigin(request) {
  return new URL(request.url).origin;
}

function isSameOriginRequest(request) {
  const siteOrigin = getRequestSiteOrigin(request);
  const origin = request.headers.get('Origin');
  const referer = request.headers.get('Referer');
  const fetchSite = String(request.headers.get('Sec-Fetch-Site') || '').toLowerCase();

  if (origin && origin !== siteOrigin) return false;

  if (!origin && referer) {
    try {
      if (new URL(referer).origin !== siteOrigin) return false;
    } catch (error) {
      return false;
    }
  }

  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) return false;
  return Boolean(origin || referer || fetchSite === 'same-origin' || fetchSite === 'same-site');
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(String(value));
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function pruneLocalLimits(now) {
  if (localRateLimits.size < 500) return;
  for (const [key, expiresAt] of localRateLimits.entries()) {
    if (expiresAt <= now) localRateLimits.delete(key);
  }
}

async function consumeRateLimit(context, key, ttlSeconds) {
  const now = Date.now();
  pruneLocalLimits(now);

  const localExpiry = Number(localRateLimits.get(key) || 0);
  if (localExpiry > now) return true;

  const digest = await sha256(key);
  const markerUrl = new URL('/__security/contact-rate/' + digest, context.request.url).toString();
  const markerRequest = new Request(markerUrl, { method: 'GET' });
  const cache = caches.default;
  const cached = await cache.match(markerRequest);
  if (cached) return true;

  const expiresAt = now + ttlSeconds * 1000;
  localRateLimits.set(key, expiresAt);

  const markerResponse = new Response('1', {
    headers: {
      'Cache-Control': `public, max-age=${ttlSeconds}`,
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
  context.waitUntil(cache.put(markerRequest, markerResponse));
  return false;
}

function getClientIp(request) {
  return cleanLine(
    request.headers.get('CF-Connecting-IP') ||
      request.headers.get('X-Forwarded-For') ||
      'unknown',
    80
  );
}

function validateStartedAt(value) {
  const startedAt = Number(value);
  if (!Number.isFinite(startedAt) || startedAt <= 0) return false;
  const elapsed = Date.now() - startedAt;
  return elapsed >= MIN_FILL_TIME_MS && elapsed <= MAX_FILL_TIME_MS;
}

function appendForwardedField(output, name, value) {
  if (value !== '' && value != null) output.set(name, String(value));
}

export async function onRequestPost(context) {
  const { request } = context;

  if (!isSameOriginRequest(request)) {
    return jsonResponse({ success: false, message: '허용되지 않은 요청입니다.' }, 403);
  }

  if (request.headers.get('X-Requested-With') !== 'XMLHttpRequest') {
    return jsonResponse({ success: false, message: '올바른 제출 방식이 아닙니다.' }, 403);
  }

  const contentType = String(request.headers.get('Content-Type') || '').toLowerCase();
  if (!contentType.includes('multipart/form-data') && !contentType.includes('application/x-www-form-urlencoded')) {
    return jsonResponse({ success: false, message: '지원하지 않는 요청 형식입니다.' }, 415);
  }

  const contentLength = Number(request.headers.get('Content-Length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ success: false, message: '입력 내용이 너무 깁니다.' }, 413);
  }

  let raw;
  try {
    raw = await request.formData();
  } catch (error) {
    return jsonResponse({ success: false, message: '입력 내용을 확인할 수 없습니다.' }, 400);
  }

  // Honeypot은 봇에게 성공처럼 응답해 재시도를 줄입니다.
  if (cleanLine(raw.get('website'), 200)) {
    return jsonResponse({ success: true, message: '문의가 정상 접수되었습니다.' });
  }

  if (!validateStartedAt(raw.get('form_started_at'))) {
    return jsonResponse({ success: false, message: '입력 시간이 올바르지 않습니다. 페이지를 새로고침 후 다시 시도해주세요.' }, 400);
  }

  const formType = cleanLine(raw.get('form_type'), 20) === 'partner' ? 'partner' : 'main';
  const name = cleanLine(raw.get('name'), 40);
  const phone = cleanLine(raw.get('phone'), 30).replace(/\D+/g, '');
  const peopleCount = cleanLine(raw.get('people_count'), 10);
  const ageGroup = cleanLine(raw.get('age_group'), 20);
  const readyStatus = cleanLine(raw.get('travel_ready_status'), 60);
  const privacyAgree = cleanLine(raw.get('privacy_agree'), 5);

  let scheduleId = safeScheduleId(raw.get('interest_schedule_id') || raw.get('schedule_id'));
  if (formType === 'partner') scheduleId = 'partner_membership';

  if (name.length < 2) {
    return jsonResponse({ success: false, message: '성함을 2자 이상 입력해주세요.' }, 400);
  }
  if (phone.length < 9 || phone.length > 11) {
    return jsonResponse({ success: false, message: '연락처를 정확히 입력해주세요.' }, 400);
  }
  if (!scheduleId) {
    return jsonResponse({ success: false, message: '문의 항목을 선택해주세요.' }, 400);
  }
  if (!ALLOWED_PEOPLE_COUNTS.has(peopleCount)) {
    return jsonResponse({ success: false, message: '인원수를 다시 선택해주세요.' }, 400);
  }
  if (!ALLOWED_AGE_GROUPS.has(ageGroup)) {
    return jsonResponse({ success: false, message: '연령대를 다시 선택해주세요.' }, 400);
  }
  if (!ALLOWED_READY_STATUSES.has(readyStatus)) {
    return jsonResponse({ success: false, message: '준비 상태를 다시 선택해주세요.' }, 400);
  }
  if (privacyAgree !== 'Y') {
    return jsonResponse({ success: false, message: '개인정보 수집 및 이용 동의가 필요합니다.' }, 400);
  }

  const clientIp = getClientIp(request);
  const phoneHash = await sha256(phone);

  if (await consumeRateLimit(context, `ip:${clientIp}`, IP_COOLDOWN_SECONDS)) {
    return jsonResponse(
      { success: false, message: '연속 제출이 감지되었습니다. 잠시 후 다시 시도해주세요.' },
      429,
      { 'Retry-After': String(IP_COOLDOWN_SECONDS) }
    );
  }

  if (await consumeRateLimit(context, `phone:${phoneHash}`, PHONE_COOLDOWN_SECONDS)) {
    return jsonResponse(
      { success: false, message: '같은 연락처로 이미 문의가 접수되었습니다. 잠시 후 다시 시도해주세요.' },
      429,
      { 'Retry-After': String(PHONE_COOLDOWN_SECONDS) }
    );
  }

  const siteOrigin = getRequestSiteOrigin(request);
  const forwarded = new FormData();

  appendForwardedField(forwarded, 'name', protectSheetFormula(name));
  appendForwardedField(forwarded, 'phone', phone);
  appendForwardedField(forwarded, 'interest_schedule_id', scheduleId);
  appendForwardedField(forwarded, 'schedule_id', scheduleId);
  appendForwardedField(forwarded, 'people_count', peopleCount);
  appendForwardedField(forwarded, 'region_detail', protectSheetFormula(cleanLine(raw.get('region_detail'), 80)));
  appendForwardedField(forwarded, 'travel_ready_status', readyStatus);
  appendForwardedField(forwarded, 'age_group', ageGroup);
  appendForwardedField(forwarded, 'message', protectSheetFormula(cleanMultiline(raw.get('message'), 1500)));
  appendForwardedField(forwarded, 'partner_message', protectSheetFormula(cleanMultiline(raw.get('partner_message'), 1000)));
  appendForwardedField(forwarded, 'agent_code', safeAgentCode(raw.get('agent_code')));
  appendForwardedField(forwarded, 'utm_source', protectSheetFormula(cleanLine(raw.get('utm_source'), 80)));
  appendForwardedField(forwarded, 'utm_medium', protectSheetFormula(cleanLine(raw.get('utm_medium'), 80)));
  appendForwardedField(forwarded, 'utm_campaign', protectSheetFormula(cleanLine(raw.get('utm_campaign'), 80)));
  appendForwardedField(forwarded, 'page_url', safeHttpUrl(raw.get('page_url'), siteOrigin, true) || siteOrigin + '/');
  appendForwardedField(forwarded, 'referrer', safeHttpUrl(raw.get('referrer'), siteOrigin, false));
  appendForwardedField(forwarded, 'site_name', formType === 'partner' ? '크루즈 제휴마케팅' : '크루즈플레이');

  if (formType === 'partner') {
    appendForwardedField(forwarded, 'raw_type', 'partner_inquiry');
    appendForwardedField(forwarded, 'inquiry_type', 'partner');
  }

  let upstreamResponse;
  try {
    upstreamResponse = await fetch(UPSTREAM_URL, {
      method: 'POST',
      body: forwarded,
      redirect: 'follow',
      headers: {
        'User-Agent': 'CruisePlay-Contact-Proxy/1.0'
      }
    });
  } catch (error) {
    return jsonResponse({ success: false, message: '접수 서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.' }, 502);
  }

  if (!upstreamResponse.ok) {
    return jsonResponse({ success: false, message: '접수 서버가 요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.' }, 502);
  }

  let upstreamData = null;
  try {
    upstreamData = await upstreamResponse.json();
  } catch (error) {
    upstreamData = null;
  }

  if (!upstreamData || upstreamData.success !== true) {
    return jsonResponse({ success: false, message: '문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요.' }, 502);
  }

  return jsonResponse({ success: true, message: '문의가 정상 접수되었습니다.' });
}

export function onRequestGet() {
  return jsonResponse({ success: false, message: 'POST 요청만 허용됩니다.' }, 405, { Allow: 'POST' });
}
