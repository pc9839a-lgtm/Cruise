(function(){
  'use strict';

  const numberValue=id=>{
    const input=document.getElementById(id);
    if(!input)return 0;
    const value=Number(input.value);
    return Number.isFinite(value)&&value>0?value:0;
  };

  const money=value=>{
    const digits=Number.isInteger(value)?0:2;
    return '$'+value.toLocaleString('en-US',{minimumFractionDigits:digits,maximumFractionDigits:2});
  };

  function updateQualification(){
    const direct=Math.floor(numberValue('mdDirect'));
    const legs=[1,2,3,4,5].map(index=>Math.floor(numberValue('mdLeg'+index)));
    const total=legs.reduce((sum,value)=>sum+value,0);
    const largest=Math.max(0,...legs);
    const ratio=total>0?(largest/total)*100:0;
    const directPass=direct>=5;
    const totalPass=total>=30;
    const ratioPass=total>0&&ratio<=40;
    const passed=directPass&&totalPass&&ratioPass;

    const directOutput=document.getElementById('mdDirectOutput');
    const totalOutput=document.getElementById('mdTotalOutput');
    const ratioOutput=document.getElementById('mdRatioOutput');
    const status=document.getElementById('mdQualificationStatus');

    if(directOutput)directOutput.textContent=direct+'명';
    if(totalOutput)totalOutput.textContent=total+'명';
    if(ratioOutput)ratioOutput.textContent=(total?ratio.toFixed(1):'0')+'%';

    if(!status)return;
    status.classList.toggle('is-fail',!passed);

    if(passed){
      status.textContent='MD 인원 기준 충족';
      return;
    }

    const reasons=[];
    if(!directPass)reasons.push('직추천 5명 필요');
    if(!totalPass)reasons.push('팀 활성 유료 멤버 30명 필요');
    if(total>0&&!ratioPass)reasons.push('최대 레그가 40% 초과');
    if(total===0)reasons.push('레그별 인원을 입력');
    status.textContent='미충족 · '+reasons.join(' · ');
  }

  function updateCompensation(){
    const classicMaintenance=Math.floor(numberValue('mdClassicMaintenance'));
    const premiumMaintenance=Math.floor(numberValue('mdPremiumMaintenance'));
    const newClassic=Math.floor(numberValue('mdNewClassic'));
    const newPremium=Math.floor(numberValue('mdNewPremium'));
    const isMd=document.getElementById('mdQualified')?.checked!==false;
    const includeFastStart=document.getElementById('mdFastStart')?.checked===true;

    const leadership=isMd?300:0;
    const recurring=(classicMaintenance*5)+(premiumMaintenance*12.5);
    const directActivation=(newClassic*20)+(newPremium*50);
    const directTotal=newClassic+newPremium;

    let classicMonthlyRate=0;
    let premiumMonthlyRate=0;
    if(directTotal>=10){
      classicMonthlyRate=40;
      premiumMonthlyRate=100;
    }else if(directTotal>=5){
      classicMonthlyRate=30;
      premiumMonthlyRate=75;
    }

    const monthlyActivation=(newClassic*classicMonthlyRate)+(newPremium*premiumMonthlyRate);
    const fastStart=includeFastStart?500:0;
    const total=leadership+recurring+directActivation+monthlyActivation+fastStart;

    const values={
      mdLeadershipResult:leadership,
      mdRecurringResult:recurring,
      mdDirectResult:directActivation,
      mdMonthlyResult:monthlyActivation,
      mdFastResult:fastStart,
      mdTotalResult:total
    };

    Object.entries(values).forEach(([id,value])=>{
      const target=document.getElementById(id);
      if(target)target.textContent=money(value);
    });

    const tier=document.getElementById('mdMonthlyTier');
    if(tier){
      tier.textContent=directTotal>=10?'직추천 10명 이상 단가 적용':directTotal>=5?'직추천 5–9명 단가 적용':'월 활성화 보너스 기준 미달';
    }
  }

  function init(){
    document.querySelectorAll('#mdQualificationCalculator input').forEach(input=>input.addEventListener('input',updateQualification));
    document.querySelectorAll('#mdCompensationCalculator input').forEach(input=>{
      input.addEventListener('input',updateCompensation);
      input.addEventListener('change',updateCompensation);
    });
    updateQualification();
    updateCompensation();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
