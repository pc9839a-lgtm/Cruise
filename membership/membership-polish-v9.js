(() => {
  'use strict';

  const STYLE_ID = 'membership-final-style';

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .pmx-section,.pmx-section *,
      .ig8-section,.ig8-section *,
      #calculator,#calculator *,
      #plans,#plans *{box-sizing:border-box;font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}

      .pmx-section,.ig8-section{position:relative;overflow:hidden}
      .pmx-inner{width:min(1040px,calc(100% - 40px));margin:0 auto;text-align:center}
      #plans .membership-section-head .section-kicker{display:none!important}

      .pmx-big-title,.ig8-title,#calculator .section-head h2,#plans .membership-section-head h2{
        max-width:940px;margin-left:auto;margin-right:auto;
        font-size:clamp(42px,5.5vw,72px)!important;line-height:1.09!important;
        letter-spacing:-.055em!important;font-weight:620!important;word-break:keep-all;text-wrap:balance
      }
      .pmx-big-title strong,.ig8-title strong,#calculator .section-head h2 strong,#plans .membership-section-head h2 strong{font-weight:900!important}
      .pmx-lead,.ig8-sub{font-size:clamp(23px,2.7vw,32px)!important;line-height:1.42!important;letter-spacing:-.03em!important;font-weight:480!important;word-break:keep-all}
      .pmx-kicker,.ig8-kicker{display:inline-flex;align-items:center;justify-content:center;margin-bottom:22px;padding:9px 16px;border-radius:999px;background:#eef3fb;color:#2b5da8;font-size:clamp(19px,2vw,23px)!important;line-height:1.2;font-weight:680!important;letter-spacing:-.025em}

      .pmx-enter{opacity:0;transform:translateY(22px);transition:opacity .5s cubic-bezier(.22,1,.36,1),transform .5s cubic-bezier(.22,1,.36,1)}
      .pmx-visible .pmx-enter{opacity:1;transform:none}
      .pmx-visible .pmx-enter:nth-child(2){transition-delay:.06s}.pmx-visible .pmx-enter:nth-child(3){transition-delay:.12s}.pmx-visible .pmx-enter:nth-child(4){transition-delay:.18s}

      .ig8-section{min-height:600px;display:flex;align-items:center;padding:92px 0;isolation:isolate}
      .ig8-white{background:#fff;color:#10182b}.ig8-soft{background:#f4f6f9;color:#10182b}.ig8-dark{background:#0c1730;color:#fff}.ig8-blue{background:#1f4f96;color:#fff}
      .ig8-wrap{position:relative;z-index:2;width:min(1040px,100%);margin:0 auto;text-align:center}
      .ig8-section h2,.ig8-section p,.ig8-section span,.ig8-section strong{word-break:keep-all}
      .ig8-dark .ig8-kicker,.ig8-blue .ig8-kicker{background:rgba(255,255,255,.11);color:#e5efff}
      .ig8-accent{color:#2d6cff}.ig8-dark .ig8-accent,.ig8-blue .ig8-accent{color:#c4d7ff}
      .ig8-pair{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:22px;max-width:900px;margin:46px auto 0}
      .ig8-card{padding:34px 28px;border-radius:30px;background:#fff;border:1px solid #dfe5ef;box-shadow:0 18px 44px rgba(23,49,92,.08);color:#10182b}
      .ig8-dark .ig8-card,.ig8-blue .ig8-card{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.16);box-shadow:none;color:#fff}
      .ig8-card span{display:block;font-size:clamp(22px,2.5vw,29px);line-height:1.25;font-weight:470}.ig8-card strong{display:block;margin-top:14px;font-size:clamp(52px,6.8vw,86px);line-height:.95;letter-spacing:-.06em;font-weight:900}
      .ig8-symbol{font-size:44px;font-weight:630;color:#86a5dc}
      .ig8-ledger{max-width:840px;margin:44px auto 0;text-align:left}
      .ig8-ledger-row{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:end;padding:26px 4px;border-top:1px solid rgba(17,31,56,.13)}
      .ig8-dark .ig8-ledger-row{border-color:rgba(255,255,255,.17)}.ig8-ledger-row:first-child{border-top:0}
      .ig8-ledger-row span{font-size:clamp(24px,2.8vw,32px);line-height:1.35;font-weight:470}.ig8-ledger-row strong{font-size:clamp(39px,4.9vw,60px);line-height:1;font-weight:840;letter-spacing:-.05em}
      .ig8-ledger-row.total{margin-top:6px;padding-top:30px;border-top:3px solid #2d6cff}.ig8-ledger-row.total span{font-weight:650}.ig8-ledger-row.total strong{color:#c4d7ff;font-weight:920}
      .ig8-routes{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:1040px;margin:44px auto 0}
      .ig8-route{position:relative;min-height:280px;padding:28px 20px;border-radius:27px;background:#fff;border:1px solid #dfe5ef;box-shadow:0 18px 46px rgba(23,49,92,.08);text-align:left;color:#10182b;overflow:hidden}
      .ig8-route::before{content:'';position:absolute;left:0;right:0;top:0;height:4px;background:#2d6cff;transform:scaleX(0);transform-origin:left;transition:transform .7s cubic-bezier(.22,1,.36,1)}
      .ig8-reveal.is-visible .ig8-route::before{transform:scaleX(1)}
      .ig8-route h3{margin:0;font-size:clamp(28px,2.6vw,36px);line-height:1.15;font-weight:720;letter-spacing:-.04em}.ig8-route-price{display:block;margin-top:22px;font-size:clamp(39px,4.2vw,53px);line-height:1;font-weight:900;letter-spacing:-.055em}.ig8-route-arrow{display:block;margin:15px 0 10px;color:#819bc8;font-size:26px;font-weight:600}.ig8-route-actual{display:block;color:#2d67c7;font-size:clamp(29px,2.9vw,37px);line-height:1.08;font-weight:850}.ig8-route-save{display:inline-flex;margin-top:20px;padding:8px 12px;border-radius:999px;background:#edf3ff;color:#255bb6;font-size:clamp(18px,1.8vw,21px);font-weight:700}

      .ig8-reveal{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}
      .ig8-reveal .ig8-kicker,.ig8-reveal .ig8-title,.ig8-reveal .ig8-sub,.ig8-reveal .ig8-card,.ig8-reveal .ig8-ledger-row,.ig8-reveal .ig8-route{opacity:0!important;transform:translateY(18px)!important;transition:opacity .46s ease-out,transform .46s ease-out!important}
      .ig8-reveal.is-visible .ig8-kicker,.ig8-reveal.is-visible .ig8-title,.ig8-reveal.is-visible .ig8-sub,.ig8-reveal.is-visible .ig8-card,.ig8-reveal.is-visible .ig8-ledger-row,.ig8-reveal.is-visible .ig8-route{opacity:1!important;transform:none!important}

      #trust-proof{min-height:620px;display:flex;align-items:center;padding:92px 0;background:#fff;color:#10182b;border-bottom:1px solid #e7ebf0}
      .pmx-trust-grid{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:52px auto 0;border-top:1px solid #dfe5ef;border-bottom:1px solid #dfe5ef}
      .pmx-trust-grid article{min-height:188px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:26px 18px;opacity:0;transform:translateY(28px) scale(.98);transition:opacity .56s cubic-bezier(.22,1,.36,1),transform .56s cubic-bezier(.22,1,.36,1)}
      #trust-proof.pmx-visible .pmx-trust-grid article{opacity:1;transform:none}#trust-proof.pmx-visible .pmx-trust-grid article:nth-child(1){transition-delay:.16s}#trust-proof.pmx-visible .pmx-trust-grid article:nth-child(2){transition-delay:.27s}#trust-proof.pmx-visible .pmx-trust-grid article:nth-child(3){transition-delay:.38s}
      .pmx-trust-grid article+article{border-left:1px solid #dfe5ef}.pmx-trust-grid strong{font-size:clamp(50px,6vw,76px);line-height:.95;font-weight:920;letter-spacing:-.06em;color:#10182b}.pmx-trust-grid span{margin-top:12px;font-size:clamp(22px,2.5vw,29px);font-weight:650;color:#33425f;word-break:keep-all}.pmx-trust-grid em{margin-top:7px;font-style:normal;font-size:clamp(18px,1.9vw,21px);color:#6e7d98;font-weight:500;word-break:keep-all}

      #travel-desire{padding:0;background:#0c1730;color:#fff}.pmx-cruise-visual{position:relative;min-height:clamp(520px,64vw,760px);display:flex;align-items:flex-end;overflow:hidden}.pmx-cruise-visual img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 52%;display:block}.pmx-cruise-visual::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,14,30,.06) 18%,rgba(5,14,30,.76) 100%)}.pmx-cruise-copy{position:relative;z-index:2;width:min(1040px,calc(100% - 40px));margin:0 auto;padding:0 0 74px;text-align:left}#travel-desire .pmx-kicker{background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.18);color:#fff}#travel-desire .pmx-big-title{max-width:900px;margin:0;text-align:left;color:#fff}

      #quick-result{min-height:620px;display:flex;align-items:center;padding:92px 0;background:#fff;color:#10182b}.pmx-compare{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:26px;max-width:950px;margin:48px auto 0}.pmx-price-side{padding:34px 24px;border-top:1px solid #dfe5ef;border-bottom:1px solid #dfe5ef}.pmx-price-side span{display:block;font-size:clamp(22px,2.5vw,29px);font-weight:570;color:#66748d}.pmx-price-side strong{display:block;margin-top:14px;font-size:clamp(58px,7.5vw,92px);line-height:.9;font-weight:920;letter-spacing:-.07em}.pmx-price-side.good strong{color:#245fc4}.pmx-arrow{font-size:44px;color:#7890b8;font-weight:500}.pmx-save{margin-top:34px;font-size:clamp(30px,4vw,48px);font-weight:760;letter-spacing:-.045em}.pmx-save strong{font-weight:920;color:#245fc4}

      #subscribe-bridge{min-height:460px;display:flex;align-items:center;padding:72px 0;background:#1f4f96;color:#fff}#subscribe-bridge .pmx-big-title{color:#fff;max-width:920px}#subscribe-bridge .pmx-bridge-pre{display:block;margin-bottom:18px;font-size:clamp(22px,2.5vw,29px);font-weight:560;color:rgba(255,255,255,.78);letter-spacing:-.03em}

      #calculator.ig8-calculator{min-height:0;padding:92px 0;background:#f4f6f9;color:#10182b;position:relative;overflow:hidden}#calculator.ig8-calculator>.container{width:min(1120px,calc(100% - 40px));margin:0 auto}#calculator.ig8-calculator .section-head{margin-bottom:44px;text-align:center}#calculator.ig8-calculator .section-head p{display:none!important}#calculator.ig8-calculator .exchange-bar{display:flex;align-items:center;justify-content:space-between;gap:24px;margin:0 auto 18px;padding:22px 28px;border:1px solid #dfe5ef;border-radius:24px;background:#fff;box-shadow:none}#calculator.ig8-calculator .exchange-label{font-size:20px;font-weight:600;color:#637393}#calculator.ig8-calculator #exchangeRateText{font-size:clamp(28px,3.5vw,40px);line-height:1;font-weight:850;letter-spacing:-.045em;color:#10182b}#calculator.ig8-calculator .exchange-meta{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}#calculator.ig8-calculator .calculator-card{margin:0 auto;padding:38px;border:1px solid #dfe5ef;border-radius:30px;background:#fff;box-shadow:0 20px 54px rgba(23,49,92,.08);transform:translateY(30px);opacity:0;transition:opacity .65s .16s cubic-bezier(.22,1,.36,1),transform .65s .16s cubic-bezier(.22,1,.36,1)}#calculator.ig8-calculator.is-visible .calculator-card{transform:none;opacity:1}#calculator.ig8-calculator .calculator-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:24px}#calculator.ig8-calculator .calculator-head strong{font-size:clamp(24px,2.8vw,31px);font-weight:620;color:#10182b}#calculator.ig8-calculator #rangeValue{font-size:clamp(46px,6vw,72px);line-height:.92;font-weight:900;letter-spacing:-.06em;color:#10182b}#calculator.ig8-calculator .price-range{margin:8px 0 28px;height:10px}#calculator.ig8-calculator .calculator-mode{display:grid;grid-template-columns:1fr 1fr;width:min(560px,100%);margin:0 auto 32px;padding:5px;border:1px solid #dfe5ef;border-radius:18px;background:#f4f6f9}#calculator.ig8-calculator .mode-btn{min-height:54px;border:0;border-radius:14px;background:transparent;color:#637393;font-size:20px;font-weight:650;box-shadow:none}#calculator.ig8-calculator .mode-btn.active{background:#10182b;color:#fff}#calculator.ig8-calculator .calculator-note{display:none!important}#calculator.ig8-calculator .result-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:0}#calculator.ig8-calculator .result-box{min-height:185px;padding:28px 24px;border:1px solid #dfe5ef;border-radius:24px;background:#fff;box-shadow:none;display:flex;flex-direction:column;justify-content:center;text-align:left}#calculator.ig8-calculator .result-box:first-child{display:none!important}#calculator.ig8-calculator .result-box span{font-size:clamp(21px,2.2vw,25px);font-weight:560;color:#637393}#calculator.ig8-calculator .result-box strong{display:block;margin-top:14px;font-size:clamp(42px,5vw,58px);line-height:.95;font-weight:900;letter-spacing:-.05em;color:#10182b}#calculator.ig8-calculator .result-box em,#calculator.ig8-calculator .result-box small{display:none!important}#calculator.ig8-calculator .result-box.highlight{background:#1f4f96;border-color:#1f4f96;color:#fff}#calculator.ig8-calculator .result-box.highlight span,#calculator.ig8-calculator .result-box.highlight strong{color:#fff}#calculator.ig8-calculator .section-kicker{display:none!important}
      #calculator .pmx-calc-cta{display:flex;align-items:center;justify-content:center;width:min(560px,100%);min-height:68px;margin:24px auto 0;padding:0 28px;border:0;border-radius:18px;background:#10182b;color:#fff;font-size:clamp(22px,2.4vw,28px);font-weight:760;letter-spacing:-.035em;cursor:pointer}

      #price-match{min-height:650px;display:flex;align-items:center;padding:96px 0;background:#0c1730;color:#fff}#price-match .pmx-kicker{background:rgba(255,255,255,.09);color:#e3edff;border:1px solid rgba(255,255,255,.14)}#price-match .pmx-big-title{color:#fff}#price-match .pmx-main{margin:38px 0 0;font-size:clamp(86px,12vw,150px);line-height:.88;font-weight:920;letter-spacing:-.08em;color:#c8d9ff}#price-match .pmx-copy{max-width:850px;margin:28px auto 0;font-size:clamp(23px,2.8vw,32px);line-height:1.42;font-weight:470;color:rgba(255,255,255,.82);word-break:keep-all}#price-match .pmx-copy strong{color:#fff;font-weight:800}

      #signup-steps{padding:88px 0;background:#f5f6f8;color:#10182b}.pmx-step-grid{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center;gap:18px;max-width:980px;margin:46px auto 0}.pmx-step,.pmx-step-arrow{opacity:0;transform:translateY(26px);transition:opacity .52s cubic-bezier(.22,1,.36,1),transform .52s cubic-bezier(.22,1,.36,1)}#signup-steps.pmx-visible .pmx-step,#signup-steps.pmx-visible .pmx-step-arrow{opacity:1;transform:none}#signup-steps.pmx-visible .pmx-step:nth-child(1){transition-delay:.12s}#signup-steps.pmx-visible .pmx-step-arrow:nth-child(2){transition-delay:.20s}#signup-steps.pmx-visible .pmx-step:nth-child(3){transition-delay:.28s}#signup-steps.pmx-visible .pmx-step-arrow:nth-child(4){transition-delay:.36s}#signup-steps.pmx-visible .pmx-step:nth-child(5){transition-delay:.44s}.pmx-step{min-height:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;border-top:1px solid #d8dee8;border-bottom:1px solid #d8dee8}.pmx-step b{font-size:20px;color:#2a63be;font-weight:800}.pmx-step strong{margin-top:10px;font-size:clamp(28px,3.3vw,40px);font-weight:820;word-break:keep-all}.pmx-step-arrow{font-size:34px;color:#8498bb}

      #hotel-benefit{min-height:620px;display:flex;align-items:center;padding:92px 0;background:#0c1730;color:#fff}#hotel-benefit .pmx-big-title{color:#fff;max-width:940px}#hotel-benefit .pmx-hotel-lead{max-width:820px;margin:24px auto 0;font-size:clamp(23px,2.7vw,31px);line-height:1.42;font-weight:470;color:rgba(255,255,255,.76);word-break:keep-all}.pmx-tripline{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:54px auto 0;border-top:1px solid rgba(255,255,255,.2);border-bottom:1px solid rgba(255,255,255,.2)}.pmx-tripline-item{min-height:190px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:30px 34px;text-align:left;opacity:0;transform:translateY(24px);transition:opacity .52s cubic-bezier(.22,1,.36,1),transform .52s cubic-bezier(.22,1,.36,1)}#hotel-benefit.pmx-visible .pmx-tripline-item{opacity:1;transform:none}#hotel-benefit.pmx-visible .pmx-tripline-item:nth-child(1){transition-delay:.12s}#hotel-benefit.pmx-visible .pmx-tripline-item:nth-child(2){transition-delay:.22s}#hotel-benefit.pmx-visible .pmx-tripline-item:nth-child(3){transition-delay:.32s}.pmx-tripline-item+.pmx-tripline-item{border-left:1px solid rgba(255,255,255,.2)}.pmx-tripline-item b{font-size:18px;letter-spacing:.08em;color:#9db9ea;font-weight:760}.pmx-tripline-item strong{margin-top:12px;font-size:clamp(29px,3.2vw,40px);font-weight:820;line-height:1.12;word-break:keep-all}.pmx-tripline-item span{margin-top:10px;font-size:clamp(19px,2vw,23px);line-height:1.35;color:rgba(255,255,255,.7);font-weight:460;word-break:keep-all}

      #plans .plan-fit{margin:-8px 0 22px;padding:0 2px;font-size:clamp(18px,2vw,21px);line-height:1.4;font-weight:600;letter-spacing:-.025em;word-break:keep-all}#plans .recommended .plan-fit{color:rgba(255,255,255,.8)}#plans .plan-card:not(.recommended) .plan-fit{color:#53617a}

      @media(max-width:780px){
        .pmx-inner{width:min(100% - 24px,680px)}.pmx-big-title,.ig8-title,#calculator .section-head h2,#plans .membership-section-head h2{font-size:clamp(35px,9.5vw,43px)!important;line-height:1.12!important}.pmx-kicker,.ig8-kicker{font-size:18px!important;margin-bottom:18px}
        .ig8-section{min-height:540px;padding:70px 0}.ig8-pair{grid-template-columns:1fr;gap:12px;margin-top:36px}.ig8-symbol{transform:rotate(90deg);font-size:28px}.ig8-card{padding:27px 18px}.ig8-card span{font-size:21px}.ig8-card strong{font-size:clamp(47px,13.5vw,64px)}.ig8-ledger-row{grid-template-columns:1fr;gap:8px;text-align:center}.ig8-ledger-row span{font-size:22px}.ig8-ledger-row strong{font-size:41px}.ig8-routes{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:36px}.ig8-route{min-height:235px;padding:20px 12px;border-radius:22px}.ig8-route h3{font-size:23px}.ig8-route-price{font-size:32px;margin-top:17px}.ig8-route-arrow{font-size:21px;margin:12px 0 8px}.ig8-route-actual{font-size:25px}.ig8-route-save{font-size:16px;margin-top:16px;padding:7px 9px}
        #trust-proof{min-height:560px;padding:72px 0}.pmx-trust-grid{grid-template-columns:1fr;margin-top:36px}.pmx-trust-grid article{min-height:120px}.pmx-trust-grid article+article{border-left:0;border-top:1px solid #dfe5ef}.pmx-trust-grid strong{font-size:50px}.pmx-trust-grid span{font-size:23px}.pmx-trust-grid em{font-size:18px}
        .pmx-cruise-visual{min-height:560px}.pmx-cruise-copy{width:min(100% - 24px,680px);padding-bottom:54px}.pmx-cruise-visual img{object-position:center 52%}
        #quick-result{min-height:540px;padding:72px 0}.pmx-compare{grid-template-columns:1fr;gap:10px;margin-top:34px}.pmx-arrow{transform:rotate(90deg);font-size:30px}.pmx-price-side{padding:24px 14px}.pmx-price-side strong{font-size:58px}.pmx-save{font-size:32px;margin-top:26px}
        #subscribe-bridge{min-height:380px;padding:62px 0}#subscribe-bridge .pmx-bridge-pre{font-size:21px}
        #calculator.ig8-calculator{padding:70px 0}#calculator.ig8-calculator>.container{width:min(calc(100% - 20px),680px)!important}#calculator.ig8-calculator .section-head{margin-bottom:32px}#calculator.ig8-calculator .exchange-bar{padding:18px 20px;border-radius:20px;align-items:flex-end}#calculator.ig8-calculator .exchange-label{font-size:17px}#calculator.ig8-calculator #exchangeRateText{font-size:27px}#calculator.ig8-calculator .calculator-card{padding:22px 14px!important;border-radius:22px!important}#calculator.ig8-calculator .calculator-head{align-items:flex-end;margin-bottom:20px}#calculator.ig8-calculator .calculator-head strong{font-size:20px!important}#calculator.ig8-calculator #rangeValue{font-size:44px!important}#calculator.ig8-calculator .calculator-mode{width:100%!important;margin-bottom:22px!important}#calculator.ig8-calculator .mode-btn{font-size:17px!important;min-height:50px!important}#calculator.ig8-calculator .result-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}#calculator.ig8-calculator .result-box{min-width:0!important;min-height:128px!important;padding:20px 10px!important;border-radius:20px!important;text-align:center!important}#calculator.ig8-calculator .result-box span{font-size:18px!important;line-height:1.25!important;word-break:keep-all!important}#calculator.ig8-calculator .result-box strong{margin-top:10px!important;font-size:clamp(31px,9.5vw,42px)!important;line-height:.98!important;letter-spacing:-.055em!important;white-space:nowrap!important}#calculator.ig8-calculator .result-box.highlight{grid-column:1/-1!important;width:100%!important;min-height:142px!important;padding:24px 16px!important}#calculator.ig8-calculator .result-box.highlight span{font-size:21px!important}#calculator.ig8-calculator .result-box.highlight strong{font-size:clamp(46px,13vw,60px)!important}#calculator .pmx-calc-cta{min-height:62px;margin-top:16px;font-size:22px;border-radius:16px}
        #price-match{min-height:570px;padding:76px 0}#price-match .pmx-main{font-size:clamp(82px,24vw,114px)}#price-match .pmx-copy{font-size:22px}
        .pmx-step-grid{grid-template-columns:1fr;gap:8px;margin-top:34px}.pmx-step{min-height:105px}.pmx-step-arrow{transform:rotate(90deg);font-size:24px}
        #hotel-benefit{min-height:560px;padding:76px 0}.pmx-tripline{grid-template-columns:1fr;margin-top:38px}.pmx-tripline-item{min-height:112px;padding:24px 8px 24px 28px}.pmx-tripline-item+.pmx-tripline-item{border-left:0;border-top:1px solid rgba(255,255,255,.2)}.pmx-tripline-item b{font-size:16px}.pmx-tripline-item strong{font-size:30px}.pmx-tripline-item span{font-size:19px}
        #plans .plan-fit{font-size:18px!important}
      }
      @media(max-width:420px){#calculator.ig8-calculator>.container{width:min(calc(100% - 16px),680px)!important}#calculator.ig8-calculator .calculator-card{padding:20px 10px!important}#calculator.ig8-calculator .result-grid{gap:8px!important}#calculator.ig8-calculator .result-box{min-height:120px!important;padding:18px 8px!important}#calculator.ig8-calculator .result-box span{font-size:16px!important}#calculator.ig8-calculator .result-box strong{font-size:clamp(28px,8.8vw,36px)!important}#calculator.ig8-calculator .result-box.highlight{min-height:136px!important}#calculator.ig8-calculator .result-box.highlight span{font-size:19px!important}#calculator.ig8-calculator .result-box.highlight strong{font-size:clamp(44px,13vw,56px)!important}}
      @media(prefers-reduced-motion:reduce){.pmx-enter,.ig8-reveal,.ig8-reveal *,.pmx-trust-grid article,.pmx-step,.pmx-step-arrow,.pmx-tripline-item{opacity:1!important;transform:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function make(tag,id,html,cls){const el=document.createElement(tag);if(id)el.id=id;if(cls)el.className=cls;el.innerHTML=html;return el}
  function section(id,tone,body){return make('section',id,`<div class="container"><div class="ig8-wrap">${body}</div></div>`,`ig8-section ${tone} ig8-reveal`)}

  function animateCounts(root){
    root.querySelectorAll('[data-count],[data-pmx-count]').forEach((el)=>{
      if(el.dataset.counted==='1')return;el.dataset.counted='1';
      const target=Number(el.dataset.count||el.dataset.pmxCount||0),prefix=el.dataset.prefix||'',suffix=el.dataset.suffix||el.dataset.pmxSuffix||'';
      const start=performance.now(),duration=850;
      function tick(now){const p=Math.min(1,(now-start)/duration),eased=1-Math.pow(1-p,3);el.textContent=prefix+Math.round(target*eased).toLocaleString('ko-KR')+suffix;if(p<1)requestAnimationFrame(tick)}
      requestAnimationFrame(tick);
    });
  }

  function observe(nodes){
    const list=nodes.filter(Boolean);
    if(!('IntersectionObserver' in window)){list.forEach((node)=>{node.classList.add('is-visible','pmx-visible');animateCounts(node)});return}
    const io=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(!entry.isIntersecting)return;entry.target.classList.add('is-visible','pmx-visible');animateCounts(entry.target);io.unobserve(entry.target)}),{threshold:.16,rootMargin:'0px 0px -6% 0px'});
    list.forEach((node)=>io.observe(node));
  }

  function removeObsolete(){
    ['why-save','why-direct','how-it-works','travel-subscribe','earn-points','membership-summary','ig8-problem-a','ig8-problem-b','ig8-promise','ig8-rule','ig8-cruise','ig8-membership-spend','ig8-total','ig8-saving','ig8-freedom','ig8-final','join-faq','pmx-bottom-cta','trust-proof','travel-desire','quick-result','subscribe-bridge','ig8-start','ig8-monthly','ig8-seven','ig8-payment','ig8-routes','signup-steps'].forEach((id)=>document.getElementById(id)?.remove());
  }

  function rebuildNav(){
    const nav=document.querySelector('.hero-nav-track');if(!nav)return;
    const set=[['#quick-result','01','가격 절감'],['#calculator','02','직접 계산'],['#price-match','03','최저가 보장'],['#plans','04','멤버십 플랜'],['#hotel-benefit','05','호텔 · 투어']].map(([href,num,label])=>`<a href="${href}"><strong>${num}</strong><span>${label}</span></a>`).join('');
    nav.innerHTML=set+set;
  }

  function buildTrust(review){
    const el=make('section','trust-proof',`<div class="pmx-inner"><span class="pmx-kicker pmx-enter">INGROUP · INCRUISES</span><h2 class="pmx-big-title pmx-enter"><strong>10년 넘게 운영된</strong><br>글로벌 여행 멤버십</h2><div class="pmx-trust-grid"><article><strong data-pmx-count="10" data-pmx-suffix="년+">10년+</strong><span>운영 이력</span><em>2015년부터</em></article><article><strong data-pmx-count="350" data-pmx-suffix="만+">350만+</strong><span>전 세계 이용자</span><em>글로벌 여행 플랫폼</em></article><article><strong>CLIA</strong><span>공식 회원</span><em>#00027506</em></article></div></div>`,'pmx-section');
    review.insertAdjacentElement('afterend',el);return el;
  }

  function buildTravel(after){
    const el=make('section','travel-desire',`<div class="pmx-cruise-visual"><img src="https://images.unsplash.com/photo-1688269910705-2d2a9d943a95?auto=format&fit=crop&q=85&w=1800" alt="크루즈 선상 수영장과 바다 풍경" loading="lazy"><div class="pmx-cruise-copy"><span class="pmx-kicker pmx-enter">7박 크루즈</span><h2 class="pmx-big-title pmx-enter">한 번쯤 꿈꿨던 여행,<br><strong>비싸게 예약할 필요 없습니다</strong></h2></div></div>`,'pmx-section');after.insertAdjacentElement('afterend',el);return el;
  }

  function buildQuick(after){
    const el=make('section','quick-result',`<div class="pmx-inner"><span class="pmx-kicker pmx-enter">같은 크루즈, 다른 지출</span><h2 class="pmx-big-title pmx-enter"><strong>$3,500 크루즈</strong>를<br><strong>$2,650</strong>으로 준비</h2><div class="pmx-compare"><div class="pmx-price-side pmx-enter"><span>그냥 예약</span><strong>$3,500</strong></div><div class="pmx-arrow pmx-enter">→</div><div class="pmx-price-side good pmx-enter"><span>미리 준비</span><strong>$2,650</strong></div></div><div class="pmx-save pmx-enter">약 <strong>$850 절감</strong></div></div>`,'pmx-section');after.insertAdjacentElement('afterend',el);return el;
  }

  function buildBridge(after){const el=make('section','subscribe-bridge',`<div class="pmx-inner"><span class="pmx-bridge-pre pmx-enter">방법은 간단합니다</span><h2 class="pmx-big-title pmx-enter">크루즈,<br><strong>구독해서 더 저렴하게 가세요</strong></h2></div>`,'pmx-section');after.insertAdjacentElement('afterend',el);return el}

  function buildCore(after){
    const start=section('ig8-start','ig8-white',`<span class="ig8-kicker">첫 가입</span><h2 class="ig8-title">클래식 시작 비용 <strong>$200</strong></h2><div class="ig8-pair"><div class="ig8-card"><span>시작 비용</span><strong>$200</strong></div><div class="ig8-symbol">→</div><div class="ig8-card"><span>바로 적립</span><strong class="ig8-accent">350P</strong></div></div>`);
    const monthly=section('ig8-monthly','ig8-soft',`<span class="ig8-kicker">그 다음 매월</span><h2 class="ig8-title"><strong>$100</strong> 납부하면<br><strong>200P</strong> 적립</h2><div class="ig8-pair"><div class="ig8-card"><span>내가 납부</span><strong>$100</strong></div><div class="ig8-symbol">→</div><div class="ig8-card"><span>포인트 적립</span><strong class="ig8-accent">200P</strong></div></div>`);
    const seven=section('ig8-seven','ig8-dark',`<span class="ig8-kicker">7개월 준비</span><h2 class="ig8-title">총 <strong>1,750P</strong>가 쌓입니다</h2><div class="ig8-ledger"><div class="ig8-ledger-row"><span>가입 리워드</span><strong>350P</strong></div><div class="ig8-ledger-row"><span>7개월 × 200P</span><strong>1,400P</strong></div><div class="ig8-ledger-row total"><span>총 포인트</span><strong data-count="1750" data-suffix="P">1,750P</strong></div></div>`);
    const payment=section('ig8-payment','ig8-blue',`<span class="ig8-kicker">예약할 때</span><h2 class="ig8-title"><strong>1,750P</strong>를 전부 사용합니다</h2><div class="ig8-pair"><div class="ig8-card"><span>포인트</span><strong data-count="1750" data-suffix="P">1,750P</strong></div><div class="ig8-symbol">+</div><div class="ig8-card"><span>카드</span><strong data-count="1750" data-prefix="$">$1,750</strong></div></div><div class="ig8-sub">남는 포인트 <strong>0P</strong></div>`);
    const routes=section('ig8-routes','ig8-white',`<span class="ig8-kicker">대표 크루즈 예시</span><h2 class="ig8-title">4가지 가격대<br><strong>한눈에 비교</strong></h2><div class="ig8-routes"><article class="ig8-route"><h3>아시아</h3><span class="ig8-route-price">$1,900</span><span class="ig8-route-arrow">↓</span><strong class="ig8-route-actual">$1,450</strong><span class="ig8-route-save">$450 절감</span></article><article class="ig8-route"><h3>지중해</h3><span class="ig8-route-price">$3,500</span><span class="ig8-route-arrow">↓</span><strong class="ig8-route-actual">$2,650</strong><span class="ig8-route-save">$850 절감</span></article><article class="ig8-route"><h3>북유럽</h3><span class="ig8-route-price">$4,300</span><span class="ig8-route-arrow">↓</span><strong class="ig8-route-actual">$3,250</strong><span class="ig8-route-save">$1,050 절감</span></article><article class="ig8-route"><h3>디즈니</h3><span class="ig8-route-price">$5,100</span><span class="ig8-route-arrow">↓</span><strong class="ig8-route-actual">$3,850</strong><span class="ig8-route-save">$1,250 절감</span></article></div>`);
    let cursor=after;[start,monthly,seven,payment,routes].forEach((el)=>{cursor.insertAdjacentElement('afterend',el);cursor=el});return{start,monthly,seven,payment,routes,last:routes};
  }

  function prepareCalculator(after){
    const calc=document.getElementById('calculator');if(!calc)return null;
    calc.className='ig8-calculator ig8-reveal';
    const head=calc.querySelector('.section-head');if(head)head.innerHTML='<span class="ig8-kicker">직접 계산</span><h2 class="ig8-title">이번엔 <strong>내 크루즈 가격</strong>으로 계산해보세요</h2>';
    const label=calc.querySelector('.calculator-head strong');if(label)label.textContent='크루즈 가격';
    const range=calc.querySelector('#cruisePrice');if(range)range.value='3500';
    const desc=calc.querySelector('#modeDescription');if(desc)desc.setAttribute('aria-hidden','true');
    calc.querySelector('.pmx-calc-cta')?.remove();
    const card=calc.querySelector('.calculator-card');if(card){const btn=document.createElement('button');btn.type='button';btn.className='pmx-calc-cta';btn.textContent='이 금액으로 준비 시작하기';btn.addEventListener('click',()=>document.getElementById('plans')?.scrollIntoView({behavior:'smooth',block:'start'}));card.appendChild(btn)}
    after.insertAdjacentElement('afterend',calc);return calc;
  }

  function rebuildPriceMatch(after){
    const pm=document.getElementById('price-match');if(!pm)return null;pm.className='pmx-section';pm.innerHTML=`<div class="pmx-inner"><span class="pmx-kicker pmx-enter">그래도 다른 곳이 더 싸다면?</span><h2 class="pmx-big-title pmx-enter">걱정하지 마세요<br><strong>최저가 보장제</strong></h2><div class="pmx-main pmx-enter">$100+</div><p class="pmx-copy pmx-enter">동일 크루즈 · 일정 · 객실 기준으로 <strong>$100 이상 차이</strong>가 나면<br>조건 확인 후 <strong>가격을 조정합니다.</strong></p></div>`;after.insertAdjacentElement('afterend',pm);return pm;
  }

  function patchPlans(){
    [...document.querySelectorAll('#plans .plan-card')].forEach((card,index)=>{card.querySelector('.plan-fit')?.remove();const name=card.querySelector('.plan-name')?.textContent?.trim()||'';const fit=document.createElement('p');fit.className='plan-fit';fit.textContent=/프리미엄/.test(name)||index===1?'더 빠르게 포인트를 모으고 싶은 분':'1~2년에 한 번 크루즈를 계획하는 분';const main=card.querySelector('.plan-main-line'),mobile=card.querySelector('.plan-mobile-summary');if(main)main.insertAdjacentElement('afterend',fit);else if(mobile)mobile.insertAdjacentElement('afterend',fit);else card.prepend(fit)});
  }

  function watchPlans(){const wrap=document.getElementById('planCards');if(!wrap)return;let scheduled=false;const run=()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;patchPlans()})};new MutationObserver(run).observe(wrap,{childList:true,subtree:true});setTimeout(run,0);setTimeout(run,600);setTimeout(run,1800)}

  function buildSteps(plans){const el=make('section','signup-steps',`<div class="pmx-inner"><h2 class="pmx-big-title pmx-enter">가입은<br><strong>3단계면 끝</strong></h2><div class="pmx-step-grid"><div class="pmx-step"><b>01</b><strong>플랜 선택</strong></div><div class="pmx-step-arrow">→</div><div class="pmx-step"><b>02</b><strong>멤버십 가입</strong></div><div class="pmx-step-arrow">→</div><div class="pmx-step"><b>03</b><strong>포인트 적립</strong></div></div></div>`,'pmx-section');plans.insertAdjacentElement('afterend',el);return el}

  function rebuildHotel(after){const hotel=document.getElementById('hotel-benefit');if(!hotel)return null;hotel.className='pmx-section';hotel.innerHTML=`<div class="pmx-inner"><h2 class="pmx-big-title pmx-enter">크루즈가 끝나도<br><strong>여행은 계속됩니다</strong></h2><p class="pmx-hotel-lead pmx-enter">크루즈 전후 일정까지 한 번에 이어서 준비하세요.</p><div class="pmx-tripline"><div class="pmx-tripline-item"><b>STAY</b><strong>전세계 호텔</strong><span>출발 전후 숙박까지 연결</span></div><div class="pmx-tripline-item"><b>EXPLORE</b><strong>현지 투어</strong><span>기항지에서 즐길 일정까지</span></div><div class="pmx-tripline-item"><b>EXTEND</b><strong>출발 전후 1박</strong><span>여행을 하루 더 여유롭게</span></div></div></div>`;after.insertAdjacentElement('afterend',hotel);return hotel}

  function init(){
    addStyles();removeObsolete();rebuildNav();
    const review=document.querySelector('.review-flow-section');if(!review)return;
    const trust=buildTrust(review),travel=buildTravel(trust),quick=buildQuick(travel),bridge=buildBridge(quick),core=buildCore(bridge),calc=prepareCalculator(core.last),pm=rebuildPriceMatch(calc);
    const plans=document.getElementById('plans');if(plans&&pm)pm.insertAdjacentElement('afterend',plans);
    const steps=plans?buildSteps(plans):null,hotel=steps?rebuildHotel(steps):null;
    document.querySelectorAll('#hotel-benefit svg,footer svg,.pmx-section svg').forEach((svg)=>svg.remove());
    const floating=document.querySelector('.floating-cta');if(floating)floating.textContent='멤버십 플랜 보기';
    watchPlans();
    observe([trust,travel,quick,bridge,core.start,core.monthly,core.seven,core.payment,core.routes,calc,pm,steps,hotel]);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0),{once:true});else setTimeout(init,0);
})();