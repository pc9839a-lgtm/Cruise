(() => {
  'use strict';

  const TARGET_ID = 'mx-membership-optional';

  function removeOptionalSection() {
    const section = document.getElementById(TARGET_ID);
    if (!section) return false;
    section.remove();
    return true;
  }

  function init() {
    removeOptionalSection();

    const observer = new MutationObserver(() => {
      removeOptionalSection();
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    window.setTimeout(() => {
      removeOptionalSection();
      observer.disconnect();
    }, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
