(() => {
  'use strict';
  const startedAt = Date.now();
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function restoreHero() {
    const shell = $('.hero-section .hero-shell');
    if (!shell) return;
    shell.innerHTML = `
      <div class="hero-overlay"></div>

      <div class="hero-copy-wrap">
        <h1 class="hero-title reveal reveal-rise">
          이제는 여행도<br />
          <strong>구독 서비스로 갑니다</strong>
        </h1>
      </div>

      <div class="hero-visual-stage reveal reveal-pop" aria-hidden="true">
        <span class="hero-coin coin-a">P</span>
        <span class="hero-coin coin-b">P</span>
        <span class="hero-coin coin-c">P</span>

        <div class="hero-ticket hero-ticket-back">
          <span>전세계 호텔 + 크루즈</span>
          <strong>여행 패스</strong>
        </div>

        <div class="hero-ticket hero-ticket-front">
          <span>크루즈 여행구독</span>
          <strong>$100</strong>
          <em>클래식 기준 200P 적립</em>
        </div>

        <img class="hero-shot hero-shot-a" src="./img/KakaoTalk_20260405_150550057_03.jpg" alt="오션뷰 라운지 사진" />
        <img class="hero-shot hero-shot-b" src="./img/음식및엔터24.png" alt="크루즈 공연 사진" />
      </div>
    `;
  }

  function installStageStyles() {
    if ($('#membership-stage-1-4-style')) return;
    const style = document.createElement('style');
    style.id = 'membership-stage-1-4-style';
    style.textContent = `
      /* 1~4 only: spacing + motion */
      .hero-section{padding-bottom:clamp(76px,8vw,126px)!important}
      .review-flow-section{padding-top:clamp(30px,4vw,58px)!important;padding-bottom:clamp(108px,10vw,164px)!important}
      .review-flow-section .review-strip-head{margin-bottom:clamp(42px,5vw,72px)!important}
      .review-flow-section .review-marquee+.review-marquee{margin-top:clamp(22px,2.6vw,38px)!important}

      #price-pain,#price-compare,#same-cruise{
        margin:clamp(58px,6.5vw,104px) 0!important;
        padding:clamp(128px,11vw,182px) 0!important;
        min-height:clamp(650px,76vh,790px);
        display:flex;
        align-items:center;
        isolation:isolate;
      }
      #price-pain{margin-top:clamp(72px,8vw,128px)!important}
      #same-cruise{margin-bottom:clamp(86px,9vw,144px)!important}
      #price-pain::before,#same-cruise::before{
        content:"";position:absolute;inset:auto -12vw -38% auto;width:min(52vw,720px);aspect-ratio:1;border-radius:50%;
        background:radial-gradient(circle,rgba(55,105,210,.18),rgba(55,105,210,0) 66%);pointer-events:none;z-index:-1
      }
      #price-pain::after,#same-cruise::after{
        content:"";position:absolute;left:50%;top:0;width:min(82vw,1180px);height:1px;translate:-50% 0;
        background:linear-gradient(90deg,transparent,rgba(255,255,255,.26),transparent)
      }
      #price-compare::before{
        content:"";position:absolute;left:50%;top:14%;width:min(66vw,880px);height:48%;translate:-50% 0;border-radius:50%;
        background:radial-gradient(ellipse,rgba(46,102,255,.09),rgba(46,102,255,0) 70%);pointer-events:none;z-index:-1
      }
      #price-pain .mv2-inner,#price-compare .mv2-inner,#same-cruise .mv2-inner{position:relative;z-index:1}
      #price-pain .mv2-kicker,#price-compare .mv2-kicker,#same-cruise .mv2-kicker{margin-bottom:8px}
      #price-pain .mv2-mega{margin-top:54px;letter-spacing:-.09em;text-shadow:0 18px 54px rgba(0,0,0,.22)}
      #price-pain .mv2-save{display:inline-flex;margin-top:40px;padding:16px 28px;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(255,255,255,.07)}

      #price-compare .mv2-compare{gap:34px;margin-top:58px}
      #price-compare .mv2-price{
        padding:42px 28px;border:1px solid #e0e7f1;border-radius:30px;background:rgba(255,255,255,.92);
        box-shadow:0 24px 70px rgba(24,54,104,.08)
      }
      #price-compare .mv2-price.good{border-color:#bfd2f2;box-shadow:0 28px 80px rgba(36,95,196,.13)}
      #price-compare .mv2-arrow{font-size:56px;font-weight:800}
      #price-compare .mv2-save{margin-top:42px}
      #price-compare .mv2-mega{margin-top:30px;font-size:clamp(70px,9vw,126px)}

      #same-cruise .mv2-four{margin-top:64px;max-width:1060px;border-color:rgba(255,255,255,.26)}
      #same-cruise .mv2-four div{min-height:178px;font-size:clamp(28px,3vw,38px);position:relative;overflow:hidden}
      #same-cruise .mv2-four div::after{content:"";position:absolute;inset:auto 16% 18px;height:2px;background:linear-gradient(90deg,transparent,rgba(116,163,255,.8),transparent);opacity:.72}

      .s14-anim{
        opacity:0;translate:0 46px;scale:.985;filter:blur(5px);
        transition:opacity .72s cubic-bezier(.2,.7,.2,1),translate .9s cubic-bezier(.16,1,.3,1),scale .9s cubic-bezier(.16,1,.3,1),filter .72s ease;
        transition-delay:var(--s14-delay,0ms);will-change:opacity,translate,scale,filter
      }
      .s14-anim.s14-left{translate:-72px 0}
      .s14-anim.s14-right{translate:72px 0}
      .s14-anim.s14-pop{translate:0 18px;scale:.88}
      .s14-anim.is-visible{opacity:1;translate:0 0;scale:1;filter:blur(0)}
      .s14-anim.s14-soft{filter:blur(8px)}
      .s14-anim.s14-soft.is-visible{filter:blur(0)}

      @media(max-width:780px){
        .hero-section{padding-bottom:68px!important}
        .review-flow-section{padding-top:24px!important;padding-bottom:92px!important}
        .review-flow-section .review-strip-head{margin-bottom:36px!important}
        .review-flow-section .review-marquee+.review-marquee{margin-top:18px!important}
        #price-pain,#price-compare,#same-cruise{margin:46px 0!important;padding:96px 0!important;min-height:600px}
        #price-pain{margin-top:62px!important}
        #same-cruise{margin-bottom:82px!important}
        #price-pain .mv2-mega{margin-top:42px}
        #price-pain .mv2-save{margin-top:30px;padding:13px 20px}
        #price-compare .mv2-compare{gap:20px;margin-top:44px}
        #price-compare .mv2-price{padding:30px 18px;border-radius:24px}
        #price-compare .mv2-arrow{font-size:38px}
        #price-compare .mv2-save{margin-top:30px}
        #price-compare .mv2-mega{margin-top:22px;font-size:clamp(58px,16vw,82px)}
        #same-cruise .mv2-four{margin-top:46px}
        #same-cruise .mv2-four div{min-height:122px;font-size:clamp(23px,6.5vw,30px)}
        .s14-anim.s14-left{translate:-42px 0}.s14-anim.s14-right{translate:42px 0}
      }
      @media(prefers-reduced-motion:reduce){.s14-anim{opacity:1!important;translate:0 0!important;scale:1!important;filter:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function bindStageAnimations() {
    const targets = [];
    const add = (selector, className = '', baseDelay = 0, step = 0) => {
      $$(selector).forEach((el, index) => {
        el.classList.add('s14-anim');
        className.split(' ').filter(Boolean).forEach((name) => el.classList.add(name));
        el.style.setProperty('--s14-delay', `${baseDelay + index * step}ms`);
        targets.push(el);
      });
    };

    add('.hero-section .hero-title', 's14-soft', 40);
    add('.hero-section .hero-ticket-back', 's14-left s14-soft', 140);
    add('.hero-section .hero-ticket-front', 's14-right s14-soft', 220);
    add('.hero-section .hero-shot', 's14-pop', 300, 90);
    add('.review-flow-section .review-strip-head', '', 0);
    add('.review-flow-section .review-marquee-top', 's14-left', 80);
    add('.review-flow-section .review-marquee-middle', 's14-right', 160);
    add('.review-flow-section .review-marquee-bottom', 's14-left', 240);

    add('#price-pain .mv2-kicker', '', 0);
    add('#price-pain .mv2-title', '', 90);
    add('#price-pain .mv2-mega', 's14-pop', 190);
    add('#price-pain .mv2-save', '', 300);

    add('#price-compare .mv2-kicker', '', 0);
    add('#price-compare .mv2-title', '', 80);
    add('#price-compare .mv2-price', 's14-pop', 170, 150);
    add('#price-compare .mv2-arrow', 's14-pop', 260);
    add('#price-compare .mv2-save', '', 430);
    add('#price-compare .mv2-mega', 's14-pop', 520);

    add('#same-cruise .mv2-kicker', '', 0);
    add('#same-cruise .mv2-title', '', 90);
    add('#same-cruise .mv2-four div', 's14-pop', 180, 110);

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -7% 0px' });
    targets.forEach((el) => observer.observe(el));
  }

  function gotoInquiry(event) {
    if (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
    $('#membership-inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function patchPlanCopy() {
    const heading = $('#plans .membership-section-head');
    if (heading) {
      heading.innerHTML = '<h2>내가 언제 갈지만 정하면 됩니다</h2><p>1~2년에 한 번 계획하면 클래식, 포인트를 더 빨리 모으고 싶으면 프리미엄.</p>';
    }
    $$('[data-plan-signup-link]').forEach((link) => {
      link.textContent = '이 플랜으로 내 여행비 확인하기';
    });
    const floating = $('.floating-cta');
    if (floating) floating.textContent = '내 크루즈 가격 확인';
  }

  function bindInquiry() {
    const form = $('#membership-price-form');
    if (!form) return;
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const status = $('#membership-form-status');
      const button = $('#membership-form-submit');
      const region = $('#membership-region').value.trim();
      const time = $('#membership-time').value.trim();
      const people = $('#membership-people').value;
      const name = $('#membership-name').value.trim();
      const phone = $('#membership-phone').value.replace(/\D+/g, '');
      const agree = $('#membership-agree').checked;
      const fail = (message) => {
        status.className = 'mv2-status err';
        status.textContent = message;
      };
      if (!region) return fail('가고 싶은 지역이나 노선을 입력해주세요.');
      if (!time) return fail('대략적인 출발 시기를 입력해주세요.');
      if (!people) return fail('인원을 선택해주세요.');
      if (name.length < 2) return fail('이름을 확인해주세요.');
      if (phone.length < 9 || phone.length > 11) return fail('연락처를 확인해주세요.');
      if (!agree) return fail('개인정보 수집 및 이용 동의가 필요합니다.');

      const q = new URLSearchParams(location.search);
      const data = new FormData();
      const values = {
        form_type: 'main',
        name,
        phone,
        people_count: people,
        interest_schedule_id: 'membership_price',
        schedule_id: 'membership_price',
        region_detail: region,
        travel_ready_status: '',
        age_group: '',
        message: `희망 출발 시기: ${time}`,
        privacy_agree: 'Y',
        form_started_at: String(startedAt),
        website: '',
        agent_code: q.get('agent') || '',
        utm_source: q.get('utm_source') || '',
        utm_medium: q.get('utm_medium') || '',
        utm_campaign: q.get('utm_campaign') || '',
        page_url: location.href,
        referrer: document.referrer || ''
      };
      Object.entries(values).forEach(([k, v]) => data.set(k, v));

      button.disabled = true;
      status.className = 'mv2-status';
      status.textContent = '접수 중입니다.';
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: data,
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        const json = await response.json().catch(() => null);
        if (!response.ok || !json?.success) throw new Error(json?.message || '문의 접수에 실패했습니다.');
        status.textContent = '접수되었습니다. 확인 후 연락드리겠습니다.';
        form.reset();
        window.dataLayer?.push?.({ event: 'membership_price_inquiry_submit' });
      } catch (error) {
        fail(error.message || '문의 접수에 실패했습니다.');
      } finally {
        button.disabled = false;
      }
    });
  }

  function bindClicks() {
    document.addEventListener('click', (event) => {
      const inquiryTarget = event.target.closest('.floating-cta,[data-plan-signup-link],[data-membership-inquiry]');
      if (inquiryTarget) gotoInquiry(event);
    }, true);
  }

  function init() {
    restoreHero();
    installStageStyles();
    bindStageAnimations();
    bindClicks();
    bindInquiry();
    patchPlanCopy();
    setTimeout(patchPlanCopy, 450);
    setTimeout(patchPlanCopy, 1400);
    setTimeout(patchPlanCopy, 2800);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
