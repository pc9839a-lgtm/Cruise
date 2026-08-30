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
      .pmx-label{display:block;margin:0 0 22px;color:#2b5da8;font-size:clamp(19px,2vw,24px);font-weight:850;letter-spacing:-.025em}
      .pmx-title{max-width:980px;margin:0 auto;font-size:clamp(48px,6vw,80px);line-height:1.06;letter-spacing:-.058em;font-weight:620;word-break:keep-all;text-wrap:balance}
      .pmx-title strong{font-weight:950}
      .pmx-lead{max-width:860px;margin:30px auto 0;font-size:clamp(24px,2.8vw,33px);line-height:1.42;letter-spacing:-.03em;font-weight:620;word-break:keep-all}
      .pmx-next{margin:72px auto 0;padding-top:28px;max-width:900px;border-top:1px solid rgba(16,24,43,.14);font-size:clamp(22px,2.5vw,29px);line-height:1.4;font-weight:720;letter-spacing:-.03em;word-break:keep-all}
      .pmx-next strong{font-weight:950}
      .pmx-next .arrow{display:block;margin-top:14px;font-size:34px;line-height:1;color:#7e8fac}

      .pmx-enter{opacity:0;transform:translateY(34px);transition:opacity .72s cubic-bezier(.22,1,.36,1),transform .72s cubic-bezier(.22,1,.36,1);transition-delay:var(--pmx-delay,0ms)}
      .pmx-visible .pmx-enter{opacity:1;transform:none}

      #travel-desire,#subscribe-why,#subscribe-start,#subscribe-monthly,#subscribe-seven,#subscribe-use,#subscribe-result,#real-booking-case,#trust-proof,#hotel-benefit,#calculator.ig8-calculator{min-height:max(760px,92svh)}
      #subscribe-why,#subscribe-start,#subscribe-monthly,#subscribe-seven,#subscribe-use,#subscribe-result,#real-booking-case,#trust-proof,#hotel-benefit{display:flex;align-items:center;padding:118px 0}

      /* 여행 */
      #travel-desire{padding:0;background:#0c1730;color:#fff}
      .pmx-cruise-visual{position:relative;width:100%;min-height:max(760px,92svh);display:flex;align-items:flex-end;overflow:hidden}
      .pmx-cruise-visual img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 52%;display:block;transform:scale(1.05);transition:transform 1.8s cubic-bezier(.22,1,.36,1)}
      #travel-desire.pmx-visible .pmx-cruise-visual img{transform:scale(1)}
      .pmx-cruise-visual::after{content:'';position:absolute;inset:0;background:rgba(5,14,30,.48)}
      .pmx-cruise-copy{position:relative;z-index:2;width:min(1040px,calc(100% - 40px));margin:0 auto;padding:0 0 92px;text-align:left}
      #travel-desire .pmx-label,#travel-desire .pmx-title,#travel-desire .pmx-lead{color:#fff;text-align:left;margin-left:0}
      #travel-desire .pmx-title{max-width:900px}
      #travel-desire .pmx-lead{max-width:820px;color:rgba(255,255,255,.88)}
      #travel-desire .pmx-next{margin-left:0;text-align:left;color:#fff;border-color:rgba(255,255,255,.24)}
      #travel-desire .pmx-next .arrow{color:#fff}

      /* 구독 설명 챕터 — 한 덩어리처럼 */
      #subscribe-why,#subscribe-start,#subscribe-monthly,#subscribe-seven{background:#fff;color:#10182b;border-top:1px solid #e8ebf0}
      #subscribe-why{background:#f7f8fa}
      #subscribe-monthly{background:#fbfbfc}
      #subscribe-seven{background:#f7f8fa}
      .pmx-story-step{display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;margin-bottom:24px;border:1px solid #cfd8e6;border-radius:50%;color:#245fc4;font-size:22px;font-weight:900}
      .pmx-big-pair{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:36px;max-width:960px;margin:62px auto 0}
      .pmx-big-value{padding:40px 22px;border-top:1px solid #dbe2eb;border-bottom:1px solid #dbe2eb}
      .pmx-big-value span{display:block;color:#64728b;font-size:clamp(22px,2.4vw,29px);font-weight:660}
      .pmx-big-value strong{display:block;margin-top:18px;font-size:clamp(68px,8.6vw,104px);line-height:.88;font-weight:950;letter-spacing:-.07em;white-space:nowrap}
      .pmx-big-arrow{font-size:54px;color:#7890b8;font-weight:760}
      .pmx-why-line{max-width:930px;margin:58px auto 0;padding:38px 0;border-top:1px solid #d8e0ea;border-bottom:1px solid #d8e0ea;font-size:clamp(32px,4.2vw,50px);line-height:1.3;font-weight:740;letter-spacing:-.04em;word-break:keep-all}
      .pmx-why-line strong{color:#245fc4;font-weight:950}
      .pmx-ledger{max-width:900px;margin:60px auto 0;text-align:left}
      .pmx-ledger-row{display:grid;grid-template-columns:1fr auto;align-items:end;gap:28px;padding:30px 6px;border-top:1px solid #dfe4eb}
      .pmx-ledger-row:first-child{border-top:0}
      .pmx-ledger-row span{font-size:clamp(23px,2.6vw,30px);font-weight:630;color:#617089}
      .pmx-ledger-row strong{font-size:clamp(40px,4.8vw,58px);font-weight:930;letter-spacing:-.045em;color:#10182b}
      .pmx-ledger-row.total{margin-top:12px;padding-top:36px;border-top:3px solid #245fc4}
      .pmx-ledger-row.total span,.pmx-ledger-row.total strong{color:#245fc4;font-weight:950}
      .pmx-seven-paid{max-width:900px;margin:34px auto 0;padding:28px 6px;border-top:1px solid #dfe4eb;font-size:clamp(23px,2.6vw,30px);font-weight:700;text-align:left;color:#617089}
      .pmx-seven-paid strong{float:right;color:#10182b;font-size:clamp(36px,4.3vw,50px);font-weight:950}

      /* 예약 챕터 — 같은 어두운 배경으로 이어짐 */
      #subscribe-use,#subscribe-result{background:#0c1730;color:#fff;border-top:1px solid rgba(255,255,255,.1)}
      #subscribe-use .pmx-label,#subscribe-result .pmx-label{color:#a9c3ee}
      #subscribe-use .pmx-title,#subscribe-result .pmx-title{color:#fff}
      #subscribe-use .pmx-next,#subscribe-result .pmx-next{color:#fff;border-color:rgba(255,255,255,.22)}
      #subscribe-use .pmx-next .arrow,#subscribe-result .pmx-next .arrow{color:#c7d7ef}
      .pmx-use-price{margin:58px auto 0;font-size:clamp(80px,10.5vw,136px);line-height:.86;font-weight:950;letter-spacing:-.08em;color:#fff}
      .pmx-use-split{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:32px;max-width:960px;margin:56px auto 0}
      .pmx-use-part{padding:36px 18px;border-top:1px solid rgba(255,255,255,.24);border-bottom:1px solid rgba(255,255,255,.24)}
      .pmx-use-part span{display:block;color:rgba(255,255,255,.76);font-size:clamp(21px,2.4vw,28px);font-weight:660}
      .pmx-use-part strong{display:block;margin-top:15px;font-size:clamp(52px,6.6vw,78px);line-height:.9;font-weight:950;letter-spacing:-.065em;white-space:nowrap;color:#fff}
      .pmx-use-plus{font-size:46px;color:#cbd9ee;font-weight:800}
      .pmx-use-note{max-width:880px;margin:38px auto 0;font-size:clamp(23px,2.7vw,31px);line-height:1.4;font-weight:700;color:rgba(255,255,255,.82);word-break:keep-all}
      .pmx-use-note strong{color:#fff;font-weight:950}
      .pmx-money-story{max-width:940px;margin:56px auto 0}
      .pmx-money-row{display:grid;grid-template-columns:1.25fr .75fr;align-items:center;gap:28px;padding:30px 8px;border-top:1px solid rgba(255,255,255,.2);text-align:left}
      .pmx-money-row:first-child{border-top:0}
      .pmx-money-row span{font-size:clamp(22px,2.5vw,30px);line-height:1.35;font-weight:680;color:rgba(255,255,255,.78);word-break:keep-all}
      .pmx-money-row strong{font-size:clamp(42px,5.2vw,64px);line-height:.95;font-weight:950;letter-spacing:-.055em;text-align:right;white-space:nowrap}
      .pmx-money-row.point{margin:12px 0;padding:36px 8px;border-top:2px solid rgba(255,255,255,.34);border-bottom:2px solid rgba(255,255,255,.34)}
      .pmx-money-row.point span{color:#fff;font-weight:820}
      .pmx-money-row.point strong{font-size:clamp(52px,6.5vw,78px)}
      .pmx-cash-total{max-width:940px;margin:48px auto 0;padding-top:38px;border-top:1px solid rgba(255,255,255,.24)}
      .pmx-cash-total span{display:block;font-size:clamp(24px,2.8vw,32px);font-weight:720;color:rgba(255,255,255,.84)}
      .pmx-cash-total strong{display:block;margin-top:16px;font-size:clamp(80px,10.2vw,124px);line-height:.86;font-weight:950;letter-spacing:-.08em}
      .pmx-save-line{margin:28px auto 0;font-size:clamp(31px,4vw,48px);font-weight:880}

      /* 실제 예약 */
      #real-booking-case{background:#fff;color:#10182b}
      .pmx-case-route{margin:22px auto 0;color:#586780;font-size:clamp(22px,2.4vw,29px);font-weight:690;word-break:keep-all}
      .pmx-case-features{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:54px auto 0;border-top:1px solid #dce2ea;border-bottom:1px solid #dce2ea}
      .pmx-case-features span{min-height:122px;display:flex;align-items:center;justify-content:center;padding:25px 20px;font-size:clamp(22px,2.4vw,28px);line-height:1.3;font-weight:800;word-break:keep-all}
      .pmx-case-features span+span{border-left:1px solid #dce2ea}
      .pmx-case-prices{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:58px auto 0}
      .pmx-case-price{padding:16px 14px}
      .pmx-case-price span{display:block;color:#64728b;font-size:clamp(20px,2.2vw,25px);font-weight:660}
      .pmx-case-price strong{display:block;margin-top:14px;font-size:clamp(43px,5.4vw,64px);line-height:.94;letter-spacing:-.055em;font-weight:950;white-space:nowrap}
      .pmx-case-price.main strong{color:#245fc4}

      /* 신뢰 */
      #trust-proof{background:#f7f8fa;color:#10182b}
      .pmx-trust-grid{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:58px auto 0;border-top:1px solid #dfe5ef;border-bottom:1px solid #dfe5ef}
      .pmx-trust-grid article{min-height:188px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px 18px}
      .pmx-trust-grid article+article{border-left:1px solid #dfe5ef}
      .pmx-trust-grid strong{font-size:clamp(52px,6.2vw,76px);line-height:.94;font-weight:950;letter-spacing:-.06em}
      .pmx-trust-grid span{margin-top:13px;font-size:clamp(21px,2.4vw,28px);font-weight:730;color:#33425f}
      .pmx-trust-grid em{margin-top:7px;font-style:normal;font-size:18px;color:#6e7d98;font-weight:520}

      /* 호텔/투어 */
      #hotel-benefit{min-height:max(620px,70svh);background:#fff;color:#10182b;border-top:1px solid #e7eaf0}
      #hotel-benefit .pmx-title{color:#10182b}
      .pmx-tripline{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:54px auto 0;border-top:1px solid #dfe5ef;border-bottom:1px solid #dfe5ef}
      .pmx-tripline-item{min-height:168px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:28px 20px;text-align:center}
      .pmx-tripline-item+.pmx-tripline-item{border-left:1px solid #dfe5ef}
      .pmx-tripline-item b{font-size:17px;letter-spacing:.08em;color:#5e7eae;font-weight:800}
      .pmx-tripline-item strong{margin-top:12px;font-size:clamp(29px,3vw,40px);font-weight:880;color:#10182b}

      /* 계산기 */
      #calculator.ig8-calculator{display:flex;align-items:center;padding:118px 0;background:#f7f8fa;color:#10182b;position:relative;overflow:hidden}
      #calculator.ig8-calculator>.container{width:min(1120px,calc(100% - 40px));margin:0 auto}
      #calculator.ig8-calculator .section-head{margin-bottom:48px;text-align:center}
      #calculator.ig8-calculator .section-head h2{max-width:920px;margin:0 auto;font-size:clamp(48px,6vw,80px)!important;line-height:1.06!important;letter-spacing:-.058em!important;font-weight:650!important;word-break:keep-all}
      #calculator.ig8-calculator .section-head h2 strong{font-weight:950!important}
      #calculator.ig8-calculator .section-head p,#calculator.ig8-calculator .section-kicker,#calculator.ig8-calculator .calculator-note{display:none!important}
      #calculator.ig8-calculator .exchange-bar{display:flex;align-items:center;justify-content:space-between;gap:20px;margin:0 auto 20px;padding:21px 27px;border:1px solid #dfe5ef;border-radius:22px;background:#fff}
      #calculator.ig8-calculator .exchange-label{font-size:19px;font-weight:650;color:#637393}
      #calculator.ig8-calculator #exchangeRateText{font-size:clamp(28px,3.5vw,40px);line-height:1;font-weight:860;letter-spacing:-.045em;color:#10182b}
      #calculator.ig8-calculator .exchange-meta{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
      #calculator.ig8-calculator .calculator-card{margin:0 auto;padding:40px;border:1px solid #dfe5ef;border-radius:26px;background:#fff;box-shadow:none}
      #calculator.ig8-calculator .calculator-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:24px}
      #calculator.ig8-calculator .calculator-head strong{font-size:clamp(23px,2.7vw,31px);font-weight:650;color:#10182b}
      #calculator.ig8-calculator #rangeValue{font-size:clamp(48px,6.2vw,74px);line-height:.92;font-weight:930;letter-spacing:-.06em;color:#10182b}
      #calculator.ig8-calculator .price-range{margin:8px 0 30px;height:10px}
      #calculator.ig8-calculator .calculator-mode{display:grid;grid-template-columns:1fr 1fr;width:min(560px,100%);margin:0 auto 32px;padding:5px;border:1px solid #dfe5ef;border-radius:16px;background:#f4f6f9}
      #calculator.ig8-calculator .mode-btn{min-height:54px;border:0;border-radius:12px;background:transparent;color:#637393;font-size:19px;font-weight:700;box-shadow:none}
      #calculator.ig8-calculator .mode-btn.active{background:#10182b;color:#fff}
      #calculator.ig8-calculator .result-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:0}
      #calculator.ig8-calculator .result-box{min-height:160px;padding:25px 20px;border:1px solid #dfe5ef;border-radius:20px;background:#fff;display:flex;flex-direction:column;justify-content:center;text-align:center}
      #calculator.ig8-calculator .result-box:first-child{display:none!important}
      #calculator.ig8-calculator .result-box span{font-size:clamp(19px,2.1vw,24px);font-weight:620;color:#637393}
      #calculator.ig8-calculator .result-box strong{display:block;margin-top:12px;font-size:clamp(40px,5vw,56px);line-height:.95;font-weight:930;letter-spacing:-.05em;color:#10182b;white-space:nowrap}
      #calculator.ig8-calculator .result-box em,#calculator.ig8-calculator .result-box small{display:none!important}
      #calculator.ig8-calculator .result-box.highlight{grid-column:1/-1;width:100%;min-height:170px;background:#1f4f96;border-color:#1f4f96;color:#fff}
      #calculator.ig8-calculator .result-box.highlight span,#calculator.ig8-calculator .result-box.highlight strong{color:#fff}
      #calculator .pmx-calc-cta{display:flex;align-items:center;justify-content:center;width:min(560px,100%);min-height:68px;margin:24px auto 0;padding:0 28px;border:0;border-radius:16px;background:#10182b;color:#fff;font-size:clamp(21px,2.4vw,28px);font-weight:800;letter-spacing:-.035em;cursor:pointer}

      /* 최저가 */
      #price-match{min-height:62svh;display:flex;align-items:center;padding:96px 0;background:#fff;color:#10182b;border-top:1px solid #e2e7ee;border-bottom:1px solid #e2e7ee}
      .pmx-price-match-line{display:grid;grid-template-columns:1fr auto;align-items:center;gap:36px;max-width:1000px;margin:0 auto;text-align:left}
      .pmx-price-match-line h2{margin:0;font-size:clamp(42px,5.2vw,64px);line-height:1.1;letter-spacing:-.052em;font-weight:720;word-break:keep-all}
      .pmx-price-match-line h2 strong{font-weight:950;color:#245fc4}
      .pmx-price-match-number{font-size:clamp(74px,9.2vw,112px);line-height:.88;font-weight:950;letter-spacing:-.07em;color:#10182b;white-space:nowrap}
      .pmx-price-match-copy{max-width:1000px;margin:26px auto 0;color:#62708a;font-size:clamp(21px,2.4vw,28px);font-weight:650;text-align:left;word-break:keep-all}

      #plans{padding-top:125px!important;padding-bottom:145px!important}
      #plans .membership-section-head .section-kicker{display:none!important}
      #plans .membership-section-head h2{font-size:clamp(48px,6vw,80px)!important;line-height:1.06!important;letter-spacing:-.058em!important;font-weight:860!important}
      #plans .plan-fit{margin:-8px 0 22px;padding:0 2px;font-size:clamp(19px,2vw,22px);line-height:1.35;font-weight:720;letter-spacing:-.025em;word-break:keep-all}
      #plans .recommended .plan-fit{color:rgba(255,255,255,.86)}
      #plans .plan-card:not(.recommended) .plan-fit{color:#53617a}

      @media(max-width:780px){
        .pmx-inner{width:min(100% - 24px,680px)}
        .pmx-title{font-size:clamp(38px,10.2vw,49px);line-height:1.08}.pmx-label{font-size:18px;margin-bottom:17px}.pmx-lead{font-size:22px;margin-top:24px}.pmx-next{margin-top:56px;font-size:22px}
        #travel-desire,#subscribe-why,#subscribe-start,#subscribe-monthly,#subscribe-seven,#subscribe-use,#subscribe-result,#real-booking-case,#trust-proof,#calculator.ig8-calculator{min-height:88svh}
        #subscribe-why,#subscribe-start,#subscribe-monthly,#subscribe-seven,#subscribe-use,#subscribe-result,#real-booking-case,#trust-proof{padding:92px 0}
        .pmx-cruise-visual{min-height:88svh}.pmx-cruise-copy{width:min(100% - 24px,680px);padding-bottom:66px}.pmx-cruise-visual img{object-position:center 52%}
        .pmx-why-line{font-size:29px;margin-top:42px;padding:28px 0}.pmx-story-step{width:46px;height:46px;font-size:19px}
        .pmx-big-pair,.pmx-use-split{grid-template-columns:1fr;gap:10px;margin-top:44px}.pmx-big-value,.pmx-use-part{padding:27px 12px}.pmx-big-value strong{font-size:62px}.pmx-big-arrow,.pmx-use-plus{transform:rotate(90deg);font-size:30px}
        .pmx-ledger{margin-top:44px}.pmx-ledger-row{grid-template-columns:1fr;gap:9px;text-align:center;padding:24px 4px}.pmx-ledger-row span{font-size:21px}.pmx-ledger-row strong{font-size:43px}.pmx-seven-paid{text-align:center;font-size:21px}.pmx-seven-paid strong{float:none;display:block;margin-top:9px;font-size:42px}
        .pmx-use-price{font-size:76px;margin-top:42px}.pmx-use-part strong{font-size:50px}.pmx-use-note{font-size:21px;margin-top:32px}
        .pmx-money-story{margin-top:44px}.pmx-money-row{grid-template-columns:1fr;gap:11px;text-align:center;padding:27px 4px}.pmx-money-row strong{text-align:center;font-size:48px}.pmx-money-row.point strong{font-size:61px}.pmx-cash-total{margin-top:40px;padding-top:32px}.pmx-cash-total strong{font-size:76px}.pmx-save-line{font-size:29px}
        .pmx-case-route{font-size:20px}.pmx-case-features{grid-template-columns:1fr;margin-top:40px}.pmx-case-features span{min-height:80px;padding:17px 10px;font-size:21px}.pmx-case-features span+span{border-left:0;border-top:1px solid #dce2ea}.pmx-case-prices{grid-template-columns:1fr;margin-top:40px}.pmx-case-price{padding:19px 8px;border-top:1px solid #dce2ea}.pmx-case-price:first-child{border-top:0}.pmx-case-price strong{font-size:47px}
        .pmx-trust-grid{grid-template-columns:1fr;margin-top:42px}.pmx-trust-grid article{min-height:114px}.pmx-trust-grid article+article{border-left:0;border-top:1px solid #dfe5ef}.pmx-trust-grid strong{font-size:47px}.pmx-trust-grid span{font-size:22px}.pmx-trust-grid em{font-size:17px}
        #hotel-benefit{min-height:560px;padding:74px 0}.pmx-tripline{grid-template-columns:1fr;margin-top:38px}.pmx-tripline-item{min-height:100px;padding:20px 8px}.pmx-tripline-item+.pmx-tripline-item{border-left:0;border-top:1px solid #dfe5ef}.pmx-tripline-item strong{font-size:29px}
        #calculator.ig8-calculator{padding:92px 0}#calculator.ig8-calculator>.container{width:min(calc(100% - 20px),680px)!important}#calculator.ig8-calculator .section-head{margin-bottom:34px}#calculator.ig8-calculator .section-head h2{font-size:clamp(38px,10.2vw,49px)!important}#calculator.ig8-calculator .exchange-bar{padding:17px 18px;border-radius:18px;align-items:flex-end}#calculator.ig8-calculator .exchange-label{font-size:16px}#calculator.ig8-calculator #exchangeRateText{font-size:26px}#calculator.ig8-calculator .calculator-card{padding:22px 14px;border-radius:20px}#calculator.ig8-calculator .calculator-head strong{font-size:19px}#calculator.ig8-calculator #rangeValue{font-size:43px}#calculator.ig8-calculator .calculator-mode{width:100%;margin-bottom:20px}#calculator.ig8-calculator .mode-btn{font-size:16px;min-height:48px}#calculator.ig8-calculator .result-grid{gap:9px}#calculator.ig8-calculator .result-box{min-height:122px;padding:18px 8px;border-radius:18px}#calculator.ig8-calculator .result-box span{font-size:16px}#calculator.ig8-calculator .result-box strong{font-size:clamp(29px,8.8vw,38px)}#calculator.ig8-calculator .result-box.highlight{min-height:138px;padding:22px 12px}#calculator.ig8-calculator .result-box.highlight span{font-size:19px}#calculator.ig8-calculator .result-box.highlight strong{font-size:clamp(43px,12vw,56px)}#calculator .pmx-calc-cta{min-height:60px;font-size:21px}
        #price-match{min-height:54svh;padding:74px 0}.pmx-price-match-line{grid-template-columns:1fr;text-align:center;gap:22px}.pmx-price-match-line h2{font-size:37px}.pmx-price-match-number{font-size:76px}.pmx-price-match-copy{text-align:center;font-size:20px}
        #plans{padding-top:92px!important;padding-bottom:112px!important}#plans .membership-section-head h2{font-size:clamp(38px,10.2vw,49px)!important}#plans .plan-fit{font-size:18px!important}
      }
      @media(prefers-reduced-motion:reduce){.pmx-enter{opacity:1!important;transform:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function make(tag,id,html,cls){const el=document.createElement(tag);if(id)el.id=id;if(cls)el.className=cls;el.innerHTML=html;return el}

  function animateCounts(root){
    root.querySelectorAll('[data-count]').forEach((el)=>{
      if(el.dataset.counted==='1')return;
      el.dataset.counted='1';
      const target=Number(el.dataset.count||0),prefix=el.dataset.prefix||'',suffix=el.dataset.suffix||'',decimals=Number(el.dataset.decimals||0);
      const start=performance.now(),duration=1000;
      function tick(now){const p=Math.min(1,(now-start)/duration),eased=1-Math.pow(1-p,3),value=target*eased;el.textContent=prefix+value.toLocaleString('en-US',{minimumFractionDigits:decimals,maximumFractionDigits:decimals})+suffix;if(p<1)requestAnimationFrame(tick)}
      requestAnimationFrame(tick);
    });
  }

  function observe(nodes){
    const list=nodes.filter(Boolean);
    list.forEach((node)=>node.querySelectorAll('.pmx-enter').forEach((el,index)=>el.style.setProperty('--pmx-delay',`${Math.min(index,8)*90}ms`)));
    if(!('IntersectionObserver' in window)){list.forEach((node)=>{node.classList.add('pmx-visible');animateCounts(node)});return}
    const io=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(!entry.isIntersecting)return;entry.target.classList.add('pmx-visible');animateCounts(entry.target);io.unobserve(entry.target)}),{threshold:.16,rootMargin:'0px 0px -7% 0px'});
    list.forEach((node)=>io.observe(node));
  }

  function removeOldInjected(){
    ['why-save','why-direct','how-it-works','travel-subscribe','earn-points','membership-summary','ig8-problem-a','ig8-problem-b','ig8-promise','ig8-rule','ig8-cruise','ig8-membership-spend','ig8-total','ig8-saving','ig8-freedom','ig8-final','join-faq','pmx-bottom-cta','trust-proof','travel-desire','quick-result','real-booking-case','subscribe-bridge','subscribe-value','subscribe-why','subscribe-start','subscribe-monthly','subscribe-seven','subscribe-use','subscribe-result','subscribe-booking','bridge-proof','bridge-seven','bridge-booking','bridge-result','bridge-calc','bridge-actual','ig8-start','ig8-monthly','ig8-seven','ig8-payment','ig8-routes','signup-steps'].forEach((id)=>document.getElementById(id)?.remove());
  }

  function rebuildNav(){
    const nav=document.querySelector('.hero-nav-track');if(!nav)return;
    const set=[['#subscribe-start','01','구독 시작'],['#subscribe-seven','02','7개월 적립'],['#subscribe-use','03','포인트 사용'],['#subscribe-result','04','실제 지출'],['#real-booking-case','05','실제 예약'],['#calculator','06','직접 계산'],['#plans','07','플랜 선택']].map(([href,num,label])=>`<a href="${href}"><strong>${num}</strong><span>${label}</span></a>`).join('');
    nav.innerHTML=set+set;
  }

  function next(text){return `<div class="pmx-next pmx-enter">${text}<span class="arrow">↓</span></div>`}

  function buildTravel(review){
    const el=make('section','travel-desire',`<div class="pmx-cruise-visual"><img src="https://images.unsplash.com/photo-1688269910705-2d2a9d943a95?auto=format&fit=crop&q=85&w=1800" alt="크루즈 선상 수영장과 바다 풍경" loading="lazy"><div class="pmx-cruise-copy"><span class="pmx-label pmx-enter">크루즈 여행</span><h2 class="pmx-title pmx-enter">한 번에 큰돈 내기 전에<br><strong>여행비부터 준비</strong></h2><p class="pmx-lead pmx-enter">매달 내는 구독료가 예약에 쓸 포인트로 쌓입니다.</p>${next('그럼 <strong>왜 구독하면 유리한지</strong>부터 보겠습니다.')}</div></div>`,'pmx-section');
    review.insertAdjacentElement('afterend',el);return el;
  }

  function buildWhy(after){
    const el=make('section','subscribe-why',`<div class="pmx-inner"><span class="pmx-label pmx-enter">왜 구독하나요?</span><h2 class="pmx-title pmx-enter">매달 내는 돈이<br><strong>크루즈 예약 포인트</strong>가 됩니다</h2><div class="pmx-why-line pmx-enter">클래식 기준 <strong>$100 구독 → 200P 적립</strong></div>${next('먼저 <strong>첫 가입 때</strong> 어떻게 쌓이는지 보겠습니다.')}</div>`,'pmx-section');after.insertAdjacentElement('afterend',el);return el;
  }

  function buildStart(after){
    const el=make('section','subscribe-start',`<div class="pmx-inner"><span class="pmx-story-step pmx-enter">1</span><span class="pmx-label pmx-enter">첫 가입</span><h2 class="pmx-title pmx-enter">처음 <strong>$200</strong>으로 시작</h2><div class="pmx-big-pair"><div class="pmx-big-value pmx-enter"><span>첫 가입 결제</span><strong data-count="200" data-prefix="$">$200</strong></div><div class="pmx-big-arrow pmx-enter">→</div><div class="pmx-big-value pmx-enter"><span>바로 받는 포인트</span><strong data-count="350" data-suffix="P">350P</strong></div></div><p class="pmx-lead pmx-enter">첫 결제부터 예약에 쓸 350P가 생깁니다.</p>${next('첫 가입이 끝나면 <strong>다음 달부터는 더 단순합니다.</strong>')}</div>`,'pmx-section');after.insertAdjacentElement('afterend',el);return el;
  }

  function buildMonthly(after){
    const el=make('section','subscribe-monthly',`<div class="pmx-inner"><span class="pmx-story-step pmx-enter">2</span><span class="pmx-label pmx-enter">그 다음 매월</span><h2 class="pmx-title pmx-enter">매월 <strong>$100</strong> 구독</h2><div class="pmx-big-pair"><div class="pmx-big-value pmx-enter"><span>매월 구독료</span><strong data-count="100" data-prefix="$">$100</strong></div><div class="pmx-big-arrow pmx-enter">→</div><div class="pmx-big-value pmx-enter"><span>매월 적립</span><strong data-count="200" data-suffix="P">200P</strong></div></div><p class="pmx-lead pmx-enter">여행 날짜를 정하기 전부터 매달 200P씩 모을 수 있습니다.</p>${next('이걸 <strong>7개월 동안</strong> 모으면 얼마나 될까요?')}</div>`,'pmx-section');after.insertAdjacentElement('afterend',el);return el;
  }

  function buildSeven(after){
    const el=make('section','subscribe-seven',`<div class="pmx-inner"><span class="pmx-story-step pmx-enter">3</span><span class="pmx-label pmx-enter">7개월 준비</span><h2 class="pmx-title pmx-enter">7개월 뒤<br><strong data-count="1750" data-suffix="P">1,750P</strong></h2><div class="pmx-ledger"><div class="pmx-ledger-row pmx-enter"><span>첫 가입에서 받은 포인트</span><strong>350P</strong></div><div class="pmx-ledger-row pmx-enter"><span>매월 200P × 7개월</span><strong>1,400P</strong></div><div class="pmx-ledger-row total pmx-enter"><span>예약에 쓸 포인트</span><strong data-count="1750" data-suffix="P">1,750P</strong></div></div><div class="pmx-seven-paid pmx-enter">7개월까지 내가 낸 구독료 <strong data-count="900" data-prefix="$">$900</strong></div>${next('이제 이 <strong>1,750P를 실제 크루즈 예약에 씁니다.</strong>')}</div>`,'pmx-section');after.insertAdjacentElement('afterend',el);return el;
  }

  function buildUse(after){
    const el=make('section','subscribe-use',`<div class="pmx-inner"><span class="pmx-label pmx-enter">예약할 때</span><h2 class="pmx-title pmx-enter"><strong>$3,500 크루즈</strong>라면</h2><div class="pmx-use-price pmx-enter" data-count="3500" data-prefix="$">$3,500</div><div class="pmx-use-split"><div class="pmx-use-part pmx-enter"><span>앞에서 쌓은 포인트</span><strong data-count="1750" data-suffix="P">1,750P</strong></div><div class="pmx-use-plus pmx-enter">+</div><div class="pmx-use-part pmx-enter"><span>나머지 카드 결제</span><strong data-count="1750" data-prefix="$">$1,750</strong></div></div><div class="pmx-use-note pmx-enter"><strong>1,750P를 예약금액에 사용</strong>하고 남은 $1,750만 카드로 결제합니다.</div>${next('그럼 처음부터 지금까지 <strong>현금으로 실제 얼마를 쓴 걸까요?</strong>')}</div>`,'pmx-section');after.insertAdjacentElement('afterend',el);return el;
  }

  function buildResult(after){
    const el=make('section','subscribe-result',`<div class="pmx-inner"><span class="pmx-label pmx-enter">실제 현금 지출</span><h2 class="pmx-title pmx-enter">처음부터 다시 더하면<br><strong>$2,650</strong></h2><div class="pmx-money-story"><div class="pmx-money-row pmx-enter"><span>7개월 동안 실제로 낸 구독료</span><strong data-count="900" data-prefix="$">$900</strong></div><div class="pmx-money-row point pmx-enter"><span>그 구독료로 쌓여 예약에 사용한 포인트</span><strong data-count="1750" data-suffix="P">1,750P</strong></div><div class="pmx-money-row pmx-enter"><span>예약할 때 추가로 낸 카드 금액</span><strong data-count="1750" data-prefix="$">$1,750</strong></div></div><div class="pmx-cash-total pmx-enter"><span>현금으로 실제 나간 돈 · $900 + $1,750</span><strong data-count="2650" data-prefix="$">$2,650</strong></div><div class="pmx-save-line pmx-enter">$3,500 그대로 결제하는 것보다 <strong data-count="850" data-prefix="$" data-suffix=" 차이">$850 차이</strong></div>${next('계산 예시가 아니라 <strong>실제 2인 예약</strong>도 보겠습니다.')}</div>`,'pmx-section');after.insertAdjacentElement('afterend',el);return el;
  }

  function buildRealCase(after){
    const el=make('section','real-booking-case',`<div class="pmx-inner"><span class="pmx-label pmx-enter">실제 2인 예약</span><h2 class="pmx-title pmx-enter"><strong>7박 서부 지중해</strong></h2><p class="pmx-case-route pmx-enter">바르셀로나 출발 · MSC World Asia</p><div class="pmx-case-features"><span class="pmx-enter">2인 기준</span><span class="pmx-enter">프리미엄 음료 패키지 포함</span><span class="pmx-enter">디럭스 발코니 Fantastica</span></div><div class="pmx-case-prices"><div class="pmx-case-price pmx-enter"><span>2인 총 예약가</span><strong data-count="3887.35" data-prefix="$" data-decimals="2">$3,887.35</strong></div><div class="pmx-case-price pmx-enter"><span>리워드 사용</span><strong data-count="1805.84" data-suffix="P" data-decimals="2">1,805.84P</strong></div><div class="pmx-case-price main pmx-enter"><span>예약 시 카드 결제</span><strong data-count="2020.88" data-prefix="$" data-decimals="2">$2,020.88</strong></div></div>${next('처음 보는 서비스라면 <strong>누가 운영하는지도 확인해야 합니다.</strong>')}</div>`,'pmx-section');after.insertAdjacentElement('afterend',el);return el;
  }

  function buildTrust(after){
    const el=make('section','trust-proof',`<div class="pmx-inner"><span class="pmx-label pmx-enter">INCRUISES</span><h2 class="pmx-title pmx-enter"><strong>2015년부터 운영 중</strong></h2><div class="pmx-trust-grid"><article class="pmx-enter"><strong>10년+</strong><span>운영 이력</span><em>2015년부터</em></article><article class="pmx-enter"><strong>350만+</strong><span>전 세계 이용자</span><em>글로벌 여행 플랫폼</em></article><article class="pmx-enter"><strong>CLIA</strong><span>공식 회원</span><em>#00027506</em></article></div>${next('크루즈 말고도 <strong>여행에서 같이 쓸 수 있는 혜택</strong>이 있습니다.')}</div>`,'pmx-section');after.insertAdjacentElement('afterend',el);return el;
  }

  function rebuildHotel(after){
    const hotel=document.getElementById('hotel-benefit');if(!hotel)return null;
    hotel.className='pmx-section';
    hotel.innerHTML=`<div class="pmx-inner"><span class="pmx-label pmx-enter">크루즈 외 혜택</span><h2 class="pmx-title pmx-enter">호텔 · 투어도<br><strong>같이 이용</strong></h2><div class="pmx-tripline"><div class="pmx-tripline-item pmx-enter"><b>STAY</b><strong>전세계 호텔</strong></div><div class="pmx-tripline-item pmx-enter"><b>EXPLORE</b><strong>현지 투어</strong></div><div class="pmx-tripline-item pmx-enter"><b>EXTEND</b><strong>출발 전후 숙박</strong></div></div>${next('이제 예시 말고 <strong>내가 보고 있는 크루즈 가격</strong>으로 계산해보세요.')}</div>`;
    after.insertAdjacentElement('afterend',hotel);return hotel;
  }

  function prepareCalculator(after){
    const calc=document.getElementById('calculator');if(!calc)return null;
    calc.className='ig8-calculator pmx-section';
    const head=calc.querySelector('.section-head');if(head)head.innerHTML='<h2>내 크루즈 가격으로<br><strong>직접 계산</strong></h2>';
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
    const why=buildWhy(travel);
    const start=buildStart(why);
    const monthly=buildMonthly(start);
    const seven=buildSeven(monthly);
    const use=buildUse(seven);
    const result=buildResult(use);
    const realCase=buildRealCase(result);
    const trust=buildTrust(realCase);
    const hotel=rebuildHotel(trust);
    const calc=prepareCalculator(hotel||trust);
    const pm=rebuildPriceMatch(calc);
    const plans=document.getElementById('plans');if(plans&&pm)pm.insertAdjacentElement('afterend',plans);
    patchPlans();watchPlans();
    const floating=document.querySelector('.floating-cta');if(floating)floating.textContent='멤버십 플랜 보기';
    document.querySelectorAll('#hotel-benefit svg,footer svg,.pmx-section svg').forEach((svg)=>svg.remove());
    observe([travel,why,start,monthly,seven,use,result,realCase,trust,hotel,calc,pm]);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0),{once:true});else setTimeout(init,0);
})();