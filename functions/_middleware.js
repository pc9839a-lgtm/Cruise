const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), browsing-topics=()',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Content-Security-Policy': "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://script.google.com https://script.googleusercontent.com; upgrade-insecure-requests"
};

class SecurityScriptInjector {
  element(element) {
    element.append(
      '<script src="/assets/js/security-guard.js?v=20260712-security" defer></script>',
      { html: true }
    );
  }
}

function applySecurityHeaders(headers) {
  Object.entries(SECURITY_HEADERS).forEach(([name, value]) => {
    headers.set(name, value);
  });
  return headers;
}

export async function onRequest(context) {
  const response = await context.next();
  const headers = applySecurityHeaders(new Headers(response.headers));
  const contentType = String(headers.get('Content-Type') || '').toLowerCase();

  let securedResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });

  if (contentType.includes('text/html')) {
    securedResponse = new HTMLRewriter()
      .on('body', new SecurityScriptInjector())
      .transform(securedResponse);
  }

  return securedResponse;
}
