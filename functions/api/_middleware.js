function cleanValue(value, maxLength) {
  return String(value == null ? '' : value)
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function toAgeGroup(age) {
  if (age >= 60) return '60대 이상';
  if (age >= 50) return '50대';
  if (age >= 40) return '40대';
  if (age >= 30) return '30대';
  return '20대';
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  if (request.method !== 'POST' || url.pathname !== '/api/contact') {
    return context.next();
  }

  const contentType = String(request.headers.get('Content-Type') || '').toLowerCase();
  if (!contentType.includes('multipart/form-data') && !contentType.includes('application/x-www-form-urlencoded')) {
    return context.next();
  }

  let formData;
  try {
    formData = await request.clone().formData();
  } catch (error) {
    return context.next();
  }

  if (cleanValue(formData.get('form_type'), 20) !== 'partner') {
    return context.next();
  }

  const exactAge = cleanValue(formData.get('age_group'), 3);
  if (/^\d{1,2}$/.test(exactAge)) {
    const numericAge = Number(exactAge);
    if (numericAge >= 18 && numericAge <= 99) {
      formData.set('age_group', toAgeGroup(numericAge));
      formData.set('partner_age_exact', exactAge);

      const currentMessage = cleanValue(formData.get('partner_message'), 1000);
      if (currentMessage && !currentMessage.includes('입력 나이:')) {
        formData.set('partner_message', `입력 나이: ${exactAge}\n${currentMessage}`);
      }
    }
  }

  if (cleanValue(formData.get('travel_ready_status'), 60) === '미입력') {
    formData.set('travel_ready_status', '');
  }

  const headers = new Headers(request.headers);
  headers.delete('Content-Type');
  headers.delete('Content-Length');

  const nextRequest = new Request(request.url, {
    method: request.method,
    headers,
    body: formData,
    redirect: request.redirect
  });

  return context.next(nextRequest);
}
