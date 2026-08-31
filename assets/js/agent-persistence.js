(function () {
  'use strict';

  const STORAGE_KEY = 'cruiseplay_agent_code_v2';
  const LEGACY_KEYS = ['cruiseplay_agent_code', 'agent_code'];

  function sanitizeAgentCode(value) {
    const code = String(value || '').trim().slice(0, 40);
    return /^[A-Za-z0-9_-]+$/.test(code) ? code : '';
  }

  function readStoredAgent() {
    const keys = [STORAGE_KEY].concat(LEGACY_KEYS);
    for (const key of keys) {
      try {
        const localValue = sanitizeAgentCode(localStorage.getItem(key));
        if (localValue) return localValue;
      } catch (error) {}
      try {
        const sessionValue = sanitizeAgentCode(sessionStorage.getItem(key));
        if (sessionValue) return sessionValue;
      } catch (error) {}
    }
    return '';
  }

  function storeAgent(code) {
    if (!code) return;
    try { localStorage.setItem(STORAGE_KEY, code); } catch (error) {}
    try { sessionStorage.setItem(STORAGE_KEY, code); } catch (error) {}
  }

  function resolveAgent() {
    let url;
    try {
      url = new URL(window.location.href);
    } catch (error) {
      return '';
    }

    const fromUrl = sanitizeAgentCode(url.searchParams.get('agent'));
    if (fromUrl) {
      storeAgent(fromUrl);
      return fromUrl;
    }

    const stored = readStoredAgent();
    if (!stored) return '';

    url.searchParams.set('agent', stored);
    const nextUrl = url.pathname + '?' + url.searchParams.toString() + url.hash;
    try {
      history.replaceState(history.state, '', nextUrl);
    } catch (error) {}
    return stored;
  }

  function addHiddenInput(form, name, value) {
    if (!form || !name || !value) return;
    let input = form.querySelector('input[name="' + name + '"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
  }

  function rewriteAnchor(anchor, agentCode) {
    if (!anchor || !agentCode) return;
    const raw = String(anchor.getAttribute('href') || '').trim();
    if (!raw || raw.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(raw)) return;

    try {
      const url = new URL(raw, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (!['http:', 'https:'].includes(url.protocol)) return;

      url.searchParams.set('agent', agentCode);
      const nextHref = /^https?:\/\//i.test(raw)
        ? url.toString()
        : url.pathname + url.search + url.hash;

      if (nextHref !== raw) anchor.setAttribute('href', nextHref);
    } catch (error) {}
  }

  function syncNode(root, agentCode) {
    if (!root || !agentCode) return;

    if (root.nodeType === Node.ELEMENT_NODE && root.matches && root.matches('a[href]')) {
      rewriteAnchor(root, agentCode);
    }
    if (root.nodeType === Node.ELEMENT_NODE && root.matches && root.matches('form')) {
      addHiddenInput(root, 'agent', agentCode);
      addHiddenInput(root, 'agent_code', agentCode);
    }

    if (root.querySelectorAll) {
      root.querySelectorAll('a[href]').forEach(function (anchor) {
        rewriteAnchor(anchor, agentCode);
      });
      root.querySelectorAll('form').forEach(function (form) {
        addHiddenInput(form, 'agent', agentCode);
        addHiddenInput(form, 'agent_code', agentCode);
      });
    }
  }

  const agentCode = resolveAgent();
  if (!agentCode) return;

  window.CRUISEPLAY_AGENT_CODE = agentCode;
  document.documentElement.setAttribute('data-agent-code', agentCode);

  function syncAll() {
    syncNode(document.documentElement, agentCode);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncAll, { once: true });
  } else {
    syncAll();
  }

  document.addEventListener('click', function (event) {
    const anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (anchor) rewriteAnchor(anchor, agentCode);
  }, true);

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        syncNode(node, agentCode);
      });
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
