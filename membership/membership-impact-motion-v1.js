(() => {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const active = new WeakSet();
  const loops = new WeakMap();

  function play(el, frames, options = {}) {
    if (!el?.animate) return null;
    try {
      return el.animate(frames, {
        duration: options.duration || 620,
        delay: options.delay || 0,
        easing: options.easing || 'cubic-bezier(.18,.85,.24,1)',
        fill: 'none',
        iterations: options.iterations || 1,
        direction: options.direction || 'normal'
      });
    } catch (_) { return null; }
  }

  function stagger(items, axis = 'y', amount = 22, baseDelay = 70) {
    items.forEach((el, i) => {
      const from = axis === 'x' ? `translateX(${i % 2 ? amount : -amount}px) scale(.97)` : `translateY(${amount}px) scale(.97)`;
      play(el,[{transform:from},{transform:'translate(0,0) scale(1)'}],{duration:520,delay:i*baseDelay});
    });
  }

  function addLoop(section, el, frames, duration, delay = 0) {
    const anim = play(el, frames, {duration,delay,iterations:Infinity,easing:'ease-in-out'});
    if (!anim) return;
    const list = loops.get(section) || [];
    list.push(anim); loops.set(section,list);
  }

  function stop(section) {
    (loops.get(section) || []).forEach((a) => { try { a.cancel(); } catch (_) {} });
    loops.delete(section);
  }

  function enter(section) {
    const title = section.querySelector('.impact-title');
    play(title,[{transform:'translateY(20px) scale(.98)'},{transform:'translateY(0) scale(1)'}],{duration:620});

    if (section.id === 'impact-price') {
      const old = section.querySelector('.impact-price-old');
      const direct = section.querySelector('.impact-price-direct');
      const diff = section.querySelector('.impact-diff');
      play(old,[{transform:'translateX(-28px) rotate(-1deg)'},{transform:'translateX(0) rotate(0)'}],{duration:620,delay:90});
      play(direct,[{transform:'translateX(28px) rotate(1deg) scale(.96)'},{transform:'translateX(0) rotate(0) scale(1)'}],{duration:680,delay:190});
      play(diff,[{transform:'scale(.86)'},{transform:'scale(1.055)',offset:.72},{transform:'scale(1)'}],{duration:760,delay:420,easing:'cubic-bezier(.18,.9,.3,1.18)'});
      addLoop(section,direct,[{transform:'translateY(0)'},{transform:'translateY(-6px)'},{transform:'translateY(0)'}],2500,500);
      addLoop(section,diff.querySelector('strong'),[{transform:'scale(1)'},{transform:'scale(1.055)'},{transform:'scale(1)'}],1800,250);
    }

    if (section.id === 'impact-same') {
      const rows = $$('.impact-same-row',section); stagger(rows,'x',22,85);
      rows.forEach((row,i)=>addLoop(section,row.querySelector('.impact-check'),[{transform:'scale(1)'},{transform:'scale(1.12)'},{transform:'scale(1)'}],2100,i*170));
      const change = section.querySelector('.impact-only-change');
      play(change,[{transform:'translateY(22px) scale(.96)'},{transform:'translateY(0) scale(1)'}],{duration:620,delay:420});
    }

    if (section.id === 'impact-cost') {
      const lines = $$('.impact-cost-line',section); stagger(lines,'y',18,80);
      lines.forEach((line,i)=>{
        const plus=line.querySelector('span');
        play(plus,[{transform:'rotate(-90deg) scale(.75)'},{transform:'rotate(0) scale(1.1)',offset:.72},{transform:'rotate(0) scale(1)'}],{duration:520,delay:150+i*90});
      });
      play(section.querySelector('.impact-cost-result'),[{transform:'scale(.94)'},{transform:'scale(1)'}],{duration:620,delay:450});
    }

    if (section.id === 'impact-guide') {
      const steps = $$('.impact-route-step',section); stagger(steps,'y',16,90);
      steps.forEach((step,i)=>addLoop(section,step.querySelector('b'),[{transform:'scale(1)'},{transform:'scale(1.1)'},{transform:'scale(1)'}],2300,i*180));
    }

    if (section.id === 'impact-med') {
      const stops = $$('.impact-med-stop',section); stagger(stops,'x',18,75);
      const bottom = section.querySelector('.impact-med-bottom');
      play(bottom,[{transform:'translateY(20px) scale(.97)'},{transform:'translateY(0) scale(1)'}],{duration:620,delay:stops.length*70});
      stops.forEach((stop,i)=>addLoop(section,stop,[{transform:'translateX(0)'},{transform:`translateX(${i%2?2:-2}px)`},{transform:'translateX(0)'}],2800,i*140));
    }
  }

  function init() {
    const sections = ['#impact-price','#impact-same','#impact-cost','#impact-guide','#impact-med'].map((s)=>document.querySelector(s)).filter(Boolean);
    if (!sections.length) return false;
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        const section=entry.target;
        if(entry.isIntersecting && entry.intersectionRatio>=.16){
          if(!active.has(section)){active.add(section);enter(section);}
        }else if(active.has(section)){
          active.delete(section);stop(section);
        }
      });
    },{threshold:[0,.16,.4],rootMargin:'-3% 0px -8% 0px'});
    sections.forEach((section)=>observer.observe(section));
    return true;
  }

  let tries=0;
  const timer=setInterval(()=>{tries+=1;if(init()||tries>25)clearInterval(timer);},180);
})();
