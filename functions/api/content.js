const STATIC_BOOTSTRAP_PATH = '/assets/data/bootstrap-fallback.json';

function javascriptResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cross-Origin-Resource-Policy': 'same-origin'
    }
  });
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow'
    }
  });
}

function getSafeCallback(url) {
  const callback = String(url.searchParams.get('callback') || '').trim();
  if (!callback) return '';
  return /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback) ? callback : '';
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);

  if (url.searchParams.get('action') !== 'bootstrap') {
    return jsonResponse({ success: false, message: '지원하지 않는 요청입니다.' }, 404);
  }

  const callback = getSafeCallback(url);
  if (!callback) {
    return jsonResponse({ success: false, message: 'callback이 필요합니다.' }, 400);
  }

  let assetResponse;
  try {
    const assetUrl = new URL(STATIC_BOOTSTRAP_PATH, context.request.url);
    assetResponse = await context.env.ASSETS.fetch(assetUrl);
  } catch (error) {
    return javascriptResponse(
      `${callback}(${JSON.stringify({ success: false, message: '정적 콘텐츠를 불러오지 못했습니다.' })});`,
      500
    );
  }

  if (!assetResponse.ok) {
    return javascriptResponse(
      `${callback}(${JSON.stringify({ success: false, message: '정적 콘텐츠 파일이 없습니다.' })});`,
      500
    );
  }

  let data;
  try {
    data = await assetResponse.json();
  } catch (error) {
    return javascriptResponse(
      `${callback}(${JSON.stringify({ success: false, message: '정적 콘텐츠 형식이 올바르지 않습니다.' })});`,
      500
    );
  }

  return javascriptResponse(`${callback}(${JSON.stringify({ success: true, data })});`);
}

export function onRequestPost() {
  return jsonResponse({ success: false, message: '콘텐츠 API는 조회 전용입니다.' }, 405);
}
