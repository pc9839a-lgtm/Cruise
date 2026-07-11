(function () {
  'use strict';

  const API_ENDPOINT = '/api/contact';
  const MIN_FILL_TIME_MS = 1800;
  const LOCAL_SUCCESS_COOLDOWN_MS = 120000;
  const REQUEST_TIMEOUT_MS = 20000;

  const FORM_CONFIGS = [
    {
      selector: '#contactForm',
      type: 'main',
      resultSelector: '#formResult',
      buttonSelector: '#formSubmitButton',
      idleLabel: '문의하기',
      busyLabel: '접수 중...'
    },
    {
      selector: '#partnerInquiryForm',
      type: 'partner',
      resultSelector: '#partnerFormResult',
      buttonSelector: '#partnerSubmitButton',
      idleLabel: '인플루언서 시작하기',
      busyLabel: '접수 중...'
    }
  ];

  function cleanPhone(value) {
    return String(value || '').replace(/\D+/g, '').slice(0, 11);
  }

  function setInputLimits(form, type) {
    const name = form.querySelector('[name="name"]');
    const phone = form.querySelector('[name="phone"]');
    const region = form.querySelector('[name="region_detail"]');
    const message = form.querySelector(type === 'partner' ? '[name="partner_message"]' : '[name="message"]');

    if (name) {
      name.maxLength = 40;
      name.autocomplete = name.autocomplete || 'name';
    }

    if (phone) {
      phone.maxLength = 11;
      phone.minLength = 9;
      phone.inputMode = 'numeric';
      phone.pattern = '[0-9]{9,11}';
      phone.autocomplete = phone.autocomplete || 'tel';
      phone.addEventListener('input', function () {
        phone.value = cleanPhone(phone.value);
      });
    }

    if (region) region.maxLength = 80;
    if (message) message.maxLength = type === 'partner' ? 1000 : 1500;
  }

  function addHiddenInput(form, name, value) {
    let input = form.querySelector('input[name="' + name + '"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      form.appendChild(input);
    }
    input.value = value == null ? '' : String(value);
    return input;
  }

  function addHoneypot(form) {
    if (form.querySelector('[data-security-honeypot]')) return;

    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-security-honeypot', '');
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-10000px';
    wrapper.style.top = 'auto';
    wrapper.style.width = '1px';
    wrapper.style.height = '1px';
    wrapper.style.overflow = 'hidden';

    const label = document.createElement('label');
    label.textContent = '웹사이트';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'website';
    input.tabIndex = -1;
    input.autocomplete = 'off';
    input.maxLength = 200;

    label.appendChild(input);
    wrapper.appendChild(label);
    form.appendChild(wrapper);
  }

  function getPrivacyCheckbox(form, type) {
    return type === 'partner'
      ? form.querySelector('#partnerPrivacyInput')
      : form.querySelector('#privacyAgreeInput');
  }

  function setResult(config, message, type) {
    const result = document.querySelector(config.resultSelector);
    if (!result) return;
    result.textContent = message || '';
    result.className = 'form-result' + (type ? ' is-' + type : '');
    result.setAttribute('role', 'status');
    result.setAttribute('aria-live', 'polite');
  }

  function setBusy(config, busy) {
    const button = document.querySelector(config.buttonSelector);
    if (!button) return;
    button.disabled = Boolean(busy);
    button.setAttribute('aria-busy', busy ? 'true' : 'false');
    button.textContent = busy ? config.busyLabel : config.idleLabel;
  }

  function validateForm(form, config) {
    const name = String(form.querySelector('[name="name"]')?.value || '').trim();
    const phoneInput = form.querySelector('[name="phone"]');
    const phone = cleanPhone(phoneInput?.value || '');
    const schedule = String(form.querySelector('[name="interest_schedule_id"]')?.value || '').trim();
    const people = String(form.querySelector('[name="people_count"]')?.value || '').trim();
    const privacy = getPrivacyCheckbox(form, config.type);

    if (phoneInput) phoneInput.value = phone;

    if (name.length < 2) return '성함을 2자 이상 입력해주세요.';
    if (phone.length < 9 || phone.length > 11) return '연락처를 정확히 입력해주세요.';
    if (!schedule) return '문의 항목을 선택해주세요.';
    if (!people) return '인원수를 선택해주세요.';

    if (config.type === 'partner') {
      const age = String(form.querySelector('[name="age_group"]')?.value || '').trim();
      const ready = String(form.querySelector('[name="travel_ready_status"]')?.value || '').trim();
      if (!age || !ready) return '필수 항목을 입력해주세요.';
    }

    if (privacy && !privacy.checked) return '개인정보 수집 및 이용 동의가 필요합니다.';
    return '';
  }

  function preserveHiddenValues(form) {
    return Array.from(form.querySelectorAll('input[type="hidden"][name]')).reduce(function (values, input) {
      if (!['form_started_at', 'privacy_agree'].includes(input.name)) {
        values[input.name] = input.value;
      }
      return values;
    }, {});
  }

  function restoreHiddenValues(form, values, type) {
    Object.keys(values || {}).forEach(function (name) {
      addHiddenInput(form, name, values[name]);
    });
    addHiddenInput(form, 'form_type', type);
    addHiddenInput(form, 'form_started_at', String(Date.now()));
    addHiddenInput(form, 'privacy_agree', 'N');
  }

  function composePartnerMessage(form) {
    const phone = cleanPhone(form.querySelector('[name="phone"]')?.value || '');
    const age = String(form.querySelector('[name="age_group"]')?.value || '').trim();
    const region = String(form.querySelector('[name="region_detail"]')?.value || '').trim() || '미입력';
    const ready = String(form.querySelector('[name="travel_ready_status"]')?.value || '').trim();
    const agent = String(form.querySelector('[name="agent_code"]')?.value || '').trim() || 'admin';
    const visibleMessage = String(form.querySelector('[name="partner_message"]')?.value || '').trim() || '문의내용 없음';

    return [
      '[파트너 상담]',
      '연락처: ' + phone,
      '연령대: ' + age,
      '거주지역: ' + region,
      '해외결제카드: ' + ready,
      '파트너코드: ' + agent,
      '',
      visibleMessage
    ].join('\n');
  }

  function buildSecureFormData(form, config) {
    const data = new FormData(form);
    const privacy = getPrivacyCheckbox(form, config.type);

    data.set('form_type', config.type);
    data.set('form_started_at', String(form.querySelector('[name="form_started_at"]')?.value || ''));
    data.set('privacy_agree', privacy && privacy.checked ? 'Y' : 'N');
    data.set('phone', cleanPhone(data.get('phone')));
    data.set('page_url', window.location.href);
    data.set('referrer', document.referrer || '');

    if (config.type === 'partner') {
      data.set('interest_schedule_id', 'partner_membership');
      data.set('schedule_id', 'partner_membership');
      data.set('people_count', '1');
      data.set('raw_type', 'partner_inquiry');
      data.set('inquiry_type', 'partner');
      data.set('message', composePartnerMessage(form));
    }

    return data;
  }

  function getLastSuccessKey(config) {
    return 'cruiseplay_form_success_' + config.type;
  }

  function getRemainingCooldown(config) {
    try {
      const lastSuccess = Number(localStorage.getItem(getLastSuccessKey(config)) || 0);
      return Math.max(0, LOCAL_SUCCESS_COOLDOWN_MS - (Date.now() - lastSuccess));
    } catch (error) {
      return 0;
    }
  }

  function markSuccessfulSubmission(config) {
    try {
      localStorage.setItem(getLastSuccessKey(config), String(Date.now()));
    } catch (error) {}
  }

  async function submitSecurely(event, form, config) {
    event.preventDefault();
    event.stopImmediatePropagation();

    if (form.dataset.securitySubmitting === 'true') return;

    const validationMessage = validateForm(form, config);
    if (validationMessage) {
      setResult(config, validationMessage, 'error');
      return;
    }

    const startedAt = Number(form.querySelector('[name="form_started_at"]')?.value || 0);
    if (!startedAt || Date.now() - startedAt < MIN_FILL_TIME_MS) {
      setResult(config, '입력 내용을 확인한 뒤 잠시 후 다시 눌러주세요.', 'error');
      return;
    }

    const remaining = getRemainingCooldown(config);
    if (remaining > 0) {
      setResult(config, '이미 문의가 접수되었습니다. 잠시 후 다시 시도해주세요.', 'error');
      return;
    }

    const controller = 'AbortController' in window ? new AbortController() : null;
    const timeoutId = window.setTimeout(function () {
      if (controller) controller.abort();
    }, REQUEST_TIMEOUT_MS);

    form.dataset.securitySubmitting = 'true';
    setBusy(config, true);
    setResult(config, '문의 내용을 접수하고 있습니다...', 'pending');

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: buildSecureFormData(form, config),
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        signal: controller ? controller.signal : undefined
      });

      let data = null;
      try {
        data = await response.json();
      } catch (error) {
        data = null;
      }

      if (!response.ok || !data || data.success !== true) {
        throw new Error(data && data.message ? data.message : '문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }

      const hiddenValues = preserveHiddenValues(form);
      markSuccessfulSubmission(config);
      form.reset();
      restoreHiddenValues(form, hiddenValues, config.type);
      setResult(config, data.message || '문의가 정상 접수되었습니다.', 'success');
    } catch (error) {
      const message = error && error.name === 'AbortError'
        ? '접수 시간이 초과되었습니다. 네트워크를 확인한 뒤 다시 시도해주세요.'
        : (error && error.message ? error.message : '문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요.');
      setResult(config, message, 'error');
    } finally {
      window.clearTimeout(timeoutId);
      form.dataset.securitySubmitting = 'false';
      setBusy(config, false);
    }
  }

  function hardenForm(config) {
    const form = document.querySelector(config.selector);
    if (!form || form.dataset.securityHardened === 'true') return;

    form.dataset.securityHardened = 'true';
    form.removeAttribute('target');
    form.setAttribute('method', 'post');
    form.setAttribute('action', API_ENDPOINT);
    form.setAttribute('autocomplete', 'on');

    setInputLimits(form, config.type);
    addHoneypot(form);
    addHiddenInput(form, 'form_type', config.type);
    addHiddenInput(form, 'form_started_at', String(Date.now()));
    addHiddenInput(form, 'privacy_agree', 'N');

    form.addEventListener('submit', function (event) {
      submitSecurely(event, form, config);
    }, true);
  }

  function isSafeAnchorUrl(rawValue) {
    const value = String(rawValue || '').trim();
    if (!value) return true;
    if (value.startsWith('#')) return true;

    try {
      const parsed = new URL(value, window.location.href);
      return ['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol);
    } catch (error) {
      return false;
    }
  }

  function isSafeResourceUrl(rawValue) {
    const value = String(rawValue || '').trim();
    if (!value) return true;

    try {
      const parsed = new URL(value, window.location.href);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch (error) {
      return false;
    }
  }

  function hardenAnchor(anchor) {
    const href = anchor.getAttribute('href');
    if (href != null && !isSafeAnchorUrl(href)) {
      anchor.removeAttribute('href');
      anchor.setAttribute('aria-disabled', 'true');
    }

    if (String(anchor.getAttribute('target') || '').toLowerCase() === '_blank') {
      const rel = new Set(String(anchor.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
      rel.add('noopener');
      rel.add('noreferrer');
      anchor.setAttribute('rel', Array.from(rel).join(' '));
    }
  }

  function hardenImage(image) {
    const src = image.getAttribute('src');
    if (src != null && !isSafeResourceUrl(src)) {
      image.removeAttribute('src');
      image.setAttribute('alt', image.getAttribute('alt') || '차단된 이미지');
    }
    image.setAttribute('referrerpolicy', 'no-referrer');
  }

  function hardenNode(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return;

    if (node.matches('a')) hardenAnchor(node);
    if (node.matches('img')) hardenImage(node);

    node.querySelectorAll?.('a').forEach(hardenAnchor);
    node.querySelectorAll?.('img').forEach(hardenImage);
  }

  function observeDynamicContent() {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(hardenNode);
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  function removeLegacySubmissionFrames() {
    document.querySelectorAll(
      'iframe[name="formSubmitFrame"], iframe#formSubmitFrame, iframe[name="partnerSubmitFrame"], iframe#partnerSubmitFrame'
    ).forEach(function (iframe) {
      iframe.remove();
    });
  }

  function init() {
    removeLegacySubmissionFrames();
    FORM_CONFIGS.forEach(hardenForm);
    hardenNode(document.documentElement);
    observeDynamicContent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
