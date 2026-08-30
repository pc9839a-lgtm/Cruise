(() => {
  'use strict';

  const STYLE_ID = 'membership-conversion-final-style';

  function addStyles() {
    document.getElementById('membership-final-style')?.remove();
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .pmx-section,.pmx-section *,#calculator,#calculator *,#plans,#plans *{box-sizing:border-box;font-family:Pretendard,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
      .pmx-section{position:relative;overflow:hidden}
      .pmx-inner{width:min(1040px,calc(100% - 40px));margin:0 auto;text-align:center}
      .pmx-label{display:block;margin:0 0 24px;color:#2b5da8;font-size:clamp(19px,2vw,24px);font-weight:850;letter-spacing:-.025em}
      .pmx-title{max-width:980px;margin:0 auto;font-size:clamp(50px,6.2vw,82px);line-height:1.05;letter-spacing:-.06em;font-weight:610;word-break:keep-all;text-wrap:balance}
      .pmx-title strong{font-weight:950}
      .pmx-lead{max-width:880px;margin:32px auto 0;font-size:clamp(25px,3vw,35px);line-height:1.42;letter-spacing:-.032em;font-weight:620;word-break:keep-all}

      .pmx-enter{opacity:0;transform:translateY(64px) scale(.97);filter:blur(9px);transition:opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1),filter .9s cubic-bezier(.22,1,.36,1);transition-delay:var(--pmx-delay,0ms)}
      .pmx-visible .pmx-enter{opacity:1;transform:none;filter:none}

      #travel-desire,#subscribe-why,#subscribe-start,#subscribe-monthly,#subscribe-seven,#subscribe-use,#subscribe-result,#real-booking-case,#trust-proof,#hotel-benefit,#calculator.ig8-calculator{min-height:max(820px,100svh)}
      #subscribe-why,#subscribe-start,#subscribe-monthly,#subscribe-seven,#subscribe-use,#subscribe-result,#real-booking-case,#trust-proof,#hotel-benefit{display:flex;align-items:center;padding:132px 0}

      .pmx-bridge{min-height:68svh;display:flex;align-items:center;padding:100px 0}
      .pmx-bridge.light{background:#f4f6f9;color:#10182b}
      .pmx-bridge.dark{background:#0c1730;color:#fff}
      .pmx-bridge.blue{background:#1f4f96;color:#fff}
      .pmx-bridge-copy{max-width:960px;margin:0 auto;font-size:clamp(44px,5.6vw,72px);line-height:1.12;letter-spacing:-.055em;font-weight:650;word-break:keep-all;text-wrap:balance}
      .pmx-bridge-copy strong{font-weight:950}

      /* 여행 욕구 */
      #travel-desire{padding:0;background:#0c1730;color:#fff}
      .pmx-cruise-visual{position:relative;width:100%;min-height:max(820px,100svh);display:flex;align-items:flex-end;overflow:hidden}
      .pmx-cruise-visual img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 52%;display:block;transform:scale(1.1);transition:transform 2.2s cubic-bezier(.22,1,.36,1)}
      #travel-desire.pmx-visible .pmx-cruise-visual img{transform:scale(1)}
      .pmx-cruise-visual::after{content:'';position:absolute;inset:0;background:rgba(5,14,30,.5)}
      .pmx-cruise-copy{position:relative;z-index:2;width:min(1040px,calc(100% - 40px));margin:0 auto;padding:0 0 110px;text-align:left}
      #travel-desire .pmx-label,#travel-desire .pmx-title,#travel-desire .pmx-lead{color:#fff;text-align:left;margin-left:0}
      #travel-desire .pmx-title{max-width:920px}
      #travel-desire .pmx-lead{max-width:820px;color:rgba(255,255,255,.88)}

      /* 왜 구독 */
      #subscribe-why{background:#f4f6f9;color:#10182b}
      .pmx-why-line{max-width:940px;margin:66px auto 0;padding:44px 0;border-top:1px solid #d8e0ea;border-bottom:1px solid #d8e0ea;font-size:clamp(34px,4.4vw,54px);line-height:1.28;font-weight:730;letter-spacing:-.045em;word-break:keep-all}
      .pmx-why-line strong{color:#245fc4;font-weight:950}

      /* 첫 가입 / 매월 */
      #subscribe-start{background:#fff;color:#10182b}
      #subscribe-monthly{background:#1f4f96;color:#fff}
      #subscribe-monthly .pmx-label{color:#dce8ff}
      #subscribe-monthly .pmx-title,#subscribe-monthly .pmx-lead{color:#fff}
      .pmx-big-pair{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:38px;max-width:980px;margin:72px auto 0}
      .pmx-big-value{padding:46px 24px;border-top:1px solid #dbe2eb;border-bottom:1px solid #dbe2eb}
      .pmx-big-value span{display:block;color:#64728b;font-size:clamp(22px,2.5vw,30px);font-weight:670}
      .pmx-big-value strong{display:block;margin-top:20px;font-size:clamp(72px,9vw,110px);line-height:.86;font-weight:950;letter-spacing:-.075em;white-space:nowrap}
      .pmx-big-arrow{font-size:58px;color:#7890b8;font-weight:760}
      #subscribe-monthly .pmx-big-value{border-color:rgba(255,255,255,.3)}
      #subscribe-monthly .pmx-big-value span{color:rgba(255,255,255,.8)}
      #subscribe-monthly .pmx-big-value strong,#subscribe-monthly .pmx-big-arrow{color:#fff}

      /* 7개월 */
      #subscribe-seven{background:#0c1730;color:#fff}
      #subscribe-seven .pmx-label{color:#a9c3ee}
      #subscribe-seven .pmx-title{color:#fff}
      .pmx-ledger{max-width:920px;margin:70px auto 0;text-align:left}
      .pmx-ledger-row{display:grid;grid-template-columns:1fr auto;align-items:end;gap:28px;padding:34px 6px;border-top:1px solid rgba(255,255,255,.2)}
      .pmx-ledger-row:first-child{border-top:0}
      .pmx-ledger-row span{font-size:clamp(24px,2.8vw,32px);font-weight:630;color:rgba(255,255,255,.8)}
      .pmx-ledger-row strong{font-size:clamp(42px,5vw,60px);font-weight:930;letter-spacing:-.045em}
      .pmx-ledger-row.total{margin-top:14px;padding-top:40px;border-top:3px solid #6f9be5}
      .pmx-ledger-row.total span,.pmx-ledger-row.total strong{color:#fff;font-weight:950}
      .pmx-seven-paid{max-width:920px;margin:42px auto 0;padding:30px 6px;border-top:1px solid rgba(255,255,255,.2);font-size:clamp(24px,2.8vw,32px);font-weight:700;text-align:left;color:rgba(255,255,255,.84)}
      .pmx-seven-paid strong{float:right;color:#fff;font-size:clamp(38px,4.5vw,54px);font-weight:950}

      /* 예약 사용 */
      #subscribe-use{background:#f4f6f9;color:#10182b}
      .pmx-use-price{margin:66px auto 0;font-size:clamp(82px,11vw,140px);line-height:.86;font-weight:950;letter-spacing:-.08em;color:#10182b}
      .pmx-use-split{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:34px;max-width:980px;margin:62px auto 0}
      .pmx-use-part{padding:40px 18px;border-top:1px solid #dbe2eb;border-bottom:1px solid #dbe2eb}
      .pmx-use-part span{display:block;color:#64728b;font-size:clamp(22px,2.5vw,29px);font-weight:660}
      .pmx-use-part strong{display:block;margin-top:16px;font-size:clamp(54px,6.8vw,80px);line-height:.9;font-weight:950;letter-spacing:-.065em;white-space:nowrap}
      .pmx-use-plus{font-size:48px;color:#7890b8;font-weight:800}
      .pmx-use-note{max-width:880px;margin:42px auto 0;font-size:clamp(24px,2.8vw,32px);line-height:1.4;font-weight:700;color:#44536d;word-break:keep-all}
      .pmx-use-note strong{color:#245fc4;font-weight:950}

      /* 실제 현금 지출 */
      #subscribe-result{background:#1f4f96;color:#fff}
      #subscribe-result .pmx-label{color:#dce8ff}
      #subscribe-result .pmx-title{color:#fff}
      .pmx-money-story{max-width:960px;margin:66px auto 0}
      .pmx-money-row{display:grid;grid-template-columns:1.2fr .8fr;align-items:center;gap:30px;padding:34px 8px;border-top:1px solid rgba(255,255,255,.24);text-align:left}
      .pmx-money-row:first-child{border-top:0}
      .pmx-money-row span{font-size:clamp(23px,2.6vw,31px);line-height:1.35;font-weight:680;color:rgba(255,255,255,.82);word-break:keep-all}
      .pmx-money-row strong{font-size:clamp(44px,5.4vw,66px);line-height:.95;font-weight:950;letter-spacing:-.055em;text-align:right;white-space:nowrap}
      .pmx-money-row.point{margin:16px 0;padding:42px 8px;border-top:2px solid rgba(255,255,255,.38);border-bottom:2px solid rgba(255,255,255,.38)}
      .pmx-money-row.point span{color:#fff;font-weight:820}
      .pmx-money-row.point strong{font-size:clamp(54px,6.8vw,82px)}
      .pmx-cash-total{max-width:960px;margin:58px auto 0;padding-top:46px;border-top:1px solid rgba(255,255,255,.26)}
      .pmx-cash-total span{display:block;font-size:clamp(25px,2.9vw,34px);font-weight:720;color:rgba(255,255,255,.86)}
      .pmx-cash-total strong{display:block;margin-top:18px;font-size:clamp(86px,11vw,132px);line-height:.85;font-weight:950;letter-spacing:-.08em}
      .pmx-save-line{margin:34px auto 0;font-size:clamp(33px,4.2vw,52px);font-weight:880}

      /* 실제 예약 */
      #real-booking-case{background:#fff;color:#10182b}
      .pmx-case-route{margin:24px auto 0;color:#586780;font-size:clamp(22px,2.5vw,30px);font-weight:690;word-break:keep-all}
      .pmx-case-features{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:62px auto 0;border-top:1px solid #dce2ea;border-bottom:1px solid #dce2ea}
      .pmx-case-features span{min-height:132px;display:flex;align-items:center;justify-content:center;padding:28px 20px;font-size:clamp(22px,2.5vw,29px);line-height:1.3;font-weight:800;word-break:keep-all}
      .pmx-case-features span+span{border-left:1px solid #dce2ea}
      .pmx-case-prices{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:66px auto 0}
      .pmx-case-price{padding:18px 14px}
      .pmx-case-price span{display:block;color:#64728b;font-size:clamp(20px,2.2vw,25px);font-weight:660}
      .pmx-case-price strong{display:block;margin-top:16px;font-size:clamp(44px,5.5vw,66px);line-height:.94;letter-spacing:-.055em;font-weight:950;white-space:nowrap}
      .pmx-case-price.main strong{color:#245fc4}

      /* 신뢰 */
      #trust-proof{background:#f4f6f9;color:#10182b}
      .pmx-trust-grid{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:66px auto 0;border-top:1px solid #dfe5ef;border-bottom:1px solid #dfe5ef}
      .pmx-trust-grid article{min-height:200px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px 18px}
      .pmx-trust-grid article+article{border-left:1px solid #dfe5ef}
      .pmx-trust-grid strong{font-size:clamp(54px,6.4vw,80px);line-height:.94;font-weight:950;letter-spacing:-.06em}
      .pmx-trust-grid span{margin-top:14px;font-size:clamp(22px,2.4vw,29px);font-weight:730;color:#33425f}
      .pmx-trust-grid em{margin-top:8px;font-style:normal;font-size:18px;color:#6e7d98;font-weight:520}

      /* 호텔/투어 */
      #hotel-benefit{background:#0c1730;color:#fff}
      #hotel-benefit .pmx-label{color:#a9c3ee}
      #hotel-benefit .pmx-title{color:#fff}
      .pmx-tripline{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:64px auto 0;border-top:1px solid rgba(255,255,255,.22);border-bottom:1px solid rgba(255,255,255,.22)}
      .pmx-tripline-item{min-height:188px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:30px 20px;text-align:center}
      .pmx-tripline-item+.pmx-tripline-item{border-left:1px solid rgba(255,255,255,.2)}
      .pmx-tripline-item b{font-size:17px;letter-spacing:.08em;color:#a9c2eb;font-weight:800}
      .pmx-tripline-item strong{margin-top:14px;font-size:clamp(30px,3.2vw,42px);font-weight:880}

      /* 계산기 */
      #calculator.ig8-calculator{display:flex;align-items:center;padding:132px 0;background:#f4f6f9;color:#10182b;position:relative;overflow:hidden}
      #calculator.ig8-calculator>.container{width:min(1120px,calc(100% - 40px));margin:0 auto}
      #calculator.ig8-calculator .section-head{margin-bottom:56px;text-align:center}
      #calculator.ig8-calculator .section-head h2{max-width:940px;margin:0 auto;font-size:clamp(50px,6.2vw,82px)!important;line-height:1.05!important;letter-spacing:-.06em!important;font-weight:650!important;word-break:keep-all}
      #calculator.ig8-calculator .section-head h2 strong{font-weight:950!important}
      #calculator.ig8-calculator .section-head p,#calculator.ig8-calculator .section-kicker,#calculator.ig8-calculator .calculator-note{display:none!important}
      #calculator.ig8-calculator .exchange-bar{display:flex;align-items:center;justify-content:space-between;gap:20px;margin:0 auto 22px;padding:22px 28px;border:1px solid #dfe5ef;border-radius:22px;background:#fff}
      #calculator.ig8-calculator .exchange-label{font-size:19px;font-weight:650;color:#637393}
      #calculator.ig8-calculator #exchangeRateText{font-size:clamp(28px,3.5vw,40px);line-height:1;font-weight:860;letter-spacing:-.045em;color:#10182b}
      #calculator.ig8-calculator .exchange-meta{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
      #calculator.ig8-calculator .calculator-card{margin:0 auto;padding:42px;border:1px solid #dfe5ef;border-radius:28px;background:#fff;box-shadow:none}
      #calculator.ig8-calculator .calculator-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:24px}
      #calculator.ig8-calculator .calculator-head strong{font-size:clamp(23px,2.7vw,31px);font-weight:650;color:#10182b}
      #calculator.ig8-calculator #rangeValue{font-size:clamp(48px,6.2vw,74px);line-height:.92;font-weight:930;letter-spacing:-.06em;color:#10182b}
      #calculator.ig8-calculator .price-range{margin:8px 0 30px;height:10px}
      #calculator.ig8-calculator .calculator-mode{display:grid;grid-template-columns:1fr 1fr;width:min(560px,100%);margin:0 auto 32px;padding:5px;border:1px solid #dfe5ef;border-radius:16px;background:#f4f6f9}
      #calculator.ig8-calculator .mode-btn{min-height:54px;border:0;border-radius:12px;background:transparent;color:#637393;font-size:19px;font-weight:700;box-shadow:none}
      #calculator.ig8-calculator .mode-btn.active{background:#10182b;color:#fff}
      #calculator.ig8-calculator .result-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:0}
      #calculator.ig8-calculator .result-box{min-height:164px;padding:26px 20px;border:1px solid #dfe5ef;border-radius:20px;background:#fff;display:flex;flex-direction:column;justify-content:center;text-align:center}
      #calculator.ig8-calculator .result-box:first-child{display:none!important}
      #calculator.ig8-calculator .result-box span{font-size:clamp(19px,2.1vw,24px);font-weight:620;color:#637393}
      #calculator.ig8-calculator .result-box strong{display:block;margin-top:12px;font-size:clamp(40px,5vw,56px);line-height:.95;font-weight:930;letter-spacing:-.05em;color:#10182b;white-space:nowrap}
      #calculator.ig8-calculator .result-box em,#calculator.ig8-calculator .result-box small{display:none!important}
      #calculator.ig8-calculator .result-box.highlight{grid-column:1/-1;width:100%;min-height:176px;background:#1f4f96;border-color:#1f4f96;color:#fff}
      #calculator.ig8-calculator .result-box.highlight span,#calculator.ig8-calculator .result-box.highlight strong{color:#fff}
      #calculator .pmx-calc-cta{display:flex;align-items:center;justify-content:center;width:min(560px,100%);min-height:70px;margin:26px auto 0;padding:0 28px;border:0;border-radius:16px;background:#10182b;color:#fff;font-size:clamp(21px,2.4vw,28px);font-weight:800;letter-spacing:-.035em;cursor:pointer}

      /* 최저가 */
      #price-match{min-height:68svh;display:flex;align-items:center;padding:108px 0;background:#fff;color:#10182b;border-top:1px solid #e2e7ee;border-bottom:1px solid #e2e7ee}
      .pmx-price-match-line{display:grid;grid-template-columns:1fr auto;align-items:center;gap:38px;max-width:1000px;margin:0 auto;text-align:left}
      .pmx-price-match-line h2{margin:0;font-size:clamp(44px,5.4vw,68px);line-height:1.1;letter-spacing:-.055em;font-weight:720;word-break:keep-all}
      .pmx-price-match-line h2 strong{font-weight:950;color:#245fc4}
      .pmx-price-match-number{font-size:clamp(78px,9.5vw,118px);line-height:.86;font-weight:950;letter-spacing:-.075em;color:#10182b;white-space:nowrap}
      .pmx-price-match-copy{max-width:1000px;margin:28px auto 0;color:#62708a;font-size:clamp(22px,2.4vw,29px);font-weight:650;text-align:left;word-break:keep-all}

      #plans{padding-top:140px!important;padding-bottom:160px!important}
      #plans .membership-section-head .section-kicker{display:none!important}
      #plans .membership-section-head h2{font-size:clamp(50px,6.2vw,82px)!important;line-height:1.05!important;letter-spacing:-.06em!important;font-weight:860!important}
      #plans .plan-fit{margin:-8px 0 22px;padding:0 2px;font-size:clamp(19px,2vw,22px);line-height:1.35;font-weight:720;letter-spacing:-.025em;word-break:keep-all}
      #plans .recommended .plan-fit{color:rgba(255,255,255,.86)}
      #plans .plan-card:not(.recommended) .plan-fit{color:#53617a}

      @media(max-width:780px){
        .pmx-inner{width:min(100% - 24px,680px)}
        .pmx-title{font-size:clamp(40px,10.8vw,52px);line-height:1.07}.pmx-label{font-size:18px;margin-bottom:18px}.pmx-lead{font-size:22px;margin-top:26px}
        #travel-desire,#subscribe-why,#subscribe-start,#subscribe-monthly,#subscribe-seven,#subscribe-use,#subscribe-result,#real-booking-case,#trust-proof,#hotel-benefit,#calculator.ig8-calculator{min-height:100svh}
        #subscribe-why,#subscribe-start,#subscribe-monthly,#subscribe-seven,#subscribe-use,#subscribe-result,#real-booking-case,#trust-proof,#hotel-benefit{padding:112px 0}
        .pmx-cruise-visual{min-height:100svh}.pmx-cruise-copy{width:min(100% - 24px,680px);padding-bottom:82px}.pmx-cruise-visual img{object-position:center 52%}
        .pmx-bridge{min-height:62svh;padding:86px 0}.pmx-bridge-copy{font-size:clamp(35px,9.4vw,46px)}
        .pmx-why-line{font-size:31px;margin-top:48px;padding:34px 0}
        .pmx-big-pair,.pmx-use-split{grid-template-columns:1fr;gap:12px;margin-top:52px}.pmx-big-value,.pmx-use-part{padding:30px 12px}.pmx-big-value strong{font-size:66px}.pmx-big-arrow,.pmx-use-plus{transform:rotate(90deg);font-size:31px}
        .pmx-ledger{margin-top:52px}.pmx-ledger-row{grid-template-columns:1fr;gap:10px;text-align:center;padding:27px 4px}.pmx-ledger-row span{font-size:21px}.pmx-ledger-row strong{font-size:46px}.pmx-seven-paid{text-align:center;font-size:21px}.pmx-seven-paid strong{float:none;display:block;margin-top:10px;font-size:44px}
        .pmx-use-price{font-size:82px;margin-top:50px}.pmx-use-part strong{font-size:54px}.pmx-use-note{font-size:22px;margin-top:34px}
        .pmx-money-story{margin-top:52px}.pmx-money-row{grid-template-columns:1fr;gap:12px;text-align:center;padding:30px 4px}.pmx-money-row strong{text-align:center;font-size:50px}.pmx-money-row.point strong{font-size:64px}.pmx-cash-total{margin-top:46px;padding-top:36px}.pmx-cash-total strong{font-size:82px}.pmx-save-line{font-size:31px}
        .pmx-case-route{font-size:20px}.pmx-case-features{grid-template-columns:1fr;margin-top:44px}.pmx-case-features span{min-height:86px;padding:18px 10px;font-size:21px}.pmx-case-features span+span{border-left:0;border-top:1px solid #dce2ea}.pmx-case-prices{grid-template-columns:1fr;margin-top:44px}.pmx-case-price{padding:22px 8px;border-top:1px solid #dce2ea}.pmx-case-price:first-child{border-top:0}.pmx-case-price strong{font-size:50px}
        .pmx-trust-grid{grid-template-columns:1fr;margin-top:48px}.pmx-trust-grid article{min-height:124px}.pmx-trust-grid article+article{border-left:0;border-top:1px solid #dfe5ef}.pmx-trust-grid strong{font-size:50px}.pmx-trust-grid span{font-size:22px}.pmx-trust-grid em{font-size:17px}
        .pmx-tripline{grid-template-columns:1fr;margin-top:46px}.pmx-tripline-item{min-height:110px;padding:22px 8px}.pmx-tripline-item+.pmx-tripline-item{border-left:0;border-top:1px solid rgba(255,255,255,.2)}.pmx-tripline-item strong{font-size:31px}
        #calculator.ig8-calculator{padding:112px 0}#calculator.ig8-calculator>.container{width:min(calc(100% - 20px),680px)!important}#calculator.ig8-calculator .section-head{margin-bottom:36px}#calculator.ig8-calculator .section-head h2{font-size:clamp(40px,10.8vw,52px)!important}#calculator.ig8-calculator .exchange-bar{padding:18px;border-radius:18px;align-items:flex-end}#calculator.ig8-calculator .exchange-label{font-size:16px}#calculator.ig8-calculator #exchangeRateText{font-size:26px}#calculator.ig8-calculator .calculator-card{padding:22px 14px;border-radius:20px}#calculator.ig8-calculator .calculator-head strong{font-size:19px}#calculator.ig8-calculator #rangeValue{font-size:43px}#calculator.ig8-calculator .calculator-mode{width:100%;margin-bottom:20px}#calculator.ig8-calculator .mode-btn{font-size:16px;min-height:48px}#calculator.ig8-calculator .result-grid{gap:9px}#calculator.ig8-calculator .result-box{min-height:124px;padding:18px 8px;border-radius:18px}#calculator.ig8-calculator .result-box span{font-size:16px}#calculator.ig8-calculator .result-box strong{font-size:clamp(29px,8.8vw,38px)}#calculator.ig8-calculator .result-box.highlight{min-height:142px;padding:22px 12px}#calculator.ig8-calculator .result-box.highlight span{font-size:19px}#calculator.ig8-calculator .result-box.highlight strong{font-size:clamp(43px,12vw,56px)}#calculator .pmx-calc-cta{min-height:60px;font-size:21px}
        #price-match{min-height:62svh;padding:84px 0}.pmx-price-match-line{grid-template-columns:1fr;text-align:center;gap:24px}.pmx-price-match-line h2{font-size:39px}.pmx-price-match-number{font-size:80px}.pmx-price-match-copy{text-align:center;font-size:20px}
        #plans{padding-top:112px!important;padding-bottom:130px!important}#plans .membership-section-head h2{font-size:clamp(40px,10.8vw,52px)!important}#plans .plan-fit{font-size:18px!important}
      }
      @media(prefers-reduced-motion:reduce){.pmx-enter{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function make(tag,id,html,cls){const el=document.createElement(tag);if(id)el.id=id;if(cls)el.className=cls;el.innerHTML=html;return el}

  function animateCounts(root){
    root.querySelectorAll('[data-count]').forEach((el)=>{
      if(el.dataset.counted==='1')return;
      el.dataset.counted='1';
      const target=Number(el.dataset.count||0);
      const prefix=el.dataset.prefix||'';
      const suffix=el.dataset.suffix||'';
      const decimals=Number(el.dataset.decimals||0);
      const start=performance.now();
      const duration=1250;
      function tick(now){
        const p=Math.min(1,(now-start)/duration);
        const eased=1-Math.pow(1-p,3);
        const value=target*eased;
        el.textContent=prefix+value.toLocaleString('en-US',{minimumFractionDigits:decimals,maximumFractionDigits:decimals})+suffix;
        if(p<1)requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function observe(nodes){
    const list=nodes.filter(Boolean);
    list.forEach((node)=>node.querySelectorAll('.pmx-enter').forEach((el,index)=>el.style.setProperty('--pmx-delay',`${Math.min(index,9)*120}ms`)));
    if(!('IntersectionObserver' in window)){
      list.forEach((node)=>{node.classList.add('pmx-visible');animateCounts(node)});
      return;
    }
    const io=new IntersectionObserver((entries)=>entries.forEach((entry)=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('pmx-visible');
      animateCounts(entry.target);
      io.unobserve(entry.target);
    }),{threshold:.22,rootMargin:'0px 0px -10% 0px'});
    list.forEach((node)=>io.observe(node));
  }

  function removeOldInjected(){
    ['why-save','why-direct','how-it-works','travel-subscribe','earn-points','membership-summary','ig8-problem-a','ig8-problem-b','ig8-promise','ig8-rule','ig8-cruise','ig8-membership-spend','ig8-total','ig8-saving','ig8-freedom','ig8-final','join-faq','pmx-bottom-cta','trust-proof','travel-desire','quick-result','real-booking-case','subscribe-bridge','subscribe-value','subscribe-why','subscribe-start','subscribe-monthly','subscribe-seven','subscribe-use','subscribe-result','subscribe-booking','bridge-proof','bridge-seven','bridge-booking','bridge-result','bridge-calc','bridge-actual','ig8-start','ig8-monthly','ig8-seven','ig8-payment','ig8-routes','signup-steps'].forEach((id)=>document.getElementById(id)?.remove());
  }

  function rebuildNav(){
    const nav=document.querySelector('.hero-nav-track');if(!nav)return;
    const set=[
      ['#subscribe-start','01','구독 시작'],
      ['#subscribe-seven','02','7개월 적립'],
      ['#subscribe-use','03','포인트 사용'],
      ['#subscribe-result','04','실제 지출'],
      ['#real-booking-case','05','실제 예약'],
      ['#calculator','06','직접 계산'],
      ['#plans','07','플랜 선택']
    ].map(([href,num,label])=>`<a href="${href}"><strong>${num}</strong><span>${label}</span></a>`).join('');
    nav.innerHTML=set+set;
  }

  function buildBridge(id,after,tone,html){
    const el=make('section',id,`<div class="pmx-inner"><div class="pmx-bridge-copy pmx-enter">${html}</div></div>`,`pmx-section pmx-bridge ${tone}`);
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildTravel(review){
    const el=make('section','travel-desire',`<div class="pmx-cruise-visual"><img src="https://images.unsplash.com/photo-1688269910705-2d2a9d943a95?auto=format&fit=crop&q=85&w=1800" alt="크루즈 선상 수영장과 바다 풍경" loading="lazy"><div class="pmx-cruise-copy"><span class="pmx-label pmx-enter">크루즈 여행</span><h2 class="pmx-title pmx-enter">한 번에 큰돈 내기 전에<br><strong>여행비부터 준비</strong></h2><p class="pmx-lead pmx-enter">구독료가 사라지는 게 아니라 예약에 쓸 포인트로 쌓입니다.</p></div></div>`,'pmx-section');
    review.insertAdjacentElement('afterend',el);return el;
  }

  function buildWhy(after){
    const el=make('section','subscribe-why',`<div class="pmx-inner"><span class="pmx-label pmx-enter">왜 구독하나요?</span><h2 class="pmx-title pmx-enter">매달 내는 돈이<br><strong>크루즈 예약 포인트</strong>가 됩니다</h2><div class="pmx-why-line pmx-enter">클래식 기준 <strong>$100 구독 → 200P 적립</strong></div></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildStart(after){
    const el=make('section','subscribe-start',`<div class="pmx-inner"><span class="pmx-label pmx-enter">STEP 1 · 첫 가입</span><h2 class="pmx-title pmx-enter">처음 <strong>$200</strong>으로 시작</h2><div class="pmx-big-pair"><div class="pmx-big-value pmx-enter"><span>첫 가입 결제</span><strong data-count="200" data-prefix="$">$200</strong></div><div class="pmx-big-arrow pmx-enter">→</div><div class="pmx-big-value pmx-enter"><span>바로 받는 포인트</span><strong data-count="350" data-suffix="P">350P</strong></div></div><p class="pmx-lead pmx-enter">첫 결제부터 예약에 쓸 포인트가 생깁니다.</p></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildMonthly(after){
    const el=make('section','subscribe-monthly',`<div class="pmx-inner"><span class="pmx-label pmx-enter">STEP 2 · 그 다음 매월</span><h2 class="pmx-title pmx-enter">매월 <strong>$100</strong> 구독</h2><div class="pmx-big-pair"><div class="pmx-big-value pmx-enter"><span>매월 구독료</span><strong data-count="100" data-prefix="$">$100</strong></div><div class="pmx-big-arrow pmx-enter">→</div><div class="pmx-big-value pmx-enter"><span>매월 적립</span><strong data-count="200" data-suffix="P">200P</strong></div></div><p class="pmx-lead pmx-enter">여행 날짜를 정하기 전부터 먼저 모을 수 있습니다.</p></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildSeven(after){
    const el=make('section','subscribe-seven',`<div class="pmx-inner"><span class="pmx-label pmx-enter">STEP 3 · 7개월 준비</span><h2 class="pmx-title pmx-enter">7개월 뒤<br><strong data-count="1750" data-suffix="P">1,750P</strong></h2><div class="pmx-ledger"><div class="pmx-ledger-row pmx-enter"><span>첫 가입에서 받은 포인트</span><strong>350P</strong></div><div class="pmx-ledger-row pmx-enter"><span>매월 200P × 7개월</span><strong>1,400P</strong></div><div class="pmx-ledger-row total pmx-enter"><span>예약에 쓸 포인트</span><strong data-count="1750" data-suffix="P">1,750P</strong></div></div><div class="pmx-seven-paid pmx-enter">7개월까지 내가 낸 구독료 <strong data-count="900" data-prefix="$">$900</strong></div></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildUse(after){
    const el=make('section','subscribe-use',`<div class="pmx-inner"><span class="pmx-label pmx-enter">STEP 4 · 예약할 때</span><h2 class="pmx-title pmx-enter"><strong>$3,500 크루즈</strong>를 예약한다면</h2><div class="pmx-use-price pmx-enter" data-count="3500" data-prefix="$">$3,500</div><div class="pmx-use-split"><div class="pmx-use-part pmx-enter"><span>앞에서 쌓은 포인트 사용</span><strong data-count="1750" data-suffix="P">1,750P</strong></div><div class="pmx-use-plus pmx-enter">+</div><div class="pmx-use-part pmx-enter"><span>나머지 카드 결제</span><strong data-count="1750" data-prefix="$">$1,750</strong></div></div><div class="pmx-use-note pmx-enter"><strong>1,750P를 실제 예약금액에 사용</strong>하고, 남은 금액만 카드로 결제합니다.</div></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildResult(after){
    const el=make('section','subscribe-result',`<div class="pmx-inner"><span class="pmx-label pmx-enter">그럼 현금으로 얼마 쓴 걸까요?</span><h2 class="pmx-title pmx-enter">포인트까지 포함해서<br><strong>처음부터 다시 계산</strong></h2><div class="pmx-money-story"><div class="pmx-money-row pmx-enter"><span>7개월 동안 실제로 낸 구독료</span><strong data-count="900" data-prefix="$">$900</strong></div><div class="pmx-money-row point pmx-enter"><span>그 $900으로 쌓여서 예약에 사용한 포인트</span><strong data-count="1750" data-suffix="P">1,750P</strong></div><div class="pmx-money-row pmx-enter"><span>크루즈 예약할 때 추가로 낸 카드 금액</span><strong data-count="1750" data-prefix="$">$1,750</strong></div></div><div class="pmx-cash-total pmx-enter"><span>현금으로 실제 나간 돈 · $900 + $1,750</span><strong data-count="2650" data-prefix="$">$2,650</strong></div><div class="pmx-save-line pmx-enter">$3,500 그대로 결제하는 것보다 <strong data-count="850" data-prefix="$" data-suffix=" 차이">$850 차이</strong></div></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildRealCase(after){
    const el=make('section','real-booking-case',`<div class="pmx-inner"><span class="pmx-label pmx-enter">실제 2인 예약</span><h2 class="pmx-title pmx-enter"><strong>7박 서부 지중해</strong></h2><p class="pmx-case-route pmx-enter">바르셀로나 출발 · MSC World Asia</p><div class="pmx-case-features"><span class="pmx-enter">2인 기준</span><span class="pmx-enter">프리미엄 음료 패키지 포함</span><span class="pmx-enter">디럭스 발코니 Fantastica</span></div><div class="pmx-case-prices"><div class="pmx-case-price pmx-enter"><span>2인 총 예약가</span><strong data-count="3887.35" data-prefix="$" data-decimals="2">$3,887.35</strong></div><div class="pmx-case-price pmx-enter"><span>리워드 사용</span><strong data-count="1805.84" data-suffix="P" data-decimals="2">1,805.84P</strong></div><div class="pmx-case-price main pmx-enter"><span>예약 시 카드 결제</span><strong data-count="2020.88" data-prefix="$" data-decimals="2">$2,020.88</strong></div></div></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildTrust(after){
    const el=make('section','trust-proof',`<div class="pmx-inner"><span class="pmx-label pmx-enter">INCRUISES</span><h2 class="pmx-title pmx-enter"><strong>2015년부터 운영 중</strong></h2><div class="pmx-trust-grid"><article class="pmx-enter"><strong>10년+</strong><span>운영 이력</span><em>2015년부터</em></article><article class="pmx-enter"><strong>350만+</strong><span>전 세계 이용자</span><em>글로벌 여행 플랫폼</em></article><article class="pmx-enter"><strong>CLIA</strong><span>공식 회원</span><em>#00027506</em></article></div></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function rebuildHotel(after){
    const hotel=document.getElementById('hotel-benefit');if(!hotel)return null;
    hotel.className='pmx-section';
    hotel.innerHTML=`<div class="pmx-inner"><span class="pmx-label pmx-enter">크루즈 외 혜택</span><h2 class="pmx-title pmx-enter">호텔 · 투어도<br><strong>같이 이용</strong></h2><div class="pmx-tripline"><div class="pmx-tripline-item pmx-enter"><b>STAY</b><strong>전세계 호텔</strong></div><div class="pmx-tripline-item pmx-enter"><b>EXPLORE</b><strong>현지 투어</strong></div><div class="pmx-tripline-item pmx-enter"><b>EXTEND</b><strong>출발 전후 숙박</strong></div></div></div>`;
    after.insertAdjacentElement('afterend',hotel);return hotel;
  }

  function prepareCalculator(after){
    const calc=document.getElementById('calculator');if(!calc)return null;
    calc.className='ig8-calculator pmx-section';
    const head=calc.querySelector('.section-head');if(head)head.innerHTML='<h2>이번엔 <strong>내 크루즈 가격</strong>으로 직접 계산</h2>';
    const label=calc.querySelector('.calculator-head strong');if(label)label.textContent='2인 크루즈 가격';
    const range=calc.querySelector('#cruisePrice');if(range){range.value='3500';range.dispatchEvent(new Event('input',{bubbles:true}))}
    calc.querySelector('.pmx-calc-cta')?.remove();
    const card=calc.querySelector('.calculator-card');
    if(card){const btn=document.createElement('button');btn.type='button';btn.className='pmx-calc-cta';btn.textContent='클래식 · 프리미엄 비교하기';btn.addEventListener('click',()=>document.getElementById('plans')?.scrollIntoView({behavior:'smooth',block:'start'}));card.appendChild(btn)}
    after.insertAdjacentElement('afterend',calc);return calc;
  }

  function rebuildPriceMatch(after){
    const pm=document.getElementById('price-match');if(!pm)return null;
    pm.className='pmx-section';
    pm.innerHTML=`<div class="pmx-inner"><div class="pmx-price-match-line pmx-enter"><h2>같은 조건이 다른 곳에서 더 싸다면<br><strong>최저가 보장</strong></h2><div class="pmx-price-match-number">$100+</div></div><p class="pmx-price-match-copy pmx-enter">동일 크루즈 · 일정 · 객실 기준 $100 이상 차이 시 가격 조정</p></div>`;
    after.insertAdjacentElement('afterend',pm);return pm;
  }

  function patchPlans(){
    const heading=document.querySelector('#plans .membership-section-head h2');if(heading)heading.innerHTML='이제 내 속도에 맞게<br><strong>클래식 · 프리미엄</strong>';
    [...document.querySelectorAll('#plans .plan-card')].forEach((card,index)=>{
      const name=card.querySelector('.plan-name')?.textContent?.trim()||'';
      const desired=/프리미엄/.test(name)||index===1?'더 빠르게 포인트를 모으고 싶다면':'1~2년에 한 번 크루즈를 계획한다면';
      let fit=card.querySelector('.plan-fit');
      if(!fit){fit=document.createElement('p');fit.className='plan-fit';const main=card.querySelector('.plan-main-line');if(main)main.insertAdjacentElement('afterend',fit);else card.prepend(fit)}
      if(fit.textContent!==desired)fit.textContent=desired;
    });
  }

  function watchPlans(){const wrap=document.getElementById('planCards');if(!wrap)return;const run=()=>requestAnimationFrame(patchPlans);new MutationObserver(run).observe(wrap,{childList:true,subtree:true});run();setTimeout(run,500);setTimeout(run,1500)}

  function init(){
    addStyles();removeOldInjected();rebuildNav();
    const review=document.querySelector('.review-flow-section');if(!review)return;

    const travel=buildTravel(review);
    const bridgeWhy=buildBridge('bridge-proof',travel,'light','여행비를 미리 준비하면<br><strong>무엇이 달라질까요?</strong>');
    const why=buildWhy(bridgeWhy);
    const start=buildStart(why);
    const monthly=buildMonthly(start);
    const bridgeSeven=buildBridge('bridge-seven',monthly,'dark','이걸 <strong>7개월 동안</strong><br>계속 모아보겠습니다.');
    const seven=buildSeven(bridgeSeven);
    const bridgeBooking=buildBridge('bridge-booking',seven,'blue','이제 쌓인 <strong>1,750P를</strong><br>실제 크루즈 예약에 씁니다.');
    const use=buildUse(bridgeBooking);
    const bridgeResult=buildBridge('bridge-result',use,'dark','포인트를 썼다면,<br><strong>현금으로 실제 나간 돈은 얼마일까요?</strong>');
    const result=buildResult(bridgeResult);
    const bridgeActual=buildBridge('bridge-actual',result,'light','계산 예시 말고<br><strong>실제 2인 예약도 확인해보세요.</strong>');
    const realCase=buildRealCase(bridgeActual);
    const trust=buildTrust(realCase);
    const hotel=rebuildHotel(trust);
    const bridgeCalc=buildBridge('bridge-calc',hotel||trust,'light','이제 <strong>내가 보고 있는 크루즈 가격</strong>으로<br>직접 계산해보세요.');
    const calc=prepareCalculator(bridgeCalc);
    const pm=rebuildPriceMatch(calc);
    const plans=document.getElementById('plans');if(plans&&pm)pm.insertAdjacentElement('afterend',plans);

    patchPlans();watchPlans();
    const floating=document.querySelector('.floating-cta');if(floating)floating.textContent='멤버십 플랜 보기';
    document.querySelectorAll('#hotel-benefit svg,footer svg,.pmx-section svg').forEach((svg)=>svg.remove());
    observe([travel,bridgeWhy,why,start,monthly,bridgeSeven,seven,bridgeBooking,use,bridgeResult,result,bridgeActual,realCase,trust,hotel,bridgeCalc,calc,pm]);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0),{once:true});else setTimeout(init,0);
})();