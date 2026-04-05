/**
 * Cruise Landing - Google Apps Script
 *
 * 시트 탭명
 * - settings
 * - agents
 * - schedules
 * - schedule_days
 * - reviews
 * - inquiries
 * - mail_logs
 */

const SHEET_NAMES = {
  settings: 'settings',
  agents: 'agents',
  schedules: 'schedules',
  scheduleDays: 'schedule_days',
  reviews: 'reviews',
  inquiries: 'inquiries',
  mailLogs: 'mail_logs'
};

function doGet(e) {
  try {
    const action = (e.parameter.action || 'bootstrap').toLowerCase();
    if (action !== 'bootstrap') {
      return createJsonpOrJson_({ success: false, message: 'Unsupported action' }, e.parameter.callback);
    }

    const payload = getBootstrapPayload_(e.parameter.agent || '');
    return createJsonpOrJson_(payload, e.parameter.callback);
  } catch (error) {
    return createJsonpOrJson_({ success: false, message: String(error) }, e && e.parameter ? e.parameter.callback : '');
  }
}

function doPost(e) {
  try {
    const params = e.parameter || {};
    validateInquiry_(params);

    const settings = getSettingsObject_();
    const agents = getRowsByHeader_(SHEET_NAMES.agents).filter(function (row) {
      return normalizeString_(row.use_yn) !== 'N';
    });

    const matchedAgent = findAgent_(agents, params.agent_code || '');
    const assignedEmail = matchedAgent ? matchedAgent.email : (settings.admin_email || '');
    const createdAt = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
    const inquiryKey = Utilities.getUuid();

    appendByHeader_(SHEET_NAMES.inquiries, {
      created_at: createdAt,
      name: params.name || '',
      phone: params.phone || '',
      interest_schedule_id: params.interest_schedule_id || '',
      interest_region: params.interest_region || '',
      departure_month: params.departure_month || '',
      people_count: params.people_count || '',
      memo: params.memo || '',
      agent_code: params.agent_code || '',
      utm_source: params.utm_source || '',
      utm_medium: params.utm_medium || '',
      utm_campaign: params.utm_campaign || '',
      landing_page: params.landing_page || '',
      referrer: params.referrer || '',
      site_name: params.site_name || settings.site_name || '',
      assigned_email: assignedEmail,
      mail_sent: 'PENDING',
      status: 'NEW'
    });

    const mailResult = sendInquiryEmails_({
      createdAt: createdAt,
      inquiryKey: inquiryKey,
      params: params,
      assignedEmail: assignedEmail,
      adminEmail: settings.admin_email || '',
      agentName: matchedAgent ? matchedAgent.agent_name : ''
    });

    updateLastInquiryMailState_(mailResult.success ? 'Y' : 'N');
    appendByHeader_(SHEET_NAMES.mailLogs, {
      sent_at: createdAt,
      inquiry_key: inquiryKey,
      receiver_email: [assignedEmail, settings.admin_email || ''].filter(Boolean).join(', '),
      result: mailResult.success ? 'SUCCESS' : 'FAIL',
      error_message: mailResult.success ? '' : mailResult.message
    });

    return createPostMessageHtml_(true, '문의가 정상 접수되었습니다.');
  } catch (error) {
    return createPostMessageHtml_(false, String(error));
  }
}

function getBootstrapPayload_(agentCode) {
  const settings = getSettingsObject_();
  const agents = getRowsByHeader_(SHEET_NAMES.agents).filter(function (row) {
    return normalizeString_(row.use_yn) !== 'N';
  });
  const schedules = getRowsByHeader_(SHEET_NAMES.schedules)
    .filter(function (row) { return normalizeString_(row.status) === 'PUBLIC'; })
    .sort(function (a, b) { return Number(a.sort_order || 9999) - Number(b.sort_order || 9999); });
  const scheduleDays = getRowsByHeader_(SHEET_NAMES.scheduleDays)
    .sort(function (a, b) {
      if (a.schedule_id === b.schedule_id) return Number(a.day_no || 0) - Number(b.day_no || 0);
      return String(a.schedule_id).localeCompare(String(b.schedule_id));
    });
  const reviews = getRowsByHeader_(SHEET_NAMES.reviews)
    .filter(function (row) { return normalizeString_(row.status) === 'PUBLIC'; })
    .sort(function (a, b) { return Number(a.sort_order || 9999) - Number(b.sort_order || 9999); });

  return {
    success: true,
    settings: settings,
    agent: findAgent_(agents, agentCode),
    schedules: schedules,
    schedule_days: scheduleDays,
    reviews: reviews
  };
}

