(() => {
  'use strict';

  const sectionSelectors = [
    '#mx-moving-hotel','#mx-port-day','#mx-moving-hotel-4','#impact-med',
    '[data-membership-section]','#plans'
  ];

  const cardSelector = [
    '.mx-hotel-point','.mxp-step','.mx4-city','.mx4-points article','.impact-med-stop',
    '.mv2-price','.mv2-four>div','.mx-card','.m3-four>div','.mx11-flow article',
    '.mx12-card','.mx13-plan','.mx14-ledger article','.mx15-equation article',
    '.mx17-results article','.mx18-card','.mx19-card','.mx22-plans article','.plan-card'
  ].join(',');

  function prepare() {
    const sections = [...document.querySelectorAll(sectionSelectors.join(','))];

    sections.forEach((section) => {
      if (section.dataset.canonMotionV2 === '1') return;
      section.dataset.canonMotionV2 = '1';

      const inner = section.querySelector(':scope > div') ||
        section.querySelector('.mx-inner,.mv2-inner,.m3-inner,.container');
      if (inner) inner.classList.add('canon-reveal');

      [...section.querySelectorAll(cardSelector)].forEach((card, index) => {
        card.classList.add('canon-reveal','canon-card');
        card.style.setProperty('--canon-delay', `${Math.min(index, 5) * 55}ms`);
      });
    });

    const targets = [...document.querySelectorAll('.canon-reveal:not([data-canon-observed-v2])')];
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

    targets.forEach((el) => {
      el.dataset.canonObservedV2 = '1';
      observer.observe(el);
    });
  }

  const boot = () => {
    prepare();
    setTimeout(prepare, 350);
    setTimeout(prepare, 900);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once:true });
  } else {
    boot();
  }
})();
