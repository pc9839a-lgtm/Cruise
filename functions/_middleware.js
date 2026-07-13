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

const EARLY_QUERY_GUARD = `<script>(function(){try{var u=new URL(location.href);var n=new URLSearchParams();var rules={agent:40,utm_source:80,utm_medium:80,utm_campaign:80,inquiryType:40};Object.keys(rules).forEach(function(k){var v=(u.searchParams.get(k)||'').replace(/[\u0000-\u001f\u007f<>]/g,'').trim().slice(0,rules[k]);if(!v)return;if(k==='agent'&&!/^[A-Za-z0-9_-]+$/.test(v))return;if(k==='inquiryType'&&!/^[A-Za-z0-9_-]+$/.test(v))return;n.set(k,v)});if(u.searchParams.get('openInquiry')==='1')n.set('openInquiry','1');var s=n.toString();var clean=u.pathname+(s?'?'+s:'')+u.hash;if(clean!==u.pathname+u.search+u.hash)history.replaceState(null,'',clean)}catch(e){}})();</script>`;
const RSS_DISCOVERY_LINK = '<link rel="alternate" type="application/rss+xml" title="크루즈플레이 콘텐츠 RSS" href="/rss.xml" />';
const PARTNER_SITEMAP_ENTRY = '  <url><loc>https://cruiseplay-dyt.pages.dev/partner/</loc><lastmod>2026-07-13</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>';
const PARTNER_EDGE_STYLE = `<style id="partner-edge-image-fix">
.actual-photo,.benefit-visual{position:relative!important;overflow:hidden!important;background-image:none!important;background-color:#dfe7f2!important}
.partner-direct-photo,.partner-direct-benefit{position:absolute!important;z-index:1!important;display:block!important;max-width:none!important;pointer-events:none!important;user-select:none!important}
.partner-direct-photo{width:500%!important;height:200%!important;object-fit:fill!important}
.partner-direct-benefit{width:200%!important;height:100%!important;top:0!important;object-fit:fill!important}
.hero-bg{display:block!important;opacity:1!important}
</style>`;

class HeadSecurityInjector {
  constructor(isPartner) { this.isPartner = isPartner; }
  element(element) {
    element.prepend(EARLY_QUERY_GUARD, { html: true });
    element.append(RSS_DISCOVERY_LINK, { html: true });
    if (this.isPartner) element.append(PARTNER_EDGE_STYLE, { html: true });
  }
}

class SecurityScriptInjector {
  element(element) {
    element.append(
      '<script src="/assets/js/security-guard.js?v=20260712-security" defer></script><script src="/assets/js/partner-link.js?v=20260712-partner-entry" defer></script>',
      { html: true }
    );
  }
}

class PartnerHeroInjector {
  element(element) {
    element.setAttribute('src', '/img/partner/hero.webp?v=20260713-edge-image');
    element.setAttribute('loading', 'eager');
    element.setAttribute('decoding', 'async');
  }
}

class PartnerPhotoInjector {
  element(element) {
    const className = String(element.getAttribute('class') || '');
    const match = className.match(/photo-(\d+)/);
    const index = match ? Math.max(0, Math.min(9, Number(match[1]))) : 0;
    const column = index % 5;
    const row = Math.floor(index / 5);
    const left = -(column * 100);
    const top = -(row * 100);
    const alt = element.getAttribute('aria-label') || '크루즈 여행 실제 사진';
    element.setInnerContent(
      `<img class="partner-direct-photo" src="/img/partner/gallery.webp?v=20260713-edge-image" alt="${alt.replace(/"/g, '&quot;')}" loading="lazy" decoding="async" style="left:${left}%;top:${top}%" />`,
      { html: true }
    );
  }
}

class PartnerBenefitInjector {
  element(element) {
    const id = String(element.getAttribute('class') || '');
    const left = id.includes('benefit-income') ? -100 : 0;
    const alt = element.getAttribute('aria-label') || '크루즈 파트너 혜택 이미지';
    element.setInnerContent(
      `<img class="partner-direct-benefit" src="/img/partner/benefits.webp?v=20260713-edge-image" alt="${alt.replace(/"/g, '&quot;')}" loading="lazy" decoding="async" style="left:${left}%" />`,
      { html: true }
    );
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
      .on('body', new SecurityScriptInjector());

    if (isPartner) {
      rewriter = rewriter
        .on('.hero-bg', new PartnerHeroInjector())
        .on('.actual-photo', new PartnerPhotoInjector())
        .on('.benefit-visual', new PartnerBenefitInjector());
    }

    securedResponse = rewriter.transform(securedResponse);
  }

  return securedResponse;
}
