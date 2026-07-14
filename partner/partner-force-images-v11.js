(function () {
  'use strict';

  const PHOTO_NAMES = ['ship', 'wake', 'balcony', 'ship', 'wake', 'balcony', 'ship', 'wake', 'balcony', 'ship'];
  const VERSION = '20260714-force-v11';
  const FALLBACK = '/img/partner/hero.webp?v=' + VERSION;

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

  function findPhotoIndex(frame, fallbackIndex) {
    const match = String(frame.className || '').match(/photo-(\d+)/);
    return match ? Math.max(0, Math.min(9, Number(match[1]))) : fallbackIndex % 10;
  }

  function forceImageStyle(image) {
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
    setImportant(image, 'z-index', '999');
    setImportant(image, 'pointer-events', 'none');
  }

  function createVisibleImage(alt, className) {
    const image = document.createElement('img');
    image.className = className;
    image.src = FALLBACK;
    image.alt = alt;
    image.loading = 'eager';
    image.decoding = 'async';
    forceImageStyle(image);
    return image;
  }

  function preloadAndSwap(image, source, onSuccess) {
    const loader = new Image();
    loader.decoding = 'async';
    loader.onload = function () {
      image.src = source;
      if (onSuccess) onSuccess(image);
    };
    loader.onerror = function () {
      image.src = FALLBACK;
      forceImageStyle(image);
    };
    loader.src = source;
  }

  function renderPhotos() {
    document.querySelectorAll('.actual-photo').forEach(function (frame, index) {
      prepareFrame(frame);
      let image = frame.querySelector('.force-visible-photo-v11');
      if (!image) {
        image = createVisibleImage(
          frame.getAttribute('aria-label') || '크루즈 여행 실제 사진',
          'force-visible-photo-v11'
        );
        frame.replaceChildren(image);
      } else {
        forceImageStyle(image);
      }

      const name = PHOTO_NAMES[findPhotoIndex(frame, index)] || 'ship';
      const source = '/api/partner-photo?name=' + encodeURIComponent(name) + '&v=' + VERSION;
      if (image.dataset.requested !== source) {
        image.dataset.requested = source;
        preloadAndSwap(image, source);
      }
      frame.classList.add('force-image-ready', 'is-visible');
    });
  }

  function renderBenefits() {
    document.querySelectorAll('.benefit-visual').forEach(function (frame) {
      prepareFrame(frame);
      let image = frame.querySelector('.force-visible-benefit-v11');
      if (!image) {
        image = createVisibleImage(
          frame.getAttribute('aria-label') || '크루즈 파트너 혜택 이미지',
          'force-visible-benefit-v11'
        );
        frame.replaceChildren(image);
      }

      const isIncome = frame.classList.contains('benefit-income');
      const source = '/img/partner/benefits.webp?v=' + VERSION;
      preloadAndSwap(image, source, function (loadedImage) {
        forceImageStyle(loadedImage);
        setImportant(loadedImage, 'width', '200%');
        setImportant(loadedImage, 'left', isIncome ? '-100%' : '0');
        setImportant(loadedImage, 'right', 'auto');
        setImportant(loadedImage, 'object-fit', 'fill');
      });
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
    window.setTimeout(applyImages, 300);
    window.setTimeout(applyImages, 1000);
    window.setTimeout(applyImages, 2500);

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
