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
const PARTNER_SITEMAP_ENTRY = '  <url><loc>https://cruiseplay-dyt.pages.dev/partner/</loc><lastmod>2026-07-13</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>';

class HeadSecurityInjector {
  element(element) {
    element.prepend(EARLY_QUERY_GUARD, { html: true });
    element.append(RSS_DISCOVERY_LINK, { html: true });
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

class PartnerFreeCruiseCopyInjector {
  element(element) {
    element.setInnerContent(
      '쉽다고 말하지는 않습니다.<br />하지만, 이미 수많은 사람들이 무료 여행을 즐기고 있습니다.',
      { html: true }
    );
  }
}

class PartnerLifeHeadlineInjector {
  element(element) {
    element.setInnerContent(
      '여행이 수익이 되는 순간,<br />인생의 선택지가 달라집니다.',
      { html: true }
    );
  }
}

class PartnerLifeBodyInjector {
  element(element) {
    element.setInnerContent(
      '1년에 한 번 큰맘 먹고 가던 여행이<br /><em>두 번, 세 번 이어지고 삶의 반경도 넓어집니다.</em>',
      { html: true }
    );
  }
}

class PartnerLifePhotoTitleInjector {
  element(element) {
    element.setInnerContent('달라진 여행의 실제 장면');
  }
}

class PartnerLifePhotoCaptionInjector {
  element(element) {
    element.setInnerContent('반복되는 여행·새로운 인연·달라진 일상');
  }
}

function applySecurityHeaders(headers) {
  Object.entries(SECURITY_HEADERS).forEach(([name, value]) => {
    headers.set(name, value);
  });
  return headers;
}

async function secureSitemapResponse(response, headers) {
  let xml = await response.text();
  if (!xml.includes('https://cruiseplay-dyt.pages.dev/partner/')) {
    xml = xml.replace('</urlset>', PARTNER_SITEMAP_ENTRY + '\n</urlset>');
  }
  headers.set('Content-Type', 'application/xml; charset=UTF-8');
  return new Response(xml, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export async function onRequest(context) {
  const response = await context.next();
  const headers = applySecurityHeaders(new Headers(response.headers));
  const contentType = String(headers.get('Content-Type') || '').toLowerCase();
  const pathname = new URL(context.request.url).pathname;

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
      .on('head', new HeadSecurityInjector())
      .on('body', new SecurityScriptInjector());

    if (pathname === '/partner' || pathname === '/partner/') {
      rewriter = rewriter
        .on('.free-cruise-section .photo-overlay small', new PartnerFreeCruiseCopyInjector())
        .on('.opportunity-section h2', new PartnerLifeHeadlineInjector())
        .on('.opportunity-section > .partner-container > p', new PartnerLifeBodyInjector())
        .on('.opportunity-section .photo-slot-copy strong', new PartnerLifePhotoTitleInjector())
        .on('.opportunity-section .photo-slot-copy small', new PartnerLifePhotoCaptionInjector());
    }

    securedResponse = rewriter.transform(securedResponse);
  }

  return securedResponse;
}
