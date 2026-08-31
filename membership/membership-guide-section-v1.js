(() => {
  'use strict';

  const section = document.querySelector('#guide-question');
  if (!section) return;

  const kicker = section.querySelector('.mv2-kicker');
  const title = section.querySelector('.mv2-title');
  const steps = [...section.querySelectorAll('.mv2-step')];
  const sub = section.querySelector('.mv2-sub');

  if (kicker) kicker.textContent = '가이드 없이';
  if (title) title.innerHTML = '<span>처음 타는 크루즈</span><strong>5장면이면 끝</strong>';

  const labels = ['항구 도착', '승선', '선내', '기항지', '귀항'];
  steps.forEach((step, index) => {
    step.innerHTML = `<b>${String(index + 1).padStart(2, '0')}</b><span>${labels[index] || ''}</span>`;
  });

  if (sub) sub.remove();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.gsap || !window.ScrollTrigger || !steps.length) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  section.classList.add('guide-motion-ready');

  const entranceTargets = [kicker, title, ...steps].filter(Boolean);
  entranceTargets.forEach((el) => el.classList.add('guide-gsap-ready'));

  gsap.from(entranceTargets, {
    scrollTrigger: {
      trigger: section,
      start: 'top 78%',
      once: true
    },
    y: 28,
    opacity: 0,
    scale: .985,
    duration: .68,
    stagger: .075,
    ease: 'power3.out',
    clearProps: 'transform,opacity'
  });

  const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: .8 });

  steps.forEach((step) => {
    const num = step.querySelector('b');
    const label = step.querySelector('span');

    loop
      .to(step, {
        opacity: 1,
        y: -6,
        scale: 1.025,
        duration: .34,
        ease: 'power2.out'
      })
      .to(num, {
        color: '#85d2ff',
        duration: .28,
        ease: 'power2.out'
      }, '<')
      .to(label, {
        color: '#ffffff',
        duration: .28,
        ease: 'power2.out'
      }, '<')
      .to({}, { duration: .42 })
      .to(step, {
        opacity: .38,
        y: 0,
        scale: 1,
        duration: .3,
        ease: 'power2.inOut'
      })
      .to(num, {
        color: 'rgba(133,210,255,.36)',
        duration: .28,
        ease: 'power2.inOut'
      }, '<')
      .to(label, {
        color: 'rgba(255,255,255,.70)',
        duration: .28,
        ease: 'power2.inOut'
      }, '<');
  });

  const titleStrong = title?.querySelector('strong');
  if (titleStrong) {
    loop
      .to(titleStrong, { scale: 1.025, duration: .34, ease: 'power2.out' })
      .to(titleStrong, { scale: 1, duration: .45, ease: 'expo.out' });
  }

  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter: () => loop.restart(),
    onEnterBack: () => loop.restart(),
    onLeave: () => loop.pause(),
    onLeaveBack: () => loop.pause()
  });
})();