function sendInquiryEmails_(context) {
  try {
    const mailSubject = '[' + (context.params.site_name || 'Cruise Direct') + '] 신규 상담문의 - ' + (context.params.name || '이름없음');
    const lines = [
      '신규 상담문의가 접수되었습니다.',
      '',
      '접수시간: ' + context.createdAt,
      '담당자: ' + (context.agentName || context.params.agent_code || '기본 담당자'),
      '이름: ' + (context.params.name || ''),
      '연락처: ' + (context.params.phone || ''),
      '관심 일정: ' + (context.params.interest_schedule_id || ''),
      '관심 지역: ' + (context.params.interest_region || ''),
      '출발 희망 시기: ' + (context.params.departure_month || ''),
      '인원수: ' + (context.params.people_count || ''),
      '문의 내용: ' + (context.params.memo || ''),
      '',
      'agent_code: ' + (context.params.agent_code || ''),
      'utm_source: ' + (context.params.utm_source || ''),
      'utm_medium: ' + (context.params.utm_medium || ''),
      'utm_campaign: ' + (context.params.utm_campaign || ''),
      'landing_page: ' + (context.params.landing_page || ''),
      'referrer: ' + (context.params.referrer || '')
    ];

    const recipients = [context.assignedEmail, context.adminEmail]
      .filter(Boolean)
      .filter(function (value, index, array) { return array.indexOf(value) === index; });

    if (!recipients.length) {
      throw new Error('발송 대상 이메일이 없습니다. settings.admin_email 또는 agents.email을 확인해주세요.');
    }

    MailApp.sendEmail({
      to: recipients.join(','),
      subject: mailSubject,
      body: lines.join('\n')
    });

    return { success: true, message: '' };
  } catch (error) {
    return { success: false, message: String(error) };
  }
}

function validateInquiry_(params) {
  if (!params.name) throw new Error('이름이 없습니다.');
  if (!params.phone) throw new Error('연락처가 없습니다.');
}

function findAgent_(agents, agentCode) {
  if (!agentCode) return null;
  const matched = agents.filter(function (row) {
    return String(row.agent_code || '').trim() === String(agentCode || '').trim();
  });
  return matched.length ? matched[0] : null;
}

function getSettingsObject_() {
  const rows = getRowsByHeader_(SHEET_NAMES.settings);
  const result = {};

  rows.forEach(function (row) {
    const key = row.key;
    const value = row.value;
    if (!key) return;
    if (key === 'trust_items') {
      result[key] = String(value || '').split('|').filter(Boolean);
    } else {
      result[key] = value;
    }
  });

  return result;
}

function getRowsByHeader_(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) throw new Error('시트 탭이 없습니다: ' + sheetName);

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map(function (header) { return String(header).trim(); });
  return values.slice(1).filter(function (row) {
    return row.some(function (cell) { return String(cell).trim() !== ''; });
  }).map(function (row) {
    const item = {};
    headers.forEach(function (header, index) {
      item[header] = row[index];
    });
    return item;
  });
}

function appendByHeader_(sheetName, dataObject) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) throw new Error('시트 탭이 없습니다: ' + sheetName);

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = headers.map(function (header) {
    return typeof dataObject[header] === 'undefined' ? '' : dataObject[header];
  });
  sheet.appendRow(row);
}

function updateLastInquiryMailState_(value) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.inquiries);
  if (!sheet) return;
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const targetIndex = headers.indexOf('mail_sent');
  if (targetIndex === -1) return;
  sheet.getRange(lastRow, targetIndex + 1).setValue(value);
}

function createJsonpOrJson_(payload, callbackName) {
  if (callbackName && isValidCallbackName_(callbackName)) {
    const output = ContentService.createTextOutput(callbackName + '(' + JSON.stringify(payload) + ');');
    output.setMimeType(ContentService.MimeType.JAVASCRIPT);
    return output;
  }

  const json = ContentService.createTextOutput(JSON.stringify(payload));
  json.setMimeType(ContentService.MimeType.JSON);
  return json;
}

function createPostMessageHtml_(success, message) {
  const safeMessage = sanitizeForScript_(message || '');
  const html = '<!doctype html><html><body><script>' +
    'window.top.postMessage({' +
      'type:"CRUISE_FORM_RESULT",' +
      'success:' + (success ? 'true' : 'false') + ',' +
      'message:"' + safeMessage + '"' +
    '}, "*");' +
    '</script></body></html>';

  return HtmlService.createHtmlOutput(html);
}

function sanitizeForScript_(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, ' ')
    .replace(/\r/g, ' ');
}

function isValidCallbackName_(value) {
  return /^[a-zA-Z_$][0-9a-zA-Z_$\.]{0,100}$/.test(String(value || ''));
}

function normalizeString_(value) {
  return String(value || '').trim().toUpperCase();
}
