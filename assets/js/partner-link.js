(function () {
  'use strict';

  function hasPartnerLink(root) {
    return Boolean(root && root.querySelector('a[href="/partner/"], a[href="/partner"]'));
  }

  function makeLink(className) {
    const link = document.createElement('a');
    link.href = '/partner/';
    link.textContent = '파트너';
    if (className) link.className = className;
    return link;
  }

  function addMainNavLink() {
    const nav = document.getElementById('mainNav');
    if (!nav || hasPartnerLink(nav)) return;
    const inquiry = nav.querySelector('.nav-highlight');
    nav.insertBefore(makeLink('partner-entry-link'), inquiry || null);
  }

  function addBlogNavLink() {
    document.querySelectorAll('.blog-nav').forEach(function (nav) {
      if (hasPartnerLink(nav)) return;
      const inquiry = nav.querySelector('.blog-nav-cta');
      nav.insertBefore(makeLink('partner-entry-link'), inquiry || null);
    });
  }

  function addFooterLink() {
    const footerLinks = document.querySelector('.footer-policy-links');
    if (footerLinks && !hasPartnerLink(footerLinks)) {
      footerLinks.append(document.createTextNode(' · '), makeLink('partner-entry-link'));
    }

    document.querySelectorAll('.blog-footer p').forEach(function (paragraph) {
      if (!paragraph.querySelector('a') || hasPartnerLink(paragraph)) return;
      paragraph.append(document.createTextNode(' · '), makeLink('partner-entry-link'));
    });
  }

  function addMembershipCrossLink() {
    if (!window.location.pathname.startsWith('/membership')) return;
    if (document.querySelector('[data-partner-cross-link]')) return;

    const footer = document.querySelector('footer');
    if (!footer) return;

    const wrap = document.createElement('div');
    wrap.setAttribute('data-partner-cross-link', '');
    wrap.style.cssText = 'max-width:1180px;margin:0 auto;padding:18px 20px;text-align:center;font:800 14px/1.5 Pretendard,sans-serif;';
    const link = makeLink();
    link.textContent = '크루즈를 소개하며 무료여행과 소득에 도전하는 파트너 안내 →';
    link.style.cssText = 'display:inline-flex;padding:12px 18px;border-radius:999px;background:#eef4ff;color:#1746a2;';
    wrap.appendChild(link);
    footer.prepend(wrap);
  }

  function init() {
    if (window.location.pathname.startsWith('/partner')) return;
    addMainNavLink();
    addBlogNavLink();
    addFooterLink();
    addMembershipCrossLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
