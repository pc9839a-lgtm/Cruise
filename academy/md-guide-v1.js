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
    const legs=[1,2,3,4,5].map(index=>numberValue('mdLeg'+index+'Sales'));
    const rawSales=legs.reduce((sum,value)=>sum+value,0);
    const qualifiedSales=legs.reduce((sum,value)=>sum+Math.min(value,1200),0);
    const excludedSales=Math.max(0,rawSales-qualifiedSales);
    const passed=qualifiedSales>=3000;

    const rawOutput=document.getElementById('mdRawSalesOutput');
    const qualifiedOutput=document.getElementById('mdQualifiedSalesOutput');
    const excludedOutput=document.getElementById('mdExcludedSalesOutput');
    const status=document.getElementById('mdQualificationStatus');

    if(rawOutput)rawOutput.textContent=money(rawSales);
    if(qualifiedOutput)qualifiedOutput.textContent=money(qualifiedSales);
    if(excludedOutput)excludedOutput.textContent=money(excludedSales);

    if(!status)return;
    status.classList.toggle('is-fail',!passed);
    status.textContent=passed
      ?'MD 매출 기준 충족 · 인정 매출 '+money(qualifiedSales)
      :'MD 매출 기준 미충족 · '+money(3000-qualifiedSales)+' 부족';
  }

  function monthlyActivationRate(count,classic){
    if(count>=10)return classic?40:100;
    if(count>=5)return classic?30:75;
    if(count>=3)return classic?20:50;
    return 0;
  }

  function builderRate(sales){
    if(sales>=30000)return .30;
    if(sales>=10000)return .10;
    if(sales>=5000)return .05;
    return 0;
  }

  function updateCompensation(){
    const qualifyingSales=numberValue('mdQualifyingSales');
    const maintenanceSales=numberValue('mdMaintenanceSales');
    const newClassic=Math.floor(numberValue('mdNewClassic'));
    const newPremium=Math.floor(numberValue('mdNewPremium'));
    const weeklyMatch=numberValue('mdWeeklyMatch');
    const builderSales=numberValue('mdBuilderSales');

    const leadership=qualifyingSales>=3000?300:0;
    const recurring=maintenanceSales*.05;
    const directActivation=(newClassic*20)+(newPremium*50);
    const classicRate=monthlyActivationRate(newClassic,true);
    const premiumRate=monthlyActivationRate(newPremium,false);
    const monthlyActivation=(newClassic*classicRate)+(newPremium*premiumRate);
    const currentBuilderRate=leadership>0?builderRate(builderSales):0;
    const builderBonus=builderSales*currentBuilderRate;
    const total=leadership+recurring+directActivation+monthlyActivation+weeklyMatch+builderBonus;

    const values={
      mdLeadershipResult:leadership,
      mdRecurringResult:recurring,
      mdDirectResult:directActivation,
      mdMonthlyResult:monthlyActivation,
      mdWeeklyResult:weeklyMatch,
      mdBuilderResult:builderBonus,
      mdTotalResult:total
    };

    Object.entries(values).forEach(([id,value])=>{
      const target=document.getElementById(id);
      if(target)target.textContent=money(value);
    });

    const monthlyTier=document.getElementById('mdMonthlyTier');
    if(monthlyTier){
      const parts=[];
      if(classicRate)parts.push('CLASSIC '+newClassic+'명 × $'+classicRate);
      if(premiumRate)parts.push('PREMIUM '+newPremium+'명 × $'+premiumRate);
      monthlyTier.textContent=parts.length?parts.join(' · '):'월 활성화 보너스 없음';
    }

    const builderTier=document.getElementById('mdBuilderTier');
    if(builderTier){
      builderTier.textContent=currentBuilderRate
        ?'빌더베이스 '+Math.round(currentBuilderRate*100)+'%'
        :'빌더베이스 기준 미달';
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
