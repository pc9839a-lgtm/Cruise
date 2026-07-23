(function(){
  'use strict';

  const numberValue=id=>{
    const input=document.getElementById(id);
    if(!input)return 0;
    const value=Number(input.value);
    return Number.isFinite(value)&&value>0?Math.floor(value):0;
  };

  const money=value=>'$'+Math.round(value).toLocaleString('en-US');

  function updateQualification(){
    const legs=[1,2,3].map(index=>{
      const premium=numberValue('mdLeg'+index+'Premium');
      const classic=numberValue('mdLeg'+index+'Classic');
      const sales=(premium*500)+(classic*200);
      return {premium,classic,sales,qualified:Math.min(sales,1200)};
    });

    const rawSales=legs.reduce((sum,leg)=>sum+leg.sales,0);
    const qualifiedSales=legs.reduce((sum,leg)=>sum+leg.qualified,0);
    const excludedSales=Math.max(0,rawSales-qualifiedSales);
    const passed=qualifiedSales>=3000;

    const rawOutput=document.getElementById('mdRawSalesOutput');
    const qualifiedOutput=document.getElementById('mdQualifiedSalesOutput');
    const excludedOutput=document.getElementById('mdExcludedSalesOutput');
    const status=document.getElementById('mdQualificationStatus');
    const summary=document.getElementById('mdLegSummary');

    if(rawOutput)rawOutput.textContent=money(rawSales);
    if(qualifiedOutput)qualifiedOutput.textContent=money(qualifiedSales);
    if(excludedOutput)excludedOutput.textContent=money(excludedSales);

    if(summary){
      summary.textContent=legs.map((leg,index)=>{
        const detail=[];
        if(leg.premium)detail.push('P '+leg.premium+'명');
        if(leg.classic)detail.push('C '+leg.classic+'명');
        const members=detail.length?detail.join(' · '):'가입 0명';
        const capped=leg.sales>1200?' · 인정 '+money(leg.qualified):'';
        return 'LEG '+(index+1)+' '+members+' = '+money(leg.sales)+capped;
      }).join(' / ');
    }

    if(!status)return;
    status.classList.toggle('is-fail',!passed);

    if(passed){
      status.textContent='MD 매출 기준 충족 · 인정 매출 '+money(qualifiedSales);
      return;
    }

    const shortage=Math.max(0,3000-qualifiedSales);
    status.textContent='MD 미충족 · 인정 매출 '+money(qualifiedSales)+' · '+money(shortage)+' 부족';
  }

  function init(){
    document.querySelectorAll('#mdQualificationCalculator input').forEach(input=>{
      input.addEventListener('input',updateQualification);
      input.addEventListener('change',updateQualification);
    });
    updateQualification();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();