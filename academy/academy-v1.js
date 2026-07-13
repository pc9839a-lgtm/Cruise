(function () {
  'use strict';

  const root = document.documentElement;
  const PRODUCTION_ORIGIN = 'https://cruiseplay-dyt.pages.dev';
  const AGENT_PATTERN = /^[A-Za-z0-9_-]{1,40}$/;

  root.classList.add('js-enabled');

  const byId = (id) => document.getElementById(id);
  const setValue = (id, value) => {
    const field = byId(id);
    if (field) field.value = value || '';
  };

  function sanitizeAgent(value) {
    const code = String(value || '').trim();
    return AGENT_PATTERN.test(code) ? code : '';
  }

  function queryParams() {
    try {
      return new URLSearchParams(window.location.search);
    } catch (error) {
      return new URLSearchParams();
    }
  }

  function currentAgent() {
    return sanitizeAgent(queryParams().get('agent'));
  }

  function withAgent(input, code) {
    const agent = sanitizeAgent(code);
    if (!agent) return input;

    try {
      const url = new URL(input, window.location.origin);
      url.searchParams.set('agent', agent);
      return url.toString();
    } catch (error) {
      return input;
    }
  }

  function propagateAgent(code) {
    const agent = sanitizeAgent(code);
    if (!agent) return;

    document.querySelectorAll('a[data-agent-link]').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#') return;
      link.setAttribute('href', withAgent(href, agent));
    });
  }

  function initHeader() {
    const header = document.querySelector('.academy-header');
    const menuButton = byId('academyMenuButton');
    const nav = byId('academyNav');

    const syncHeader = () => {
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 20);
    };

    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });

    if (!menuButton || !nav) return;

    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('is-menu-open', open);
    });

    nav.addEventListener('click', (event) => {
      if (!event.target.closest('a')) return;
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-menu-open');
    });
  }

  function initReveal() {
    const groups = Array.from(document.querySelectorAll('.reveal-group'));
    const cards = Array.from(document.querySelectorAll('.reveal-card, .reveal-media'));

    if (!('IntersectionObserver' in window)) {
      groups.forEach((item) => item.classList.add('is-visible'));
      cards.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -42px 0px' });

    groups.forEach((item) => observer.observe(item));
    cards.forEach((item) => observer.observe(item));

    const hero = document.querySelector('.academy-hero .reveal-group');
    if (hero) requestAnimationFrame(() => hero.classList.add('is-visible'));
  }

  function initTracks() {
    const tabs = Array.from(document.querySelectorAll('[data-track]'));
    const panels = Array.from(document.querySelectorAll('[data-track-panel]'));
    if (!tabs.length || !panels.length) return;

    function selectTrack(name) {
      tabs.forEach((tab) => {
        const active = tab.dataset.track === name;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
      });

      panels.forEach((panel) => {
        const active = panel.dataset.trackPanel === name;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => selectTrack(tab.dataset.track));
    });

    if (window.location.hash === '#partner-start') {
      selectTrack('after');
      const section = byId('academy');
      if (section) requestAnimationFrame(() => section.scrollIntoView({ behavior: 'smooth' }));
    }
  }

  function makeShareLinks(code) {
    const agent = sanitizeAgent(code);
    const status = byId('academyCodeStatus');

    if (!agent) {
      if (status) {
        status.textContent = '추천코드를 정확히 입력해주세요.';
        status.className = 'academy-code-status is-error';
      }
      return false;
    }

    const paths = {
      academyMembershipLink: '/membership/',
      academyPartnerLink: '/partner/',
      academyAcademyLink: '/academy/'
    };

    Object.keys(paths).forEach((id) => {
      const input = byId(id);
      if (!input) return;
      input.value = withAgent(PRODUCTION_ORIGIN + paths[id], agent);
    });

    propagateAgent(agent);
    setValue('academyAgentInput', agent);

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('agent', agent);
      window.history.replaceState({}, '', url.toString());
    } catch (error) {
      // The links still work when history access is restricted.
    }

    if (status) {
      status.textContent = '추천코드가 적용되었습니다.';
      status.className = 'academy-code-status is-success';
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'academy_referral_links_created', agent_code: agent });
    return true;
  }

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }

  function initLinkBuilder() {
    const input = byId('academyAgentCode');
    const makeButton = byId('academyMakeLinks');
    const initialAgent = currentAgent();

    if (input && initialAgent) {
      input.value = initialAgent;
      makeShareLinks(initialAgent);
    } else {
      setValue('academyAgentInput', initialAgent || 'admin');
      propagateAgent(initialAgent);
    }

    if (makeButton && input) {
      makeButton.addEventListener('click', () => makeShareLinks(input.value));
      input.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') return;
        event.preventDefault();
        makeShareLinks(input.value);
      });
    }

    document.querySelectorAll('[data-copy-target]').forEach((button) => {
      button.addEventListener('click', async () => {
        const target = byId(button.dataset.copyTarget);
        const code = input ? sanitizeAgent(input.value) : initialAgent;

        if (!code) {
          makeShareLinks(input ? input.value : '');
          if (input) input.focus();
          return;
        }

        if (target && !target.value.includes('agent=')) makeShareLinks(code);
        const value = target ? target.value : '';
        if (!value) return;

        const original = button.textContent;
        try {
          await copyText(value);
          button.textContent = '복사되었습니다';
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: 'academy_referral_link_copied', link_type: button.dataset.copyTarget });
        } catch (error) {
          button.textContent = '다시 눌러주세요';
        }
        window.setTimeout(() => { button.textContent = original; }, 1500);
      });
    });
  }

  function initFaq() {
    const items = Array.from(document.querySelectorAll('.academy-faq-item'));
    items.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        items.forEach((other) => {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  function setFormResult(message, type) {
    const result = byId('academyFormResult');
    if (!result) return;
    result.textContent = message || '';
    result.className = 'academy-form-result' + (type ? ' is-' + type : '');
  }

  function initTrackingFields() {
    const params = queryParams();
    setValue('academyAgentInput', currentAgent() || 'admin');
    setValue('academyUtmSourceInput', params.get('utm_source') || '');
    setValue('academyUtmMediumInput', params.get('utm_medium') || '');
    setValue('academyUtmCampaignInput', params.get('utm_campaign') || '');
    setValue('academyPageUrlInput', window.location.href);
    setValue('academyReferrerInput', document.referrer || '');
  }

  function initForm() {
    const form = byId('academyInquiryForm');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      const fields = [
        [byId('academyNameInput'), '이름을 입력해주세요.'],
        [byId('academyPhoneInput'), '연락처를 입력해주세요.'],
        [byId('academyRegionInput'), '지역을 입력해주세요.'],
        [byId('academyAgeInput'), '나이를 입력해주세요.'],
        [byId('academyMessageInput'), '문의사항을 입력해주세요.']
      ];

      for (const [field, message] of fields) {
        if (field && String(field.value || '').trim()) continue;
        event.preventDefault();
        event.stopImmediatePropagation();
        setFormResult(message, 'error');
        if (field) field.focus();
        return;
      }

      const phone = byId('academyPhoneInput');
      const digits = String(phone.value || '').replace(/\D/g, '');
      if (digits.length < 9) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setFormResult('연락처를 정확히 입력해주세요.', 'error');
        phone.focus();
        return;
      }
      phone.value = digits;

      const age = Number(byId('academyAgeInput').value);
      if (!Number.isFinite(age) || age < 18 || age > 99) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setFormResult('나이를 정확히 입력해주세요.', 'error');
        byId('academyAgeInput').focus();
        return;
      }

      const privacy = byId('academyPrivacyInput');
      if (!privacy || !privacy.checked) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setFormResult('개인정보 수집 및 이용에 동의해주세요.', 'error');
        if (privacy) privacy.focus();
        return;
      }

      setValue('academyMessageHidden', String(byId('academyMessageInput').value || '').trim());
      setValue('academyPageUrlInput', window.location.href);
      setFormResult('', '');
    }, true);
  }

  function initFloatingCta() {
    const floating = byId('academyFloatingCta');
    const inquiry = byId('inquiry');
    if (!floating || !inquiry || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      floating.classList.toggle('is-hidden', Boolean(entries[0] && entries[0].isIntersecting));
    }, { threshold: 0.08, rootMargin: '-10% 0px -10% 0px' });

    observer.observe(inquiry);
  }

  function init() {
    try {
      initHeader();
      initReveal();
      initTracks();
      initLinkBuilder();
      initFaq();
      initTrackingFields();
      initForm();
      initFloatingCta();
    } catch (error) {
      console.error('academy page init failed', error);
      document.querySelectorAll('.reveal-group, .reveal-card, .reveal-media').forEach((item) => item.classList.add('is-visible'));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
