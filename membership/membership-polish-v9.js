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
      .pmx-label{display:block;margin:0 0 22px;color:#2b5da8;font-size:clamp(19px,1.9vw,23px);font-weight:850;letter-spacing:-.025em}
      .pmx-title{max-width:960px;margin:0 auto;font-size:clamp(48px,6vw,78px);line-height:1.06;letter-spacing:-.058em;font-weight:610;word-break:keep-all;text-wrap:balance}
      .pmx-title strong{font-weight:940}
      .pmx-lead{max-width:860px;margin:30px auto 0;font-size:clamp(25px,2.9vw,34px);line-height:1.42;letter-spacing:-.03em;font-weight:620;word-break:keep-all}

      .pmx-enter{opacity:0;transform:translateY(42px) scale(.985);filter:blur(7px);transition:opacity .78s cubic-bezier(.22,1,.36,1),transform .78s cubic-bezier(.22,1,.36,1),filter .78s cubic-bezier(.22,1,.36,1);transition-delay:var(--pmx-delay,0ms)}
      .pmx-visible .pmx-enter{opacity:1;transform:none;filter:none}

      #travel-desire,#real-booking-case,#subscribe-why,#subscribe-start,#subscribe-monthly,#subscribe-seven,#subscribe-use,#subscribe-result,#trust-proof,#hotel-benefit,#calculator.ig8-calculator{min-height:92vh}
      #travel-desire,#real-booking-case,#subscribe-why,#subscribe-start,#subscribe-monthly,#subscribe-seven,#subscribe-use,#subscribe-result,#trust-proof,#hotel-benefit{display:flex;align-items:center;padding:120px 0}

      /* 여행 욕구 */
      #travel-desire{padding:0;background:#0c1730;color:#fff}
      .pmx-cruise-visual{position:relative;width:100%;min-height:92vh;display:flex;align-items:flex-end;overflow:hidden}
      .pmx-cruise-visual img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 52%;display:block;transform:scale(1.04);transition:transform 1.7s cubic-bezier(.22,1,.36,1)}
      #travel-desire.pmx-visible .pmx-cruise-visual img{transform:scale(1)}
      .pmx-cruise-visual::after{content:'';position:absolute;inset:0;background:rgba(5,14,30,.48)}
      .pmx-cruise-copy{position:relative;z-index:2;width:min(1040px,calc(100% - 40px));margin:0 auto;padding:0 0 94px;text-align:left}
      #travel-desire .pmx-label{color:#fff}
      #travel-desire .pmx-title{max-width:900px;margin:0;color:#fff;text-align:left}
      #travel-desire .pmx-lead{max-width:830px;margin:28px 0 0;color:rgba(255,255,255,.88);text-align:left}

      /* 실제 예약 */
      #real-booking-case{background:#fff;color:#10182b}
      .pmx-case-route{margin:22px auto 0;color:#586780;font-size:clamp(22px,2.5vw,30px);font-weight:690;word-break:keep-all}
      .pmx-case-features{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:56px auto 0;border-top:1px solid #dce2ea;border-bottom:1px solid #dce2ea}
      .pmx-case-features span{min-height:128px;display:flex;align-items:center;justify-content:center;padding:26px 20px;font-size:clamp(22px,2.5vw,29px);line-height:1.3;font-weight:800;word-break:keep-all}
      .pmx-case-features span+span{border-left:1px solid #dce2ea}
      .pmx-case-prices{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:60px auto 0}
      .pmx-case-price{padding:16px}
      .pmx-case-price span{display:block;color:#64728b;font-size:clamp(20px,2.2vw,25px);font-weight:660}
      .pmx-case-price strong{display:block;margin-top:14px;font-size:clamp(44px,5.5vw,66px);line-height:.94;letter-spacing:-.055em;font-weight:940;white-space:nowrap}
      .pmx-case-price.main strong{color:#245fc4}

      /* 브릿지 */
      .pmx-bridge{min-height:58vh;display:flex;align-items:center;padding:90px 0}
      .pmx-bridge.light{background:#f4f6f9;color:#10182b}
      .pmx-bridge.dark{background:#0c1730;color:#fff}
      .pmx-bridge.blue{background:#1f4f96;color:#fff}
      .pmx-bridge-copy{max-width:940px;margin:0 auto;font-size:clamp(42px,5.4vw,68px);line-height:1.12;letter-spacing:-.052em;font-weight:650;word-break:keep-all;text-wrap:balance}
      .pmx-bridge-copy strong{font-weight:940}
      .pmx-bridge.dark .pmx-bridge-copy,.pmx-bridge.blue .pmx-bridge-copy{color:#fff}

      /* 왜 구독 */
      #subscribe-why{background:#f4f6f9;color:#10182b}
      .pmx-why-line{max-width:940px;margin:58px auto 0;padding:38px 0;border-top:1px solid #d8e0ea;border-bottom:1px solid #d8e0ea;font-size:clamp(32px,4.2vw,50px);font-weight:730;letter-spacing:-.04em;word-break:keep-all}
      .pmx-why-line strong{color:#245fc4;font-weight:940}

      /* 첫 가입 / 매월 */
      #subscribe-start{background:#fff;color:#10182b}
      #subscribe-monthly{background:#1f4f96;color:#fff}
      #subscribe-monthly .pmx-label{color:#dce8ff}
      #subscribe-monthly .pmx-title,#subscribe-monthly .pmx-lead{color:#fff}
      .pmx-big-pair{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:34px;max-width:960px;margin:62px auto 0}
      .pmx-big-value{padding:42px 24px;border-top:1px solid #dbe2eb;border-bottom:1px solid #dbe2eb}
      .pmx-big-value span{display:block;color:#64728b;font-size:clamp(22px,2.5vw,29px);font-weight:670}
      .pmx-big-value strong{display:block;margin-top:18px;font-size:clamp(68px,8.8vw,104px);line-height:.88;font-weight:940;letter-spacing:-.07em;white-space:nowrap}
      .pmx-big-arrow{font-size:54px;color:#7890b8;font-weight:700}
      #subscribe-monthly .pmx-big-value{border-color:rgba(255,255,255,.28)}
      #subscribe-monthly .pmx-big-value span{color:rgba(255,255,255,.8)}
      #subscribe-monthly .pmx-big-value strong,#subscribe-monthly .pmx-big-arrow{color:#fff}

      /* 7개월 */
      #subscribe-seven{background:#0c1730;color:#fff}
      #subscribe-seven .pmx-label{color:#a9c3ee}
      #subscribe-seven .pmx-title{color:#fff}
      .pmx-ledger{max-width:900px;margin:62px auto 0;text-align:left}
      .pmx-ledger-row{display:grid;grid-template-columns:1fr auto;align-items:end;gap:24px;padding:30px 4px;border-top:1px solid rgba(255,255,255,.2)}
      .pmx-ledger-row:first-child{border-top:0}
      .pmx-ledger-row span{font-size:clamp(23px,2.7vw,31px);font-weight:630;color:rgba(255,255,255,.8)}
      .pmx-ledger-row strong{font-size:clamp(40px,4.9vw,58px);font-weight:920;letter-spacing:-.045em}
      .pmx-ledger-row.total{margin-top:12px;padding-top:36px;border-top:3px solid #6f9be5}
      .pmx-ledger-row.total span,.pmx-ledger-row.total strong{color:#fff;font-weight:940}

      /* 예약할 때 */
      #subscribe-use{background:#f4f6f9;color:#10182b}
      .pmx-use-price{margin:58px auto 0;font-size:clamp(76px,10.5vw,132px);line-height:.88;font-weight:940;letter-spacing:-.075em;color:#10182b}
      .pmx-use-split{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:30px;max-width:960px;margin:54px auto 0}
      .pmx-use-part{padding:34px 18px;border-top:1px solid #dbe2eb;border-bottom:1px solid #dbe2eb}
      .pmx-use-part span{display:block;color:#64728b;font-size:clamp(21px,2.4vw,28px);font-weight:660}
      .pmx-use-part strong{display:block;margin-top:14px;font-size:clamp(50px,6.4vw,76px);line-height:.92;font-weight:940;letter-spacing:-.06em;white-space:nowrap}
      .pmx-use-plus{font-size:44px;color:#7890b8;font-weight:800}

      /* 실제 지출 */
      #subscribe-result{background:#1f4f96;color:#fff}
      #subscribe-result .pmx-label{color:#dce8ff}
      #subscribe-result .pmx-title{color:#fff}
      .pmx-result-equation{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:30px;max-width:960px;margin:62px auto 0}
      .pmx-result-part{padding:36px 20px;border-top:1px solid rgba(255,255,255,.28);border-bottom:1px solid rgba(255,255,255,.28)}
      .pmx-result-part span{display:block;color:rgba(255,255,255,.8);font-size:clamp(21px,2.4vw,28px);font-weight:660}
      .pmx-result-part strong{display:block;margin-top:14px;font-size:clamp(52px,6.6vw,78px);line-height:.92;font-weight:940;letter-spacing:-.06em;white-space:nowrap}
      .pmx-result-part em{display:block;margin-top:16px;color:#dbe8ff;font-style:normal;font-size:clamp(19px,2vw,23px);line-height:1.35;font-weight:720;word-break:keep-all}
      .pmx-result-plus{font-size:42px;color:#d7e5ff;font-weight:800}
      .pmx-point-proof{max-width:920px;margin:42px auto 0;padding:30px 20px;border:1px solid rgba(255,255,255,.25);font-size:clamp(25px,3vw,36px);line-height:1.35;font-weight:730;word-break:keep-all}
      .pmx-point-proof strong{font-weight:950;color:#fff}
      .pmx-result-total{max-width:920px;margin:42px auto 0;padding-top:38px;border-top:1px solid rgba(255,255,255,.25)}
      .pmx-result-total span{display:block;color:rgba(255,255,255,.86);font-size:clamp(24px,2.8vw,32px);font-weight:700}
      .pmx-result-total strong{display:block;margin-top:16px;font-size:clamp(80px,10.5vw,124px);line-height:.88;font-weight:950;letter-spacing:-.075em}
      .pmx-save-line{margin:30px auto 0;font-size:clamp(32px,4.2vw,50px);font-weight:870}

      /* 신뢰 */
      #trust-proof{background:#fff;color:#10182b;border-bottom:1px solid #e4e9f0}
      .pmx-trust-grid{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:58px auto 0;border-top:1px solid #dfe5ef;border-bottom:1px solid #dfe5ef}
      .pmx-trust-grid article{min-height:190px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px 18px}
      .pmx-trust-grid article+article{border-left:1px solid #dfe5ef}
      .pmx-trust-grid strong{font-size:clamp(52px,6.2vw,76px);line-height:.95;font-weight:940;letter-spacing:-.06em}
      .pmx-trust-grid span{margin-top:13px;font-size:clamp(21px,2.4vw,28px);font-weight:730;color:#33425f}
      .pmx-trust-grid em{margin-top:7px;font-style:normal;font-size:18px;color:#6e7d98;font-weight:520}

      /* 호텔/투어 */
      #hotel-benefit{background:#0c1730;color:#fff}
      #hotel-benefit .pmx-label{color:#a9c3ee}
      #hotel-benefit .pmx-title{color:#fff}
      .pmx-tripline{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:56px auto 0;border-top:1px solid rgba(255,255,255,.22);border-bottom:1px solid rgba(255,255,255,.22)}
      .pmx-tripline-item{min-height:174px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:28px 20px;text-align:center}
      .pmx-tripline-item+.pmx-tripline-item{border-left:1px solid rgba(255,255,255,.2)}
      .pmx-tripline-item b{font-size:17px;letter-spacing:.08em;color:#a9c2eb;font-weight:800}
      .pmx-tripline-item strong{margin-top:12px;font-size:clamp(29px,3.1vw,40px);font-weight:870}

      /* 계산기 */
      #calculator.ig8-calculator{display:flex;align-items:center;padding:120px 0;background:#f4f6f9;color:#10182b;position:relative;overflow:hidden}
      #calculator.ig8-calculator>.container{width:min(1120px,calc(100% - 40px));margin:0 auto}
      #calculator.ig8-calculator .section-head{margin-bottom:50px;text-align:center}
      #calculator.ig8-calculator .section-head h2{max-width:920px;margin:0 auto;font-size:clamp(48px,6vw,76px)!important;line-height:1.06!important;letter-spacing:-.058em!important;font-weight:650!important;word-break:keep-all}
      #calculator.ig8-calculator .section-head h2 strong{font-weight:940!important}
      #calculator.ig8-calculator .section-head p,#calculator.ig8-calculator .section-kicker,#calculator.ig8-calculator .calculator-note{display:none!important}
      #calculator.ig8-calculator .exchange-bar{display:flex;align-items:center;justify-content:space-between;gap:20px;margin:0 auto 20px;padding:22px 28px;border:1px solid #dfe5ef;border-radius:22px;background:#fff}
      #calculator.ig8-calculator .exchange-label{font-size:19px;font-weight:650;color:#637393}
      #calculator.ig8-calculator #exchangeRateText{font-size:clamp(28px,3.5vw,40px);line-height:1;font-weight:860;letter-spacing:-.045em;color:#10182b}
      #calculator.ig8-calculator .exchange-meta{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
      #calculator.ig8-calculator .calculator-card{margin:0 auto;padding:40px;border:1px solid #dfe5ef;border-radius:28px;background:#fff;box-shadow:none}
      #calculator.ig8-calculator .calculator-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:24px}
      #calculator.ig8-calculator .calculator-head strong{font-size:clamp(23px,2.7vw,31px);font-weight:650;color:#10182b}
      #calculator.ig8-calculator #rangeValue{font-size:clamp(48px,6.2vw,74px);line-height:.92;font-weight:930;letter-spacing:-.06em;color:#10182b}
      #calculator.ig8-calculator .price-range{margin:8px 0 30px;height:10px}
      #calculator.ig8-calculator .calculator-mode{display:grid;grid-template-columns:1fr 1fr;width:min(560px,100%);margin:0 auto 32px;padding:5px;border:1px solid #dfe5ef;border-radius:16px;background:#f4f6f9}
      #calculator.ig8-calculator .mode-btn{min-height:54px;border:0;border-radius:12px;background:transparent;color:#637393;font-size:19px;font-weight:700;box-shadow:none}
      #calculator.ig8-calculator .mode-btn.active{background:#10182b;color:#fff}
      #calculator.ig8-calculator .result-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:0}
      #calculator.ig8-calculator .result-box{min-height:160px;padding:26px 20px;border:1px solid #dfe5ef;border-radius:20px;background:#fff;display:flex;flex-direction:column;justify-content:center;text-align:center}
      #calculator.ig8-calculator .result-box:first-child{display:none!important}
      #calculator.ig8-calculator .result-box span{font-size:clamp(19px,2.1vw,24px);font-weight:620;color:#637393}
      #calculator.ig8-calculator .result-box strong{display:block;margin-top:12px;font-size:clamp(40px,5vw,56px);line-height:.95;font-weight:930;letter-spacing:-.05em;color:#10182b;white-space:nowrap}
      #calculator.ig8-calculator .result-box em,#calculator.ig8-calculator .result-box small{display:none!important}
      #calculator.ig8-calculator .result-box.highlight{grid-column:1/-1;width:100%;min-height:170px;background:#1f4f96;border-color:#1f4f96;color:#fff}
      #calculator.ig8-calculator .result-box.highlight span,#calculator.ig8-calculator .result-box.highlight strong{color:#fff}
      #calculator .pmx-calc-cta{display:flex;align-items:center;justify-content:center;width:min(560px,100%);min-height:68px;margin:24px auto 0;padding:0 28px;border:0;border-radius:16px;background:#10182b;color:#fff;font-size:clamp(21px,2.4vw,28px);font-weight:800;letter-spacing:-.035em;cursor:pointer}

      /* 최저가 */
      #price-match{min-height:62vh;display:flex;align-items:center;padding:100px 0;background:#fff;color:#10182b;border-top:1px solid #e2e7ee;border-bottom:1px solid #e2e7ee}
      .pmx-price-match-line{display:grid;grid-template-columns:1fr auto;align-items:center;gap:36px;max-width:980px;margin:0 auto;text-align:left}
      .pmx-price-match-line h2{margin:0;font-size:clamp(42px,5.2vw,64px);line-height:1.1;letter-spacing:-.052em;font-weight:720;word-break:keep-all}
      .pmx-price-match-line h2 strong{font-weight:940;color:#245fc4}
      .pmx-price-match-number{font-size:clamp(74px,9.2vw,112px);line-height:.88;font-weight:940;letter-spacing:-.07em;color:#10182b;white-space:nowrap}
      .pmx-price-match-copy{max-width:980px;margin:26px auto 0;color:#62708a;font-size:clamp(21px,2.4vw,28px);font-weight:650;text-align:left;word-break:keep-all}

      #plans{padding-top:125px!important;padding-bottom:140px!important}
      #plans .membership-section-head .section-kicker{display:none!important}
      #plans .membership-section-head h2{font-size:clamp(48px,6vw,76px)!important;line-height:1.06!important;letter-spacing:-.058em!important;font-weight:860!important}
      #plans .plan-fit{margin:-8px 0 22px;padding:0 2px;font-size:clamp(19px,2vw,22px);line-height:1.35;font-weight:720;letter-spacing:-.025em;word-break:keep-all}
      #plans .recommended .plan-fit{color:rgba(255,255,255,.86)}
      #plans .plan-card:not(.recommended) .plan-fit{color:#53617a}

      @media(max-width:780px){
        .pmx-inner{width:min(100% - 24px,680px)}
        .pmx-title{font-size:clamp(39px,10.4vw,50px);line-height:1.08}.pmx-label{font-size:18px;margin-bottom:17px}.pmx-lead{font-size:22px;margin-top:24px}
        #travel-desire,#real-booking-case,#subscribe-why,#subscribe-start,#subscribe-monthly,#subscribe-seven,#subscribe-use,#subscribe-result,#trust-proof,#hotel-benefit,#calculator.ig8-calculator{min-height:82svh}
        #real-booking-case,#subscribe-why,#subscribe-start,#subscribe-monthly,#subscribe-seven,#subscribe-use,#subscribe-result,#trust-proof,#hotel-benefit{padding:94px 0}
        .pmx-cruise-visual{min-height:82svh}.pmx-cruise-copy{width:min(100% - 24px,680px);padding-bottom:68px}.pmx-cruise-visual img{object-position:center 52%}
        .pmx-case-route{font-size:20px}.pmx-case-features{grid-template-columns:1fr;margin-top:38px}.pmx-case-features span{min-height:82px;padding:18px 10px;font-size:21px}.pmx-case-features span+span{border-left:0;border-top:1px solid #dce2ea}.pmx-case-prices{grid-template-columns:1fr;margin-top:38px}.pmx-case-price{padding:20px 8px;border-top:1px solid #dce2ea}.pmx-case-price:first-child{border-top:0}.pmx-case-price strong{font-size:49px}
        .pmx-bridge{min-height:48svh;padding:72px 0}.pmx-bridge-copy{font-size:clamp(34px,9vw,44px)}
        .pmx-why-line{font-size:30px;margin-top:42px;padding:30px 0}
        .pmx-big-pair,.pmx-use-split,.pmx-result-equation{grid-template-columns:1fr;gap:10px;margin-top:44px}.pmx-big-value,.pmx-use-part,.pmx-result-part{padding:28px 12px}.pmx-big-value strong{font-size:64px}.pmx-big-arrow,.pmx-use-plus,.pmx-result-plus{transform:rotate(90deg);font-size:30px}
        .pmx-ledger{margin-top:44px}.pmx-ledger-row{grid-template-columns:1fr;gap:9px;text-align:center;padding:25px 4px}.pmx-ledger-row span{font-size:21px}.pmx-ledger-row strong{font-size:44px}
        .pmx-use-price{font-size:78px;margin-top:44px}.pmx-use-part strong{font-size:52px}
        .pmx-result-part strong{font-size:54px}.pmx-result-part em{font-size:18px}.pmx-point-proof{margin-top:34px;padding:24px 12px;font-size:23px}.pmx-result-total{margin-top:38px;padding-top:32px}.pmx-result-total strong{font-size:78px}.pmx-save-line{font-size:30px}
        .pmx-trust-grid{grid-template-columns:1fr;margin-top:42px}.pmx-trust-grid article{min-height:118px}.pmx-trust-grid article+article{border-left:0;border-top:1px solid #dfe5ef}.pmx-trust-grid strong{font-size:49px}.pmx-trust-grid span{font-size:22px}.pmx-trust-grid em{font-size:17px}
        .pmx-tripline{grid-template-columns:1fr;margin-top:40px}.pmx-tripline-item{min-height:104px;padding:21px 8px}.pmx-tripline-item+.pmx-tripline-item{border-left:0;border-top:1px solid rgba(255,255,255,.2)}.pmx-tripline-item strong{font-size:30px}
        #calculator.ig8-calculator{padding:94px 0}#calculator.ig8-calculator>.container{width:min(calc(100% - 20px),680px)!important}#calculator.ig8-calculator .section-head{margin-bottom:34px}#calculator.ig8-calculator .section-head h2{font-size:clamp(39px,10.4vw,50px)!important}#calculator.ig8-calculator .exchange-bar{padding:17px 18px;border-radius:18px;align-items:flex-end}#calculator.ig8-calculator .exchange-label{font-size:16px}#calculator.ig8-calculator #exchangeRateText{font-size:26px}#calculator.ig8-calculator .calculator-card{padding:22px 14px;border-radius:20px}#calculator.ig8-calculator .calculator-head strong{font-size:19px}#calculator.ig8-calculator #rangeValue{font-size:43px}#calculator.ig8-calculator .calculator-mode{width:100%;margin-bottom:20px}#calculator.ig8-calculator .mode-btn{font-size:16px;min-height:48px}#calculator.ig8-calculator .result-grid{gap:9px}#calculator.ig8-calculator .result-box{min-height:122px;padding:18px 8px;border-radius:18px}#calculator.ig8-calculator .result-box span{font-size:16px}#calculator.ig8-calculator .result-box strong{font-size:clamp(29px,8.8vw,38px)}#calculator.ig8-calculator .result-box.highlight{min-height:140px;padding:22px 12px}#calculator.ig8-calculator .result-box.highlight span{font-size:19px}#calculator.ig8-calculator .result-box.highlight strong{font-size:clamp(43px,12vw,56px)}#calculator .pmx-calc-cta{min-height:60px;font-size:21px}
        #price-match{min-height:52svh;padding:76px 0}.pmx-price-match-line{grid-template-columns:1fr;text-align:center;gap:22px}.pmx-price-match-line h2{font-size:38px}.pmx-price-match-number{font-size:78px}.pmx-price-match-copy{text-align:center;font-size:20px}
        #plans{padding-top:94px!important;padding-bottom:115px!important}#plans .membership-section-head h2{font-size:clamp(39px,10.4vw,50px)!important}#plans .plan-fit{font-size:18px!important}
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
      const duration=950;
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
    list.forEach((node)=>node.querySelectorAll('.pmx-enter').forEach((el,index)=>el.style.setProperty('--pmx-delay',`${Math.min(index,7)*95}ms`)));
    if(!('IntersectionObserver' in window)){
      list.forEach((node)=>{node.classList.add('pmx-visible');animateCounts(node)});
      return;
    }
    const io=new IntersectionObserver((entries)=>entries.forEach((entry)=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('pmx-visible');
      animateCounts(entry.target);
      io.unobserve(entry.target);
    }),{threshold:.18,rootMargin:'0px 0px -8% 0px'});
    list.forEach((node)=>io.observe(node));
  }

  function removeOldInjected(){
    ['why-save','why-direct','how-it-works','travel-subscribe','earn-points','membership-summary','ig8-problem-a','ig8-problem-b','ig8-promise','ig8-rule','ig8-cruise','ig8-membership-spend','ig8-total','ig8-saving','ig8-freedom','ig8-final','join-faq','pmx-bottom-cta','trust-proof','travel-desire','quick-result','real-booking-case','subscribe-bridge','subscribe-value','subscribe-why','subscribe-start','subscribe-monthly','subscribe-seven','subscribe-use','subscribe-result','subscribe-booking','bridge-proof','bridge-seven','bridge-booking','bridge-result','bridge-calc','ig8-start','ig8-monthly','ig8-seven','ig8-payment','ig8-routes','signup-steps'].forEach((id)=>document.getElementById(id)?.remove());
  }

  function rebuildNav(){
    const nav=document.querySelector('.hero-nav-track');if(!nav)return;
    const set=[
      ['#real-booking-case','01','실제 예약'],
      ['#subscribe-start','02','포인트 적립'],
      ['#subscribe-seven','03','7개월 예시'],
      ['#subscribe-result','04','실제 지출'],
      ['#calculator','05','직접 계산'],
      ['#plans','06','플랜 선택']
    ].map(([href,num,label])=>`<a href="${href}"><strong>${num}</strong><span>${label}</span></a>`).join('');
    nav.innerHTML=set+set;
  }

  function buildBridge(id,after,tone,html){
    const el=make('section',id,`<div class="pmx-inner"><div class="pmx-bridge-copy pmx-enter">${html}</div></div>`,`pmx-section pmx-bridge ${tone}`);
    after.insertAdjacentElement('afterend',el);
    return el;
  }

  function buildTravel(review){
    const el=make('section','travel-desire',`<div class="pmx-cruise-visual"><img src="https://images.unsplash.com/photo-1688269910705-2d2a9d943a95?auto=format&fit=crop&q=85&w=1800" alt="크루즈 선상 수영장과 바다 풍경" loading="lazy"><div class="pmx-cruise-copy"><span class="pmx-label pmx-enter">크루즈 여행</span><h2 class="pmx-title pmx-enter">일주일을 바다 위에서<br><strong>발코니 객실로</strong></h2><p class="pmx-lead pmx-enter">후기에서 본 여행, 실제 예약 금액부터 보겠습니다.</p></div></div>`,'pmx-section');
    review.insertAdjacentElement('afterend',el);return el;
  }

  function buildRealCase(after){
    const el=make('section','real-booking-case',`<div class="pmx-inner"><span class="pmx-label pmx-enter">실제 2인 예약</span><h2 class="pmx-title pmx-enter"><strong>7박 서부 지중해</strong></h2><p class="pmx-case-route pmx-enter">바르셀로나 출발 · MSC World Asia</p><div class="pmx-case-features"><span class="pmx-enter">2인 기준</span><span class="pmx-enter">프리미엄 음료 패키지 포함</span><span class="pmx-enter">디럭스 발코니 Fantastica</span></div><div class="pmx-case-prices"><div class="pmx-case-price pmx-enter"><span>2인 총 예약가</span><strong>$3,887.35</strong></div><div class="pmx-case-price pmx-enter"><span>리워드 사용</span><strong>1,805.84P</strong></div><div class="pmx-case-price main pmx-enter"><span>예약 시 결제금액</span><strong>$2,020.88</strong></div></div></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildWhy(after){
    const el=make('section','subscribe-why',`<div class="pmx-inner"><span class="pmx-label pmx-enter">왜 구독하나요?</span><h2 class="pmx-title pmx-enter">여행 전에<br><strong>포인트를 먼저 쌓아두는 방식</strong></h2><div class="pmx-why-line pmx-enter">매달 구독하면 <strong>낸 금액보다 더 많은 포인트</strong>가 쌓입니다</div></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildStart(after){
    const el=make('section','subscribe-start',`<div class="pmx-inner"><span class="pmx-label pmx-enter">STEP 1 · 첫 가입</span><h2 class="pmx-title pmx-enter">처음 <strong>$200</strong>으로 시작</h2><div class="pmx-big-pair"><div class="pmx-big-value pmx-enter"><span>내가 내는 금액</span><strong data-count="200" data-prefix="$">$200</strong></div><div class="pmx-big-arrow pmx-enter">→</div><div class="pmx-big-value pmx-enter"><span>바로 받는 포인트</span><strong data-count="350" data-suffix="P">350P</strong></div></div><p class="pmx-lead pmx-enter">$200을 내고 끝나는 게 아니라, 예약에 쓸 350P가 바로 생깁니다.</p></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildMonthly(after){
    const el=make('section','subscribe-monthly',`<div class="pmx-inner"><span class="pmx-label pmx-enter">STEP 2 · 그 다음 매월</span><h2 class="pmx-title pmx-enter">매월 <strong>$100</strong> 구독</h2><div class="pmx-big-pair"><div class="pmx-big-value pmx-enter"><span>매월 구독료</span><strong data-count="100" data-prefix="$">$100</strong></div><div class="pmx-big-arrow pmx-enter">→</div><div class="pmx-big-value pmx-enter"><span>매월 적립</span><strong data-count="200" data-suffix="P">200P</strong></div></div><p class="pmx-lead pmx-enter">여행 날짜를 정하기 전부터 먼저 쌓아둘 수 있습니다.</p></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildSeven(after){
    const el=make('section','subscribe-seven',`<div class="pmx-inner"><span class="pmx-label pmx-enter">STEP 3 · 7개월 준비</span><h2 class="pmx-title pmx-enter">7개월 뒤<br><strong data-count="1750" data-suffix="P">1,750P</strong></h2><div class="pmx-ledger"><div class="pmx-ledger-row pmx-enter"><span>첫 가입에서 받은 포인트</span><strong>350P</strong></div><div class="pmx-ledger-row pmx-enter"><span>매월 200P × 7개월</span><strong>1,400P</strong></div><div class="pmx-ledger-row total pmx-enter"><span>예약에 쓸 수 있는 포인트</span><strong data-count="1750" data-suffix="P">1,750P</strong></div></div></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildUse(after){
    const el=make('section','subscribe-use',`<div class="pmx-inner"><span class="pmx-label pmx-enter">STEP 4 · 예약할 때</span><h2 class="pmx-title pmx-enter"><strong>$3,500 크루즈</strong>를 예약한다고 하면</h2><div class="pmx-use-price pmx-enter" data-count="3500" data-prefix="$">$3,500</div><div class="pmx-use-split"><div class="pmx-use-part pmx-enter"><span>앞에서 쌓은 포인트</span><strong data-count="1750" data-suffix="P">1,750P</strong></div><div class="pmx-use-plus pmx-enter">+</div><div class="pmx-use-part pmx-enter"><span>나머지 카드 결제</span><strong data-count="1750" data-prefix="$">$1,750</strong></div></div><p class="pmx-lead pmx-enter">쌓아둔 1,750P를 실제 예약금액에 사용합니다.</p></div>`,'pmx-section');
    after.insertAdjacentElement('afterend',el);return el;
  }

  function buildResult(after){
    const el=make('section','subscribe-result',`<div class="pmx-inner"><span class="pmx-label pmx-enter">그래서 실제로 얼마 쓰나요?</span><h2 class="pmx-title pmx-enter">구독료까지 전부 합친<br><strong>현금 지출 $2,650</strong></h2><div class="pmx-result-equation"><div class="pmx-result-part pmx-enter"><span>7개월까지 낸 구독료</span><strong data-count="900" data-prefix="$">$900</strong><em>이 구독료로 총 1,750P 적립</em></div><div class="pmx-result-plus pmx-enter">+</div><div class="pmx-result-part pmx-enter"><span>예약할 때 카드 결제</span><strong data-count="1750" data-prefix="$">$1,750</strong><em>예약에는 1,750P도 함께 사용</em></div></div><div class="pmx-point-proof pmx-enter"><strong>1,750P는 빠지는 게 아니라</strong><br>앞에서 쌓아서 크루즈 예약에 실제로 사용합니다.</div><div class="pmx-result-total pmx-enter"><span>내가 실제로 낸 돈</span><strong data-count="2650" data-prefix="$">$2,650</strong></div><div class="pmx-save-line pmx-enter">$3,500 그대로 결제하는 것보다 <strong data-count="850" data-prefix="$" data-suffix=" 차이">$850 차이</strong></div></div>`,'pmx-section');
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
    const realCase=buildRealCase(travel);
    const bridgeProof=buildBridge('bridge-proof',realCase,'dark','그런데 <strong>$3,887.35짜리 예약에서</strong><br>왜 카드 결제는 $2,020.88이었을까요?');
    const why=buildWhy(bridgeProof);
    const start=buildStart(why);
    const monthly=buildMonthly(start);
    const bridgeSeven=buildBridge('bridge-seven',monthly,'light','이걸 <strong>7개월 동안 쌓으면</strong><br>포인트가 얼마나 될까요?');
    const seven=buildSeven(bridgeSeven);
    const bridgeBooking=buildBridge('bridge-booking',seven,'blue','이제 쌓인 <strong>1,750P를</strong><br>크루즈 예약에 씁니다.');
    const use=buildUse(bridgeBooking);
    const bridgeResult=buildBridge('bridge-result',use,'dark','포인트까지 썼다면,<br><strong>내 통장에서 실제로 나간 돈은?</strong>');
    const result=buildResult(bridgeResult);
    const trust=buildTrust(result);
    const hotel=rebuildHotel(trust);
    const bridgeCalc=buildBridge('bridge-calc',hotel||trust,'light','이제 예시 말고<br><strong>내가 보고 있는 크루즈 가격으로</strong> 계산해보세요.');
    const calc=prepareCalculator(bridgeCalc);
    const pm=rebuildPriceMatch(calc);
    const plans=document.getElementById('plans');if(plans&&pm)pm.insertAdjacentElement('afterend',plans);

    patchPlans();watchPlans();
    const floating=document.querySelector('.floating-cta');if(floating)floating.textContent='멤버십 플랜 보기';
    document.querySelectorAll('#hotel-benefit svg,footer svg,.pmx-section svg').forEach((svg)=>svg.remove());
    observe([travel,realCase,bridgeProof,why,start,monthly,bridgeSeven,seven,bridgeBooking,use,bridgeResult,result,trust,hotel,bridgeCalc,calc,pm]);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0),{once:true});else setTimeout(init,0);
})();