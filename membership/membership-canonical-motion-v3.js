(() => {
  'use strict';

  const sections = [
    '#mx-moving-hotel','#mx-port-day','#mx-moving-hotel-4','#impact-med',
    '#price-pain','#price-compare','#same-cruise','#mx-cost-structure','#m3-savings-use',
    '#guide-question','#mx-prepare-money','#membership-point','#points-by-time','#real-cost',
    '#mx-use-rules','#calculator','#mx-fit-check','#mx-plan-guide','#m3-selector',
    '#membership-terms','#mx-final-choice','#plans'
  ].join(',');

  const cardSelector = [
    '.mx-hotel-point','.mxp-step','.mx4-city','.mx4-points article','.impact-med-stop',
    '.mv2-price','.mv2-four>div','.mx-card','.m3-four>div','.mx11-flow article',
    '.mx12-card','.mx13-plan','.mx14-ledger article','.mx15-equation article',
    '.mx17-results article','.mx18-card','.mx19-card','.mx22-plans article','.plan-card'
  ].join(',');

  const numberSelector = [
    '.mv2-mega','.mx10-amount strong','.mx13-plan-row.primary strong',
    '.mx14-ledger strong','.mx15-equation strong','.mx16-equation strong',
    '.mx17-results strong','.mx19-main strong','.mx22-plans strong','.plan-price'
  ].join(',');

  function mark(section) {
    if (!section || section.dataset.canonMotionV3 === '1') return;
    section.dataset.canonMotionV3 = '1';

    const kicker = section.querySelector('.mx-eyebrow,.mxp-question,.mx4-eyebrow,.impact-label,.mv2-kicker,.m3-kicker,.mx11-kicker,.mx12-kicker,.mx13-kicker,.mx14-kicker,.mx15-kicker,.mx16-kicker,.mx17-kicker,.mx18-kicker,.mx19-kicker,.mx21-kicker,.mx22-kicker,.section-kicker');
    const title = section.querySelector('h2');

    if (kicker) {
      kicker.classList.add('canon-reveal');
      kicker.style.setProperty('--canon-delay','0ms');
    }
    if (title) {
      title.classList.add('canon-reveal','canon-title');
      title.style.setProperty('--canon-delay','70ms');
    }

    [...section.querySelectorAll(cardSelector)].forEach((card, index) => {
      card.classList.add('canon-reveal','canon-card');
      card.style.setProperty('--canon-delay', `${140 + Math.min(index,5) * 55}ms`);
    });

    [...section.querySelectorAll(numberSelector)].forEach((number, index) => {
      number.classList.add('canon-reveal','canon-number');
      number.style.setProperty('--canon-delay', `${160 + Math.min(index,4) * 45}ms`);
    });
  }

  function observe() {
    [...document.querySelectorAll(sections)].forEach(mark);

    const targets = [...document.querySelectorAll('.canon-reveal:not([data-canon-observed-v3])')];
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold:.13, rootMargin:'0px 0px -8% 0px' });

    targets.forEach(el => {
      el.dataset.canonObservedV3 = '1';
      observer.observe(el);
    });
  }

  function boot() {
    observe();
    setTimeout(observe,250);
    setTimeout(observe,700);
    setTimeout(observe,1300);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
