(() => {
  'use strict';

  const root = document.documentElement;
  let settleTimer = null;
  let surveyWasPresent = false;

  function hero() {
    return document.querySelector('.hero-section');
  }

  function hardTop() {
    try { history.scrollRestoration = 'manual'; } catch (_) {}
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  function resetHero() {
    const section = hero();
    if (!section) return false;
    root.classList.add('mh-ready');
    section.classList.remove('mh-active', 'mh-settled');
    if (settleTimer) {
      window.clearTimeout(settleTimer);
      settleTimer = null;
    }
    void section.offsetWidth;
    return true;
  }

  function playHero() {
    const section = hero();
    if (!section) return;
    root.classList.add('mh-ready');
    requestAnimationFrame(() => {
      section.classList.add('mh-active');
      settleTimer = window.setTimeout(() => {
        section.classList.add('mh-settled');
      }, 2050);
    });
  }

  function playFromTop() {
    resetHero();
    hardTop();
    requestAnimationFrame(() => {
      hardTop();
      requestAnimationFrame(() => {
        hardTop();
        playHero();
      });
    });
  }

  function watchSurvey() {
    const existing = document.getElementById('cms-survey-v2');
    if (existing) {
      surveyWasPresent = true;
      resetHero();
    }

    document.addEventListener('click', (event) => {
      if (!event.target.closest('#cms-survey-v2 .cms2-primary')) return;
      surveyWasPresent = true;
      resetHero();
    }, true);

    const observer = new MutationObserver(() => {
      const survey = document.getElementById('cms-survey-v2');
      if (survey) {
        surveyWasPresent = true;
        resetHero();
        return;
      }
      if (!surveyWasPresent) return;
      surveyWasPresent = false;
      /* The survey's legacy close handler scrolls to price first.
         MutationObserver fires after that DOM mutation callback, so this wins last. */
      playFromTop();
    });

    if (document.body) observer.observe(document.body, { childList: true });
  }

  function init() {
    if (!hero()) return;
    root.classList.add('mh-ready');
    watchSurvey();

    if (!document.getElementById('cms-survey-v2')) {
      resetHero();
      window.setTimeout(playHero, 90);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
