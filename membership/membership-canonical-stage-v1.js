(() => {
  'use strict';

  const storySectionIds = [
    'mx-moving-hotel','mx-port-day','mx-moving-hotel-4','impact-med','price-pain',
    'mx-direct-booking-intro','same-cruise','guide-question','mx-prepare-money','mx-cruise-price-examples',
    'mx-lowest-price','membership-point','mx-point-example','mx-actual-cash','mx-actual-cash-total','mx-booking-proof',
    'mx-guide-assist','calculator','mx-membership-optional','mx-member-booking-benefits','mx-start-early','mx-start-early-proof',
    'plans','membership-terms'
  ];

  const bridgeIds = new Set([
    'price-pain','same-cruise','mx-guide-assist','mx-membership-optional','mx-start-early'
  ]);

  function force(el, prop, value) {
    if (el) el.style.setProperty(prop, value, 'important');
  }

  function removeLegacyScenes() {
    [
      'm3-savings-use','m3-selector','mx-direct-booking-saving','points-by-time',
      'mx-use-rules','mx-fit-check','mx-plan-guide','mx-final-choice','real-cost'
    ].forEach((id) => document.getElementById(id)?.remove());

    document.querySelectorAll('.page-glow,.m-motion-orbit,.m-motion-rail').forEach((node) => node.remove());
  }

  function fixStorySpacing() {
    const mobile = window.matchMedia('(max-width: 780px)').matches;
    const normalTop = mobile ? '92px' : '138px';
    const normalBottom = mobile ? '126px' : '184px';
    const bridgeTop = mobile ? '108px' : '154px';
    const bridgeBottom = mobile ? '148px' : '214px';

    storySectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      force(section, 'padding-top', bridgeIds.has(id) ? bridgeTop : normalTop);
      force(section, 'padding-bottom', bridgeIds.has(id) ? bridgeBottom : normalBottom);
    });
  }

  function raiseMinFont(el, px) {
    if (!el || !el.isConnected) return;
    const current = parseFloat(getComputedStyle(el).fontSize || '0');
    if (Number.isFinite(current) && current < px) force(el, 'font-size', `${px}px`);
  }

  function fixTypography() {
    const mobile = window.matchMedia('(max-width: 780px)').matches;
    const normalTitle = mobile ? 'clamp(36px,9.6vw,44px)' : 'clamp(50px,5vw,72px)';
    const bridgeTitle = mobile ? 'clamp(48px,13vw,60px)' : 'clamp(76px,7.2vw,98px)';
    const bodyMin = mobile ? 17 : 19;
    const microMin = mobile ? 16 : 18;

    storySectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      section.querySelectorAll('h2').forEach((h2) => {
        force(h2, 'font-size', bridgeIds.has(id) ? bridgeTitle : normalTitle);
        force(h2, 'line-height', bridgeIds.has(id) ? '1.05' : '1.12');
        force(h2, 'letter-spacing', bridgeIds.has(id) ? '-.05em' : '-.04em');
        force(h2, 'font-weight', '950');
      });

      section.querySelectorAll('p').forEach((el) => raiseMinFont(el, bodyMin));
      section.querySelectorAll([
        'small','summary','.source-note','.mx13-start-note','.mx19-note',
        '.mx7-receipt-top span','.mx7-receipt-route span','.mx7-receipt-breakdown span',
        '.impact-med-stop span','.impact-med-stop b','.mx4-city b','.mx4-night span',
        '.mx13-simple-row span','.mxp13-ledger span','.mx19-timeline span',
        '.mx-plan-fact span','.plan-price-unit','.plan-mini-label'
      ].join(',')).forEach((el) => raiseMinFont(el, microMin));
    });

    const point = document.getElementById('membership-point');
    if (point) {
      point.querySelectorAll('.mx13-simple-row span').forEach((el) => force(el,'font-size',mobile ? '20px' : '24px'));
      point.querySelectorAll('.mx13-simple-row strong').forEach((el) => force(el,'font-size',mobile ? '34px' : '42px'));
      point.querySelectorAll('.mx13-simple-row').forEach((el) => force(el,'padding',mobile ? '22px 0' : '28px 0'));
      const note = point.querySelector('.mx13-start-note');
      if (note) {
        force(note,'font-size',mobile ? '18px' : '20px');
        force(note,'line-height','1.55');
        force(note,'margin-top',mobile ? '26px' : '34px');
      }
    }

    const proof = document.getElementById('mx-point-example');
    if (proof) {
      proof.querySelectorAll('.mxp13-ledger span').forEach((el) => force(el,'font-size',mobile ? '18px' : '20px'));
      proof.querySelectorAll('.mxp13-ledger strong').forEach((el) => force(el,'font-size',mobile ? '25px' : '30px'));
    }

    const receipt = document.getElementById('mx-direct-booking-intro');
    if (receipt) {
      receipt.querySelectorAll('.mx7-receipt-top span,.mx7-receipt-route span,.mx7-receipt-breakdown span').forEach((el) => force(el,'font-size',mobile ? '17px' : '19px'));
    }

    document.querySelectorAll('.mx-eyebrow,.mxp-question,.mx4-eyebrow,.impact-label,.mx11-kicker,.mx12-kicker,.mx10p-kicker,.mxg-kicker,.mx13-kicker,.mxp13-kicker,.mx14-kicker,.mx15-kicker,.mx16-kicker,.mx18-kicker,.mx19-kicker,.mx21-kicker,#calculator .section-kicker,#plans .section-kicker,.mx7-overline,.mx8-overline').forEach((el) => {
      force(el,'font-size',mobile ? '15px' : '16px');
      force(el,'min-height',mobile ? '34px' : '38px');
    });
  }

  function fixPlanReadability() {
    const root = document.getElementById('plans');
    if (!root) return;

    force(root, 'background', '#07111f');
    force(root, 'color', '#fff');

    const headTitle = root.querySelector('.membership-section-head h2');
    const headCopy = root.querySelector('.membership-section-head p');
    force(headTitle, 'color', '#fff');
    force(headCopy, 'color', 'rgba(255,255,255,.82)');

    root.querySelectorAll('.plan-card').forEach((card, index) => {
      const premium = index === 1 || card.classList.contains('recommended');
      force(card, 'background', premium ? '#edf4ff' : '#ffffff');
      force(card, 'color', '#0b1729');
      force(card, 'border-color', premium ? '#8eb4ff' : '#d3deeb');
      force(card, 'box-shadow', 'none');

      card.querySelectorAll('*').forEach((el) => {
        if (!el.closest('.plan-cta')) force(el, 'color', '#0b1729');
        force(el, 'opacity', '1');
      });

      card.querySelectorAll('.plan-fit,.plan-stat .label,.plan-mini-label,.plan-mobile-line em').forEach((el) => force(el, 'color', '#53657c'));
      force(card.querySelector('.plan-price'), 'color', premium ? '#2468e8' : '#0b1729');
      force(card.querySelector('.plan-feature-monthly strong'), 'color', '#2468e8');

      const cta = card.querySelector('.plan-cta');
      force(cta, 'background', premium ? '#2468e8' : '#07111f');
      force(cta, 'color', '#fff');
      if (cta) cta.querySelectorAll('*').forEach((el) => force(el, 'color', '#fff'));
    });
  }

  function cleanAndFix() {
    removeLegacyScenes();
    fixStorySpacing();
    fixTypography();
    fixPlanReadability();
    document.documentElement.classList.add('membership-clean-stage');
    return true;
  }

  function init() {
    cleanAndFix();

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      cleanAndFix();
      if (tries >= 30) window.clearInterval(timer);
    }, 180);

    window.addEventListener('resize', () => {
      fixStorySpacing();
      fixTypography();
    }, { passive: true });

    if (typeof MutationObserver !== 'undefined') {
      let queued = false;
      const observer = new MutationObserver((mutations) => {
        if (!mutations.some((m) => m.type === 'childList' && (m.addedNodes.length || m.removedNodes.length))) return;
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          fixStorySpacing();
          fixTypography();
          fixPlanReadability();
        });
      });
      if (document.body) observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
