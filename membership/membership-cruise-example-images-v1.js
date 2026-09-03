(() => {
  'use strict';

  /* The supplied artwork already contains cruise name + price.
     Asia and Mediterranean artwork were previously mapped in reverse. */
  const ITEMS = [
    {
      label: '아시아 크루즈',
      url: 'https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/pevn5zoo2fsnxzmqxmh9.png'
    },
    {
      label: '디즈니 크루즈',
      url: 'https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/j4ippct6ag07tqpifkbj.png'
    },
    {
      label: '지중해 크루즈',
      url: 'https://res.cloudinary.com/dwz5e6lsq/image/upload/v1788413591/fvmk2pzl5lazua8vnuef.png'
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
        display:grid!important;
        grid-template-columns:repeat(4,minmax(0,1fr))!important;
        gap:18px!important;
        width:min(1180px,100%)!important;
        margin:44px auto 0!important;
        border:0!important;
        align-items:stretch!important;
      }
      #mx-cruise-price-examples .mx10p-price-item{
        display:block!important;
        min-height:0!important;
        padding:0!important;
        border:0!important;
        background:transparent!important;
        overflow:visible!important;
      }
      #mx-cruise-price-examples .mx10p-photo{
        position:relative!important;
        width:100%!important;
        aspect-ratio:1122 / 1402!important;
        margin:0!important;
        border-radius:24px!important;
        overflow:hidden!important;
        background:#e9eff6!important;
        box-shadow:0 18px 48px rgba(11,23,41,.13)!important;
        transform-origin:50% 70%!important;
        isolation:isolate!important;
        scroll-snap-align:center!important;
      }
      #mx-cruise-price-examples .mx10p-photo::after{
        content:""!important;
        position:absolute!important;
        inset:0!important;
        pointer-events:none!important;
        border:1px solid rgba(255,255,255,.4)!important;
        border-radius:inherit!important;
        z-index:2!important;
      }
      #mx-cruise-price-examples .mx10p-photo img{
        display:block!important;
        width:100%!important;
        height:100%!important;
        object-fit:cover!important;
        object-position:center!important;
        transform:scale(1.02)!important;
        transition:transform .9s cubic-bezier(.16,1,.3,1),filter .7s ease!important;
        will-change:transform,filter!important;
      }
      html.membership-motion-enabled #mx-cruise-price-examples.m-motion-section:not(.section-active) .mx10p-photo{
        opacity:0!important;
        transform:translateY(34px) scale(.94)!important;
        filter:blur(5px)!important;
      }
      html.membership-motion-enabled #mx-cruise-price-examples.m-motion-section.section-active .mx10p-photo{
        opacity:1!important;
        transform:none!important;
        filter:none!important;
        transition:opacity .68s ease,transform 1s cubic-bezier(.16,1,.3,1),filter .68s ease!important;
        transition-delay:var(--mx-photo-delay,160ms)!important;
      }
      html.membership-motion-enabled #mx-cruise-price-examples.m-motion-section:not(.section-active) .mx10p-photo img{
        transform:scale(1.11)!important;
        filter:saturate(.84) brightness(.91)!important;
      }
      html.membership-motion-enabled #mx-cruise-price-examples.m-motion-section.section-active .mx10p-photo img{
        transform:scale(1)!important;
        filter:none!important;
        transition:transform 1.5s cubic-bezier(.16,1,.3,1),filter .9s ease!important;
        transition-delay:calc(var(--mx-photo-delay,160ms) + 60ms)!important;
      }
      @media(hover:hover) and (pointer:fine){
        #mx-cruise-price-examples .mx10p-price-item:hover .mx10p-photo img{transform:scale(1.035)!important}
      }
      @media(max-width:780px){
        #mx-cruise-price-examples{overflow:hidden!important}
        #mx-cruise-price-examples .mx10p-price-grid{
          display:flex!important;
          width:auto!important;
          gap:14px!important;
          margin:34px -18px 0!important;
          padding:4px 18px 24px!important;
          overflow-x:auto!important;
          scroll-snap-type:x mandatory!important;
          scroll-padding-inline:18px!important;
          -webkit-overflow-scrolling:touch!important;
          scrollbar-width:none!important;
        }
        #mx-cruise-price-examples .mx10p-price-grid::-webkit-scrollbar{display:none!important}
        #mx-cruise-price-examples .mx10p-price-item{
          flex:0 0 min(78vw,350px)!important;
          width:min(78vw,350px)!important;
          scroll-snap-align:center!important;
        }
        #mx-cruise-price-examples .mx10p-photo{
          border-radius:20px!important;
          box-shadow:0 14px 34px rgba(11,23,41,.12)!important;
        }
      }
      @media(prefers-reduced-motion:reduce){
        #mx-cruise-price-examples .mx10p-photo,
        #mx-cruise-price-examples .mx10p-photo img{
          opacity:1!important;transform:none!important;filter:none!important;transition:none!important
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
      const item = ITEMS[index];
      card.innerHTML = '';

      const photo = document.createElement('div');
      photo.className = 'mx10p-photo';
      photo.style.setProperty('--mx-photo-delay', `${150 + index * 105}ms`);

      const img = document.createElement('img');
      img.src = item.url;
      img.alt = `${item.label} 가격 예시`;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 1122;
      img.height = 1402;

      photo.appendChild(img);
      card.appendChild(photo);
    });

    /* Artwork already carries name/price, so old text below it is duplicate. */
    section.querySelector('.mx10p-note')?.remove();
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

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
