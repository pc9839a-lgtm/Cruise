const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), browsing-topics=()',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
  'Strict-Transport-Security': 'max-age=31536000',
  'Content-Security-Policy': "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src-attr 'none'; upgrade-insecure-requests"
};

const EARLY_QUERY_GUARD = `<script>(function(){try{var u=new URL(location.href);var n=new URLSearchParams();var rules={agent:40,utm_source:80,utm_medium:80,utm_campaign:80,inquiryType:40};Object.keys(rules).forEach(function(k){var v=(u.searchParams.get(k)||'').replace(/[\\u0000-\\u001f\\u007f<>]/g,'').trim().slice(0,rules[k]);if(!v)return;if(k==='agent'&&!/^[A-Za-z0-9_-]+$/.test(v))return;if(k==='inquiryType'&&!/^[A-Za-z0-9_-]+$/.test(v))return;n.set(k,v)});if(u.searchParams.get('openInquiry')==='1')n.set('openInquiry','1');var s=n.toString();var clean=u.pathname+(s?'?'+s:'')+u.hash;if(clean!==u.pathname+u.search+u.hash)history.replaceState(null,'',clean)}catch(e){}})();</script>`;
const RSS_DISCOVERY_LINK = '<link rel="alternate" type="application/rss+xml" title="크루즈플레이 콘텐츠 RSS" href="/rss.xml" />';
const PARTNER_SITEMAP_ENTRY = '  <url><loc>https://cruiseplay-dyt.pages.dev/partner/</loc><lastmod>2026-07-14</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>';
const PARTNER_EDGE_STYLE = `<style id="partner-edge-image-fix">
.actual-photo,.benefit-visual{position:relative!important;overflow:hidden!important;background-color:#dfe7f2!important}
.hero-bg{display:block!important;opacity:1!important;visibility:visible!important}
</style>`;
const PARTNER_DIRECT_ASSETS = '<link rel="stylesheet" href="/partner/partner-direct-images-v6.css?v=20260714-force-v10">';

class HeadSecurityInjector {
  constructor(isPartner) { this.isPartner = isPartner; }
  element(element) {
    element.prepend(EARLY_QUERY_GUARD, { html: true });
    element.append(RSS_DISCOVERY_LINK, { html: true });
    if (this.isPartner) {
      element.append(PARTNER_EDGE_STYLE, { html: true });
      element.append(PARTNER_DIRECT_ASSETS, { html: true });
    }
  }
}

class SecurityScriptInjector {
  constructor(isPartner) { this.isPartner = isPartner; }
  element(element) {
    let scripts = '<script src="/assets/js/security-guard.js?v=20260712-security" defer></script><script src="/assets/js/partner-link.js?v=20260712-partner-entry" defer></script>';
    if (this.isPartner) {
      scripts += '<script src="/partner/partner-force-images-v10.js?v=20260714-force-v10" defer></script>';
    }
    element.append(scripts, { html: true });
  }
}

class PartnerHeroInjector {
  element(element) {
    element.setAttribute('src', '/img/partner/hero.webp?v=20260714-force-v10');
    element.setAttribute('loading', 'eager');
    element.setAttribute('decoding', 'async');
  }
}

function applySecurityHeaders(headers) {
  Object.entries(SECURITY_HEADERS).forEach(([name, value]) => headers.set(name, value));
  return headers;
}

async function secureSitemapResponse(response, headers) {
  let xml = await response.text();
  if (!xml.includes('https://cruiseplay-dyt.pages.dev/partner/')) {
    xml = xml.replace('</urlset>', PARTNER_SITEMAP_ENTRY + '\n</urlset>');
  }
  headers.set('Content-Type', 'application/xml; charset=UTF-8');
  return new Response(xml, { status: response.status, statusText: response.statusText, headers });
}

export async function onRequest(context) {
  const response = await context.next();
  const headers = applySecurityHeaders(new Headers(response.headers));
  const contentType = String(headers.get('Content-Type') || '').toLowerCase();
  const pathname = new URL(context.request.url).pathname;
  const isPartner = pathname === '/partner' || pathname === '/partner/';

  if (isPartner) {
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
  }

  if (pathname === '/sitemap.xml' && response.ok) {
    return secureSitemapResponse(response, headers);
  }

  let securedResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });

  if (contentType.includes('text/html')) {
    let rewriter = new HTMLRewriter()
      .on('head', new HeadSecurityInjector(isPartner))
      .on('body', new SecurityScriptInjector(isPartner));

    if (isPartner) {
      rewriter = rewriter.on('.hero-bg', new PartnerHeroInjector());
    }

    securedResponse = rewriter.transform(securedResponse);
  }

  return securedResponse;
}
