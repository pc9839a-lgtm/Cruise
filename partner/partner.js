(function () {
  'use strict';

  if (!document.querySelector('link[data-partner-real-copy]')) {
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = '/partner/partner-real-copy.css?v=20260713-final';
    styleLink.setAttribute('data-partner-real-copy', 'true');
    document.head.appendChild(styleLink);
  }

  const menuButton = document.getElementById('partnerMenuButton');
  const nav = document.getElementById('partnerNav');
  const floatingCta = document.getElementById('partnerFloatingCta');
  const formSection = document.getElementById('partner-form');

  function setValue(id, value) {
    const input = document.getElementById(id);
    if (input) input.value = value || '';
  }

  function setFormResult(message, type) {
    const result = document.getElementById('partnerFormResult');
    if (!result) return;
    result.textContent = message || '';
    result.className = 'form-result' + (type ? ' is-' + type : '');
  }

  function initTracking() {
    const params = new URLSearchParams(window.location.search);
    const agent = String(params.get('agent') || '').trim();
    setValue('partnerAgentInput', agent || 'admin');
    setValue('partnerUtmSourceInput', params.get('utm_source') || '');
    setValue('partnerUtmMediumInput', params.get('utm_medium') || '');
    setValue('partnerUtmCampaignInput', params.get('utm_campaign') || '');
    setValue('partnerPageUrlInput', window.location.href);
    setValue('partnerReferrerInput', document.referrer || '');
  }

  function initMenu() {
    if (!menuButton || !nav) return;

    menuButton.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('is-menu-open', isOpen);
    });

    nav.addEventListener('click', function (event) {
      if (!event.target.closest('a')) return;
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-menu-open');
    });
  }

  function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (element) {
        element.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  function initFloatingCta() {
    if (!floatingCta || !formSection) return;
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(function (entries) {
      const entry = entries && entries[0];
      floatingCta.classList.toggle('is-hidden', Boolean(entry && entry.isIntersecting));
    }, {
      threshold: 0.08,
      rootMargin: '-10% 0px -10% 0px'
    });

    observer.observe(formSection);
  }

  function initPhotoSlots() {
    document.querySelectorAll('[data-photo-slot]').forEach(function (slot) {
      const image = slot.querySelector('img');
      if (image && image.getAttribute('src')) {
        slot.classList.add('has-image');
      }
    });
  }

  function initPartnerForm() {
    const form = document.getElementById('partnerInquiryForm');
    const interestInput = document.getElementById('partnerInterestInput');
    const messageInput = document.getElementById('partnerMessageInput');
    if (!form || !interestInput || !messageInput) return;

    form.addEventListener('submit', function (event) {
      const interest = String(interestInput.value || '').trim();
      if (!interest) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setFormResult('가장 궁금한 내용을 선택해주세요.', 'error');
        interestInput.focus();
        return;
      }

      const prefix = '[관심내용: ' + interest + ']';
      const current = String(messageInput.value || '').trim();
      const withoutOldPrefix = current.replace(/^\[관심내용:[^\]]+\]\s*/i, '').trim();
      messageInput.value = prefix + (withoutOldPrefix ? '\n' + withoutOldPrefix : '');
    }, true);
  }

  function init() {
    initTracking();
    initMenu();
    initReveal();
    initFloatingCta();
    initPhotoSlots();
    initPartnerForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
