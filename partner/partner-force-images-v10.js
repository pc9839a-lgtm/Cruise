(function () {
  'use strict';

  const PHOTO_NAMES = ['ship', 'wake', 'balcony', 'ship', 'wake', 'balcony', 'ship', 'wake', 'balcony', 'ship'];
  const VERSION = '20260714-force-v10';

  function setImportant(element, property, value) {
    element.style.setProperty(property, value, 'important');
  }

  function prepareFrame(frame) {
    setImportant(frame, 'position', 'relative');
    setImportant(frame, 'overflow', 'hidden');
    setImportant(frame, 'opacity', '1');
    setImportant(frame, 'visibility', 'visible');
    setImportant(frame, 'background-image', 'none');
    setImportant(frame, 'background-color', '#dfe7f2');
  }

  function photoIndex(frame, fallbackIndex) {
    const match = String(frame.className || '').match(/photo-(\d+)/);
    if (!match) return fallbackIndex % PHOTO_NAMES.length;
    return Math.max(0, Math.min(9, Number(match[1])));
  }

  function createForcedImage(src, alt, className) {
    const image = document.createElement('img');
    image.className = className;
    image.src = src;
    image.alt = alt;
    image.loading = 'eager';
    image.decoding = 'async';
    setImportant(image, 'position', 'absolute');
    setImportant(image, 'inset', '0');
    setImportant(image, 'display', 'block');
    setImportant(image, 'width', '100%');
    setImportant(image, 'height', '100%');
    setImportant(image, 'max-width', 'none');
    setImportant(image, 'object-fit', 'cover');
    setImportant(image, 'object-position', 'center');
    setImportant(image, 'opacity', '1');
    setImportant(image, 'visibility', 'visible');
    setImportant(image, 'transform', 'none');
    setImportant(image, 'filter', 'none');
    setImportant(image, 'z-index', '30');
    setImportant(image, 'pointer-events', 'none');
    return image;
  }

  function renderPhotos() {
    document.querySelectorAll('.actual-photo').forEach(function (frame, index) {
      prepareFrame(frame);
      if (frame.querySelector('.force-visible-photo-v10')) return;

      const selectedIndex = photoIndex(frame, index);
      const name = PHOTO_NAMES[selectedIndex] || 'ship';
      const alt = frame.getAttribute('aria-label') || '크루즈 여행 실제 사진';
      const image = createForcedImage(
        '/api/partner-photo?name=' + encodeURIComponent(name) + '&v=' + VERSION,
        alt,
        'force-visible-photo-v10'
      );

      image.addEventListener('error', function () {
        image.src = '/img/partner/hero.webp?v=' + VERSION;
      }, { once: true });

      frame.replaceChildren(image);
      frame.classList.add('force-image-ready', 'is-visible');
    });
  }

  function renderBenefits() {
    document.querySelectorAll('.benefit-visual').forEach(function (frame) {
      prepareFrame(frame);
      if (frame.querySelector('.force-visible-benefit-v10')) return;

      const isIncome = frame.classList.contains('benefit-income');
      const image = createForcedImage(
        '/img/partner/benefits.webp?v=' + VERSION,
        frame.getAttribute('aria-label') || '크루즈 파트너 혜택 이미지',
        'force-visible-benefit-v10'
      );

      setImportant(image, 'width', '200%');
      setImportant(image, 'left', isIncome ? '-100%' : '0');
      setImportant(image, 'right', 'auto');
      setImportant(image, 'object-fit', 'fill');

      image.addEventListener('error', function () {
        image.src = '/img/partner/hero.webp?v=' + VERSION;
        setImportant(image, 'width', '100%');
        setImportant(image, 'left', '0');
        setImportant(image, 'object-fit', 'cover');
      }, { once: true });

      frame.replaceChildren(image);
      frame.classList.add('force-image-ready', 'is-visible');
    });
  }

  function applyImages() {
    renderPhotos();
    renderBenefits();
    document.documentElement.classList.add('partner-force-images-ready');
  }

  function init() {
    applyImages();
    window.setTimeout(applyImages, 350);
    window.setTimeout(applyImages, 1200);

    let scheduled = false;
    const observer = new MutationObserver(function () {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(function () {
        scheduled = false;
        applyImages();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}());
