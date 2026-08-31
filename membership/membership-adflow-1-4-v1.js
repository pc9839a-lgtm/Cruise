(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function applyCopy() {
    const pain = $('#price-pain');
    const compare = $('#price-compare');
    const same = $('#same-cruise');
    if (!pain || !compare || !same) return;

    const painKicker = $('.mv2-kicker', pain);
    const painTitle = $('.mv2-title', pain);
    const painMega = $('.mv2-mega', pain);
    const painSave = $('.mv2-save', pain);
    if (painKicker) painKicker.textContent = '4박 5일 아시아 크루즈';
    if (painTitle) painTitle.innerHTML = '<strong>둘이 가면</strong>';
    if (painMega) painMega.textContent = '400만원';
    if (painSave) painSave.innerHTML = '<strong>1인 200만원 × 2명</strong>';

    const compareKicker = $('.mv2-kicker', compare);
    const compareTitle = $('.mv2-title', compare);
    const compareSave = $('.mv2-save', compare);
    const compareMega = $('.mv2-mega', compare);
    const priceCards = $$('.mv2-price', compare);
    const arrow = $('.mv2-arrow', compare);

    if (compareKicker) compareKicker.textContent = '1인 80만원 차이';
    if (compareTitle) compareTitle.innerHTML = '<strong>둘이면</strong>';
    if (compareSave) compareSave.style.display = 'none';
    if (compareMega) compareMega.textContent = '160만원 차이';

    if (priceCards[0]) {
      const label = $('span', priceCards[0]);
      const value = $('strong', priceCards[0]);
      if (label) label.textContent = '2명 여행사 · 가이드 포함';
      if (value) value.textContent = '400만원';
    }
    if (priceCards[1]) {
      const label = $('span', priceCards[1]);
      const value = $('strong', priceCards[1]);
      if (label) label.textContent = '2명 직접 예약';
      if (value) value.textContent = '240만원';
    }
    if (arrow) arrow.textContent = '→';

    const sameKicker = $('.mv2-kicker', same);
    const sameTitle = $('.mv2-title', same);
    if (sameKicker) sameKicker.textContent = '160만원 아끼고';
    if (sameTitle) sameTitle.innerHTML = '<strong>크루즈는 그대로</strong>';
  }

  function installStyles() {
    $('#membership-adflow-1-4-style')?.remove();

    const style = document.createElement('style');
    style.id = 'membership-adflow-1-4-style';
    style.textContent = `
      #price-pain::before,#price-pain::after,
      #price-compare::before,
      #same-cruise::before,#same-cruise::after{display:none!important}

      #price-pain,#price-bridge,#price-compare,#same-cruise{
        margin:0!important;
        background:#0c1730!important;
        background-image:none!important;
        color:#fff!important;
        box-shadow:none!important;
      }

      #price-pain{padding:clamp(150px,13vw,220px) 0!important}
      #price-bridge{padding:clamp(140px,12vw,205px) 0!important;min-height:clamp(640px,80vh,850px)!important}
      #price-compare{padding:clamp(150px,13vw,220px) 0!important}
      #same-cruise{padding:clamp(160px,14vw,230px) 0!important}

      #price-pain .mv2-kicker,#price-compare .mv2-kicker,#same-cruise .mv2-kicker{
        background:rgba(255,255,255,.10)!important;
        color:#dce8ff!important;
      }
      #price-pain .mv2-title,#price-compare .mv2-title,#same-cruise .mv2-title{color:#fff!important}
      #price-pain .mv2-title{margin-top:18px!important}
      #price-pain .mv2-mega{margin-top:46px!important;color:#fff!important;text-shadow:none!important;animation:none!important}
      #price-pain .mv2-save{margin-top:34px!important;color:#fff!important;background:transparent!important;border:0!important;padding:0!important;animation:none!important}
      #price-pain .mv2-save strong{color:#9fc0ff!important}

      #price-bridge .pb-lead,#price-bridge .pb-diff,#price-bridge .pb-arrow{color:#fff!important}
      #price-bridge .pb-price span{color:rgba(255,255,255,.68)!important;opacity:1!important}
      #price-bridge .pb-price strong{position:relative;color:#fff!important}
      #price-bridge .pb-price.old strong{color:rgba(255,255,255,.78)!important}
      #price-bridge .pb-price.old strong::after{display:none!important}
      #price-bridge .af-strike{
        position:absolute;left:-3%;right:-3%;top:51%;height:clamp(5px,.55vw,8px);
        display:block;background:#9fc0ff;transform:scaleX(0);transform-origin:left center;pointer-events:none
      }

      #price-compare .mv2-inner{display:flex;flex-direction:column;align-items:center}
      #price-compare .mv2-kicker{order:1}
      #price-compare .mv2-title{order:2;margin-top:16px!important}
      #price-compare .mv2-compare{order:3;width:100%;margin-top:56px!important}
      #price-compare .mv2-mega{order:4;margin-top:46px!important;font-size:clamp(76px,10vw,140px)!important;color:#9fc0ff!important;animation:none!important}
      #price-compare .mv2-save{order:5}
      #price-compare .mv2-price{
        background:transparent!important;
        border-top:1px solid rgba(255,255,255,.18)!important;
        border-bottom:1px solid rgba(255,255,255,.18)!important;
        border-left:0!important;border-right:0!important;border-radius:0!important;
        box-shadow:none!important;animation:none!important;
      }
      #price-compare .mv2-price span{color:rgba(255,255,255,.68)!important}
      #price-compare .mv2-price strong{color:#fff!important}
      #price-compare .mv2-price.good strong{color:#9fc0ff!important}
      #price-compare .mv2-arrow{color:#9fc0ff!important;animation:none!important}

      #same-cruise .mv2-title{margin-top:16px!important;animation:none!important}
      #same-cruise .mv2-four{margin-top:64px!important;border-color:rgba(255,255,255,.20)!important}
      #same-cruise .mv2-four div{
        color:#fff!important;animation:none!important;background:transparent!important;
        box-shadow:inset 0 0 0 0 rgba(159,192,255,0);will-change:transform,opacity,background-color
      }
      #same-cruise .mv2-four div+div{border-color:rgba(255,255,255,.20)!important}
      #same-cruise .mv2-four div::after{display:none!important}

      #price-pain .s14-anim,#price-compare .s14-anim,#same-cruise .s14-anim{
        opacity:1!important;translate:0 0!important;scale:1!important;filter:none!important;transition:none!important
      }
      #price-bridge .pb-reveal{opacity:1!important;transform:none!important;transition:none!important}

      .af-gsap-ready{will-change:transform,opacity}

      @media(max-width:780px){
        #price-pain{padding:118px 0!important}
        #price-bridge{padding:118px 0!important;min-height:640px!important}
        #price-compare{padding:122px 0!important}
        #same-cruise{padding:126px 0 140px!important}
        #price-compare .mv2-compare{margin-top:42px!important}
        #price-compare .mv2-mega{font-size:clamp(60px,16vw,88px)!important;margin-top:34px!important}
        #same-cruise .mv2-four{margin-top:48px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function addStrike() {
    const oldStrong = $('#price-bridge .pb-price.old strong');
    if (!oldStrong || $('.af-strike', oldStrong)) return;
    const strike = document.createElement('i');
    strike.className = 'af-strike';
    strike.setAttribute('aria-hidden', 'true');
    oldStrong.appendChild(strike);
  }

  function initMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.gsap || !window.ScrollTrigger) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const pain = $('#price-pain');
    const bridge = $('#price-bridge');
    const compare = $('#price-compare');
    const same = $('#same-cruise');
    if (!pain || !bridge || !compare || !same) return;

    const makeEntrance = (section, targets, from = {}) => {
      const els = targets.filter(Boolean);
      if (!els.length) return;
      els.forEach((el) => el.classList.add('af-gsap-ready'));
      gsap.from(els, {
        scrollTrigger: { trigger: section, start: 'top 76%', once: true },
        y: from.y ?? 34,
        x: from.x ?? 0,
        scale: from.scale ?? 1,
        opacity: 0,
        duration: .78,
        stagger: .1,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    };

    makeEntrance(pain, [$('.mv2-kicker', pain), $('.mv2-title', pain), $('.mv2-mega', pain), $('.mv2-save', pain)], { y: 42, scale: .96 });
    makeEntrance(compare, [$('.mv2-kicker', compare), $('.mv2-title', compare), ...$$('.mv2-price', compare), $('.mv2-arrow', compare), $('.mv2-mega', compare)], { y: 36, scale: .97 });
    makeEntrance(same, [$('.mv2-kicker', same), $('.mv2-title', same), ...$$('.mv2-four div', same)], { y: 38, scale: .97 });

    const painMega = $('.mv2-mega', pain);
    const painLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.25 })
      .to(painMega, { scale: 1.045, y: -5, duration: .48, ease: 'power2.out' })
      .to(painMega, { scale: 1, y: 0, duration: .7, ease: 'expo.out' })
      .to({}, { duration: 1.15 });

    const oldPrice = $('.pb-price.old', bridge);
    const oldStrong = $('.pb-price.old strong', bridge);
    const strike = $('.af-strike', bridge);
    const bridgeArrow = $('.pb-arrow', bridge);
    const newPrice = $('.pb-price.new', bridge);
    const diff = $('.pb-diff', bridge);
    const bridgeLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.05 });
    bridgeLoop
      .set([oldPrice, bridgeArrow, newPrice, diff], { clearProps: 'all' })
      .set(strike, { scaleX: 0 })
      .fromTo(oldPrice, { opacity: .35, x: -26 }, { opacity: 1, x: 0, duration: .62, ease: 'expo.out' })
      .to(strike, { scaleX: 1, duration: .5, ease: 'power3.inOut' }, '+=.18')
      .to(oldStrong, { opacity: .5, x: -8, duration: .4, ease: 'power2.out' }, '<')
      .fromTo(bridgeArrow, { opacity: 0, x: -20 }, { opacity: 1, x: 15, duration: .52, ease: 'expo.out' }, '-=.12')
      .fromTo(newPrice, { opacity: 0, x: 28, scale: .82 }, { opacity: 1, x: 0, scale: 1.06, duration: .58, ease: 'back.out(1.5)' }, '-=.22')
      .to(newPrice, { scale: 1, duration: .35, ease: 'power2.out' })
      .fromTo(diff, { opacity: 0, y: 32, scale: .9 }, { opacity: 1, y: 0, scale: 1, duration: .58, ease: 'expo.out' }, '-=.15')
      .to(diff, { scale: 1.035, duration: .28, ease: 'power2.out' })
      .to(diff, { scale: 1, duration: .42, ease: 'power2.inOut' })
      .to({}, { duration: 1.35 });

    const compareCards = $$('.mv2-price', compare);
    const compareArrow = $('.mv2-arrow', compare);
    const compareMega = $('.mv2-mega', compare);
    const compareLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.35 });
    if (compareCards.length >= 2) {
      compareLoop
        .set([compareCards[0], compareCards[1], compareArrow, compareMega], { clearProps: 'transform,opacity,backgroundColor' })
        .to(compareCards[0], { x: -12, opacity: .58, duration: .5, ease: 'power2.out' })
        .fromTo(compareArrow, { x: -14, opacity: .35 }, { x: 16, opacity: 1, duration: .55, ease: 'expo.out' }, '-=.25')
        .fromTo(compareCards[1], { x: 26, scale: .92 }, { x: 0, scale: 1.045, duration: .56, ease: 'back.out(1.35)' }, '-=.28')
        .to(compareCards[1], { scale: 1, duration: .34, ease: 'power2.out' })
        .fromTo(compareMega, { y: 30, scale: .86, opacity: .2 }, { y: 0, scale: 1, opacity: 1, duration: .62, ease: 'expo.out' }, '-=.12')
        .to(compareMega, { scale: 1.035, duration: .3, ease: 'power2.out' })
        .to(compareMega, { scale: 1, duration: .42, ease: 'power2.inOut' })
        .to({}, { duration: 1.45 });
    }

    const sameTitle = $('.mv2-title', same);
    const sameItems = $$('.mv2-four div', same);
    const sameLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.35 });
    sameLoop
      .to(sameTitle, { y: -4, scale: 1.02, duration: .45, ease: 'power2.out' })
      .to(sameTitle, { y: 0, scale: 1, duration: .55, ease: 'expo.out' });
    sameItems.forEach((item, index) => {
      sameLoop
        .fromTo(item,
          { y: 10, opacity: .55, backgroundColor: 'rgba(159,192,255,0)' },
          { y: -5, opacity: 1, backgroundColor: 'rgba(159,192,255,.10)', duration: .42, ease: 'power3.out' },
          index === 0 ? '-=.15' : '-=.20')
        .to(item, { y: 0, backgroundColor: 'rgba(159,192,255,0)', duration: .5, ease: 'power2.inOut' });
    });
    sameLoop.to({}, { duration: 1.25 });

    const bindLoop = (section, timeline, threshold = .35) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 78%',
        end: 'bottom 22%',
        onEnter: () => timeline.restart(),
        onEnterBack: () => timeline.restart(),
        onLeave: () => timeline.pause(),
        onLeaveBack: () => timeline.pause()
      });
    };

    bindLoop(pain, painLoop);
    bindLoop(bridge, bridgeLoop);
    bindLoop(compare, compareLoop);
    bindLoop(same, sameLoop);
  }

  function init() {
    applyCopy();
    installStyles();
    addStrike();
    initMotion();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
