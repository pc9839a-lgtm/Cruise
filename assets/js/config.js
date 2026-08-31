// CruisePlay runtime data policy: public content is embedded in site source files.
// Google Sheets / Apps Script remain only for inquiry and partner form submissions.
(function () {
  'use strict';

  const STORAGE_KEY = 'cruiseplay_agent_code_v2';

  function sanitizeAgentCode(value) {
    const code = String(value || '').trim().slice(0, 40);
    return /^[A-Za-z0-9_-]+$/.test(code) ? code : '';
  }

  try {
    const url = new URL(window.location.href);
    const current = sanitizeAgentCode(url.searchParams.get('agent'));
    const stored = sanitizeAgentCode(localStorage.getItem(STORAGE_KEY)) || sanitizeAgentCode(sessionStorage.getItem(STORAGE_KEY));
    const agent = current || stored;

    if (agent) {
      localStorage.setItem(STORAGE_KEY, agent);
      sessionStorage.setItem(STORAGE_KEY, agent);
      window.CRUISEPLAY_AGENT_CODE = agent;

      if (!current) {
        url.searchParams.set('agent', agent);
        history.replaceState(history.state, '', url.pathname + '?' + url.searchParams.toString() + url.hash);
      }
    }
  } catch (error) {}

  const script = document.createElement('script');
  script.src = '/assets/js/agent-persistence.js?v=20260831-1';
  script.async = false;
  document.head.appendChild(script);
})();

try {
  window.localStorage.removeItem('cruiseplay_bootstrap_cache_v1');
} catch (error) {}

window.APP_CONFIG = {
  apiUrl: '/api/contact',
  useMockOnly: true,
  submitTimeout: 30000
};
