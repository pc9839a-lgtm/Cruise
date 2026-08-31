(() => {
  'use strict';

  if (!window.matchMedia('(max-width: 780px)').matches) return;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function cleanupNav() {
    const links = $$('.hero-nav-track > a');
    links.slice(6).forEach((link) => link.remove());
    const track = $('.hero-nav-track');
    if (track) {
      track.style.animation = 'none';
      track.style.transform = 'none';
    }
  }

  function cleanupDuplicateVisuals() {
    $('#m2-price-story')?.remove();
    $('#m2-payment-flow')?.remove();
  }

  function replaceSidewaysPhoto() {
    const img = $('#mx-moving-hotel .mx-hotel-visual img');
    if (!img) return;
    img.src = './img/객실및내부시설7.png';
    img.alt = '크루즈 객실';
  }

  function killConflictingMotion() {
    if (window.ScrollTrigger?.getAll) {
      window.ScrollTrigger.getAll().forEach((trigger) => {
        const el = trigger.trigger;
        if (!el) return;
        const inCritical = el.closest?.('#price-story-band,#mx-use-rules,#mx-moving-hotel') ||
          el.matches?.('#price-story-band,#mx-use-rules,#mx-moving-hotel,.m2-visual');
        if (inCritical) trigger.kill(false);
      });
    }

    const critical = [
      '#price-pain .mv2-kicker','#price-pain .mv2-title','#price-pain .mv2-mega','#price-pain .mv2-save',
      '#price-bridge .pb-lead','#price-bridge .pb-direct','#price-bridge .pb-pair','#price-bridge .pb-diff',
      '#same-cruise .mv2-kicker','#same-cruise .mv2-title','#same-cruise .mv2-four > *',
      '#mx-use-rules .mx-dual-card','#mx-use-rules .mx-equation'
    ].join(',');

    $$(critical).forEach((el) => {
      el.style.removeProperty('opacity');
      el.style.removeProperty('transform');
      el.style.removeProperty('filter');
      el.style.removeProperty('visibility');
      el.style.removeProperty('translate');
      el.style.removeProperty('scale');
    });
  }

  function enforceVisiblePrice() {
    const title = $('#price-pain .mv2-title');
    const mega = $('#price-pain .mv2-mega');
    const save = $('#price-pain .mv2-save');
    if (title) title.style.setProperty('color', '#ffffff', 'important');
    if (mega) title && mega.style.setProperty('color', '#ffffff', 'important');
    if (save) save.style.setProperty('color', '#8bd5ff', 'important');
  }

  function run() {
    cleanupNav();
    cleanupDuplicateVisuals();
    replaceSidewaysPhoto();
    killConflictingMotion();
    enforceVisiblePrice();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(run, 500);
      setTimeout(run, 1300);
    }, { once: true });
  } else {
    setTimeout(run, 500);
    setTimeout(run, 1300);
  }
})();
