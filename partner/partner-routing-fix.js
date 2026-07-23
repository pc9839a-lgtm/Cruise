(function () {
  'use strict';

  function sanitizeAgentCode(value) {
    const code = String(value || '').trim().slice(0, 40);
    return /^[A-Za-z0-9_-]+$/.test(code) ? code : '';
  }

  function getAgentCode() {
    const params = new URLSearchParams(window.location.search);
    return sanitizeAgentCode(params.get('agent')) || 'admin';
  }

  function ensureHiddenInput(form, name, value) {
    let input = form.querySelector('input[name="' + name + '"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
    return input;
  }

  function forwardAgentToMembershipLinks(agentCode) {
    document.querySelectorAll('a[href^="/membership"], a[href^="https://cruiseplay-dyt.pages.dev/membership"]').forEach(function (link) {
      try {
        const url = new URL(link.getAttribute('href'), window.location.origin);
        if (url.origin !== window.location.origin || !url.pathname.startsWith('/membership')) return;
        url.searchParams.set('agent', agentCode);
        link.setAttribute('href', url.pathname + url.search + url.hash);
      } catch (error) {}
    });
  }

  function ageToAllowedGroup(age) {
    if (age >= 60) return '60대 이상';
    if (age >= 50) return '50대';
    if (age >= 40) return '40대';
    if (age >= 30) return '30대';
    return '20대';
  }

  function normalizePartnerSubmission(form) {
    form.addEventListener('submit', function () {
      const ageInput = form.querySelector('[name="age_group"]');
      const messageInput = form.querySelector('[name="partner_message"]');
      const readyInput = ensureHiddenInput(form, 'travel_ready_status', '확인 후 안내드릴게요.');
      const originalReadyValue = readyInput.value;

      if (!originalReadyValue || originalReadyValue === '미입력') {
        readyInput.value = '확인 후 안내드릴게요.';
      }

      if (!ageInput) return;

      const exactAgeText = String(ageInput.value || '').trim();
      const exactAge = Number(exactAgeText);
      if (!Number.isInteger(exactAge) || exactAge < 18 || exactAge > 99) return;

      const originalType = ageInput.type;
      const originalValue = ageInput.value;
      const originalMessage = messageInput ? messageInput.value : '';

      ageInput.type = 'text';
      ageInput.value = ageToAllowedGroup(exactAge);

      if (messageInput) {
        messageInput.value = '[실제 나이] ' + exactAge + '세\n' + originalMessage;
      }

      queueMicrotask(function () {
        if (document.documentElement.contains(ageInput)) {
          ageInput.type = originalType;
          ageInput.value = originalValue;
        }
        if (messageInput && document.documentElement.contains(messageInput)) {
          messageInput.value = originalMessage;
        }
      });
    }, true);
  }

  function init() {
    const agentCode = getAgentCode();
    forwardAgentToMembershipLinks(agentCode);

    const form = document.getElementById('partnerInquiryForm');
    if (!form) return;

    ensureHiddenInput(form, 'agent_code', agentCode);
    ensureHiddenInput(form, 'travel_ready_status', '확인 후 안내드릴게요.');
    normalizePartnerSubmission(form);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
