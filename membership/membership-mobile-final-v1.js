(() => {
  'use strict';

  if (!window.matchMedia('(max-width: 780px)').matches) return;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function cleanupNav() {
    const links = $$('.hero-nav-track > a');
    links.slice(6).forEach((link) => link.remove());
  }

  function replaceSidewaysPhoto() {
    const img = $('#mx-moving-hotel .mx-hotel-visual img');
    if (!img) return;
    img.src = './img/객실및내부시설7.png';
    img.alt = '크루즈 객실';
  }

  function run() {
    cleanupNav();
    replaceSidewaysPhoto();
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
