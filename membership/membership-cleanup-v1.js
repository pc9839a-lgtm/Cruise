(() => {
  'use strict';

  function clean() {
    document.querySelectorAll('.mx-chapter,.mx-chapter-rail').forEach((el) => el.remove());
  }

  clean();
  let tries = 0;
  const timer = setInterval(() => {
    clean();
    tries += 1;
    if (tries > 25) clearInterval(timer);
  }, 180);

  const observer = new MutationObserver(clean);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 8000);
})();
