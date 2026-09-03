(() => {
  'use strict';

  const ITEMS = [
    {
      label: '아시아 크루즈',
      url: 'https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/fvmk2pzl5lazua8vnuef.png'
    },
    {
      label: '디즈니 크루즈',
      url: 'https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/j4ippct6ag07tqpifkbj.png'
    },
    {
      label: '지중해 크루즈',
      url: 'https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/pevn5zoo2fsnxzmqxmh9.png'
    },
    {
      label: '북유럽 크루즈',
      url: 'https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/jhtcfifjkiuvkinguj64.png'
    }
  ];

  function installStyles() {
    if (document.getElementById('mx-cruise-example-images-style')) return;

    const style = document.createElement('style');
    style.id = 'mx-cruise-example-images-style';
    style.textContent = `
      #mx-cruise-price-examples .mx10p-price-grid{
        align-items:stretch!important;
      }

      #mx-cruise-price-examples .mx10p-price-item{
        min-height:0!important;
        padding:16px 12px 28px!important;
        justify-content:flex-start!important;
        overflow:hidden!important;
      }

      #mx-cruise-price-examples .mx10p-photo{
        position:relative!important;
        width:100%!important;
        aspect-ratio:1122 / 1402!important;
        margin:0 0 22px!important;
        border-radius:22px!important;
        overflow:hidden!important;
        background:#e9eff6!important;
        box-shadow:0 16px 38px rgba(11,23,41,.12)!important;
        transform-origin:50% 70%!important;
        isolation:isolate!important;
      }

      #mx-cruise-price-examples .mx10p-photo::after{
        content:""!important;
        position:absolute!important;
        inset:0!important;
        pointer-events:none!important;
        border:1px solid rgba(255,255,255,.34)!important;
        border-radius:inherit!important;
        box-shadow:inset 0 -54px 72px rgba(5,20,44,.08)!important;
        z-index:2!important;
      }

      #mx-cruise-price-examples .mx10p-photo img{
        display:block!important;
        width:100%!important;
        height:100%!important;
        object-fit:cover!important;
        object-position:center!important;
        transform:scale(1.035)!important;
        transition:transform .85s cubic-bezier(.16,1,.3,1),filter .7s ease!important;
        will-change:transform,filter!important;
      }

      #mx-cruise-price-examples .mx10p-price-item>span{
        margin-top:0!important;
      }

      html.membership-motion-enabled #mx-cruise-price-examples.m-motion-section:not(.section-active) .mx10p-photo{
        opacity:0!important;
        transform:translateY(38px) scale(.92)!important;
        clip-path:inset(12% 0 12% 0 round 22px)!important;
        filter:blur(5px)!important;
      }

      html.membership-motion-enabled #mx-cruise-price-examples.m-motion-section.section-active .mx10p-photo{
        opacity:1!important;
        transform:none!important;
        clip-path:inset(0 0 0 0 round 22px)!important;
        filter:none!important;
        transition:
          opacity .68s ease,
          transform 1.02s cubic-bezier(.16,1,.3,1),
          clip-path .94s cubic-bezier(.16,1,.3,1),
          filter .68s ease!important;
        transition-delay:var(--mx-photo-delay,180ms)!important;
      }

      html.membership-motion-enabled #mx-cruise-price-examples.m-motion-section:not(.section-active) .mx10p-photo img{
        transform:scale(1.13)!important;
        filter:saturate(.82) brightness(.9)!important;
      }

      html.membership-motion-enabled #mx-cruise-price-examples.m-motion-section.section-active .mx10p-photo img{
        transform:scale(1)!important;
        filter:none!important;
        transition:transform 1.55s cubic-bezier(.16,1,.3,1),filter .9s ease!important;
        transition-delay:calc(var(--mx-photo-delay,180ms) + 70ms)!important;
      }

      @media(hover:hover) and (pointer:fine){
        #mx-cruise-price-examples .mx10p-price-item:hover .mx10p-photo img{
          transform:scale(1.045)!important;
        }
      }

      @media(max-width:780px){
        #mx-cruise-price-examples .mx10p-price-item{
          padding:10px 8px 22px!important;
        }
        #mx-cruise-price-examples .mx10p-photo{
          margin-bottom:15px!important;
          border-radius:15px!important;
          box-shadow:0 10px 24px rgba(11,23,41,.11)!important;
        }
        html.membership-motion-enabled #mx-cruise-price-examples.m-motion-section:not(.section-active) .mx10p-photo{
          transform:translateY(24px) scale(.94)!important;
          clip-path:inset(10% 0 10% 0 round 15px)!important;
        }
        html.membership-motion-enabled #mx-cruise-price-examples.m-motion-section.section-active .mx10p-photo{
          clip-path:inset(0 0 0 0 round 15px)!important;
        }
      }

      @media(prefers-reduced-motion:reduce){
        #mx-cruise-price-examples .mx10p-photo,
        #mx-cruise-price-examples .mx10p-photo img{
          opacity:1!important;
          transform:none!important;
          filter:none!important;
          clip-path:none!important;
          transition:none!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function mountImages() {
    const section = document.getElementById('mx-cruise-price-examples');
    if (!section) return false;

    const cards = [...section.querySelectorAll('.mx10p-price-item')];
    if (cards.length < ITEMS.length) return false;

    cards.slice(0, ITEMS.length).forEach((card, index) => {
      if (card.querySelector('.mx10p-photo')) return;

      const item = ITEMS[index];
      const photo = document.createElement('div');
      photo.className = 'mx10p-photo';
      photo.style.setProperty('--mx-photo-delay', `${150 + index * 115}ms`);

      const img = document.createElement('img');
      img.src = item.url;
      img.alt = `${item.label} 예시 이미지`;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 1122;
      img.height = 1402;

      photo.appendChild(img);
      card.insertBefore(photo, card.firstChild);
    });

    return true;
  }

  function init() {
    installStyles();
    if (mountImages()) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (mountImages() || tries >= 60) window.clearInterval(timer);
    }, 120);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
