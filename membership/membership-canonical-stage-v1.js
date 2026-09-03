(() => {
  'use strict';

  const storySectionIds = [
    'mx-moving-hotel','mx-port-day','mx-moving-hotel-4','impact-med','price-pain',
    'mx-direct-booking-intro','same-cruise','guide-question','mx-prepare-money','mx-cruise-price-examples',
    'mx-lowest-price','membership-point','mx-point-example','mx-actual-cash','mx-actual-cash-total',
    'mx-booking-proof','mx-guide-assist','calculator','mx-membership-optional','mx-member-booking-benefits',
    'mx-start-early','mx-start-early-proof','plans','membership-terms'
  ];

  const bridgeIds = [
    'price-pain','same-cruise','mx-guide-assist','mx-membership-optional','mx-start-early'
  ];

  function force(el, prop, value) {
    if (el) el.style.setProperty(prop, value, 'important');
  }

  function ensureTypographySystem() {
    let style = document.getElementById('membership-type-system-v3');
    if (style) return;
    style = document.createElement('style');
    style.id = 'membership-type-system-v3';
    style.textContent = `
      :root{--membership-story-title:clamp(48px,4.7vw,72px);--membership-story-title-mobile:clamp(34px,8.8vw,43px);--membership-bridge-title:clamp(74px,7vw,98px);--membership-bridge-title-mobile:clamp(46px,13vw,60px)}
      #mx-moving-hotel h2,#mx-port-day h2,#mx-moving-hotel-4 h2,#impact-med h2,#mx-direct-booking-intro h2,#guide-question h2,#mx-prepare-money h2,#mx-cruise-price-examples h2,#mx-lowest-price h2,#membership-point h2,#mx-point-example h2,#mx-actual-cash h2,#mx-actual-cash-total h2,#mx-booking-proof h2,#calculator h2,#mx-member-booking-benefits h2,#mx-start-early-proof h2,#plans h2,#membership-terms h2{font-size:var(--membership-story-title)!important;line-height:1.12!important;letter-spacing:-.045em!important;font-weight:950!important}
      #price-pain h2,#same-cruise .mx8-bridge-question,#mx-guide-assist .mx16-bridge-question,#mx-membership-optional .mx18-bridge-question,#mx-start-early .mx19-bridge-question{font-size:var(--membership-bridge-title)!important;line-height:1.04!important;letter-spacing:-.055em!important;font-weight:950!important}
      #mx-moving-hotel p,#mx-port-day p,#mx-moving-hotel-4 p,#impact-med p,#price-pain p,#mx-direct-booking-intro p,#same-cruise p,#guide-question p,#mx-prepare-money p,#mx-cruise-price-examples p,#mx-lowest-price p,#membership-point p,#mx-point-example p,#mx-actual-cash p,#mx-actual-cash-total p,#mx-booking-proof p,#mx-guide-assist p,#calculator p,#mx-membership-optional p,#mx-member-booking-benefits p,#mx-start-early p,#mx-start-early-proof p,#plans p,#membership-terms p{font-size:max(18px,1.05rem)!important;line-height:1.55!important}
      .mx-eyebrow,.mxp-question,.mx4-eyebrow,.impact-label,.mx11-kicker,.mx12-kicker,.mx10p-kicker,.mxg-kicker,.mx13-kicker,.mxp13-kicker,.mx14-kicker,.mx15-kicker,.mx16-kicker,.mx18-kicker,.mx19-kicker,.mx21-kicker,#calculator .section-kicker,#plans .section-kicker,.mx7-overline,.mx8-overline{font-size:16px!important;min-height:38px!important}
      .mx4-city b,.mx4-night span,.impact-med-stop b,.impact-med-stop span,.mx7-receipt-top span,.mx7-receipt-route span,.mx7-receipt-breakdown span,.mx14-fee-note,.mx19-note,.mxg-note,.mx10p-note,.mx21-terms p,#calculator .result-box span,#plans .plan-mini-label{font-size:16px!important;line-height:1.5!important}
      #mx-start-early-proof .mx19-timeline span{font-size:18px!important}
      #membership-terms .mx21-terms summary{font-size:20px!important}
      @media(max-width:780px){
        #mx-moving-hotel h2,#mx-port-day h2,#mx-moving-hotel-4 h2,#impact-med h2,#mx-direct-booking-intro h2,#guide-question h2,#mx-prepare-money h2,#mx-cruise-price-examples h2,#mx-lowest-price h2,#membership-point h2,#mx-point-example h2,#mx-actual-cash h2,#mx-actual-cash-total h2,#mx-booking-proof h2,#calculator h2,#mx-member-booking-benefits h2,#mx-start-early-proof h2,#plans h2,#membership-terms h2{font-size:var(--membership-story-title-mobile)!important;line-height:1.17!important}
        #price-pain h2,#same-cruise .mx8-bridge-question,#mx-guide-assist .mx16-bridge-question,#mx-membership-optional .mx18-bridge-question,#mx-start-early .mx19-bridge-question{font-size:var(--membership-bridge-title-mobile)!important;line-height:1.06!important}
        #mx-moving-hotel p,#mx-port-day p,#mx-moving-hotel-4 p,#impact-med p,#price-pain p,#mx-direct-booking-intro p,#same-cruise p,#guide-question p,#mx-prepare-money p,#mx-cruise-price-examples p,#mx-lowest-price p,#membership-point p,#mx-point-example p,#mx-actual-cash p,#mx-actual-cash-total p,#mx-booking-proof p,#mx-guide-assist p,#calculator p,#mx-membership-optional p,#mx-member-booking-benefits p,#mx-start-early p,#mx-start-early-proof p,#plans p,#membership-terms p{font-size:17px!important;line-height:1.5!important}
        .mx-eyebrow,.mxp-question,.mx4-eyebrow,.impact-label,.mx11-kicker,.mx12-kicker,.mx10p-kicker,.mxg-kicker,.mx13-kicker,.mxp13-kicker,.mx14-kicker,.mx15-kicker,.mx16-kicker,.mx18-kicker,.mx19-kicker,.mx21-kicker,#calculator .section-kicker,#plans .section-kicker,.mx7-overline,.mx8-overline{font-size:14px!important;min-height:34px!important}
        .mx4-city b,.mx4-night span,.impact-med-stop b,.impact-med-stop span,.mx7-receipt-top span,.mx7-receipt-route span,.mx7-receipt-breakdown span,.mx14-fee-note,.mx19-note,.mxg-note,.mx10p-note,.mx21-terms p,#calculator .result-box span,#plans .plan-mini-label{font-size:15px!important}
        #membership-terms .mx21-terms summary{font-size:18px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function removeLegacyScenes() {
    ['m3-savings-use','m3-selector','mx-direct-booking-saving','points-by-time','mx-use-rules','mx-fit-check','mx-plan-guide','mx-final-choice','real-cost'].forEach((id) => document.getElementById(id)?.remove());
    document.querySelectorAll('.page-glow,.m-motion-orbit,.m-motion-rail').forEach((node) => node.remove());
  }

  function fixStorySpacing() {
    const mobile = window.matchMedia('(max-width: 780px)').matches;
    const normalTop = mobile ? '86px' : '132px';
    const normalBottom = mobile ? '124px' : '184px';
    const bridgeTop = mobile ? '104px' : '150px';
    const bridgeBottom = mobile ? '146px' : '214px';

    storySectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      force(section, 'padding-top', normalTop);
      force(section, 'padding-bottom', normalBottom);
    });

    bridgeIds.forEach((id) => {
      const section = document.getElementById(id);
      force(section, 'padding-top', bridgeTop);
      force(section, 'padding-bottom', bridgeBottom);
    });
  }

  function fixPlanReadability() {
    const root = document.getElementById('plans');
    if (!root) return;
    force(root, 'background', '#07111f');
    force(root, 'color', '#fff');
    force(root.querySelector('.membership-section-head h2'), 'color', '#fff');
    root.querySelectorAll('.plan-card').forEach((card,index) => {
      const premium = index === 1 || card.classList.contains('recommended');
      force(card,'background',premium ? '#edf4ff' : '#fff');
      force(card,'color','#0b1729');
      force(card,'border-color',premium ? '#8eb4ff' : '#d3deeb');
      card.querySelectorAll('*').forEach((el) => {
        if (!el.closest('.plan-cta')) force(el,'color','#0b1729');
        force(el,'opacity','1');
      });
      card.querySelectorAll('.plan-fit,.plan-stat .label,.plan-mini-label,.plan-mobile-line em').forEach((el) => force(el,'color','#53657c'));
      force(card.querySelector('.plan-price'),'color',premium ? '#2468e8' : '#0b1729');
      force(card.querySelector('.plan-feature-monthly strong'),'color','#2468e8');
      const cta = card.querySelector('.plan-cta');
      force(cta,'background',premium ? '#2468e8' : '#07111f');
      force(cta,'color','#fff');
    });
  }

  function cleanAndFix() {
    ensureTypographySystem();
    removeLegacyScenes();
    fixStorySpacing();
    fixPlanReadability();
    document.documentElement.classList.add('membership-clean-stage');
  }

  function init() {
    cleanAndFix();
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      cleanAndFix();
      if (tries >= 32) window.clearInterval(timer);
    },180);
    window.addEventListener('resize',() => { fixStorySpacing(); fixPlanReadability(); },{ passive:true });
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(() => { fixStorySpacing(); fixPlanReadability(); });
      observer.observe(document.body,{ childList:true,subtree:true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{ once:true });
  else init();
})();
