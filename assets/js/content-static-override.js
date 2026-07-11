(function () {
  const source = window.MOCK_BOOTSTRAP_DATA || {};
  const newItems = [
    { content_id:'cruise-onboard-medical-center-guide', title:'크루즈에서 아프면 어떻게 할까? 선내 의무실·약 준비 가이드', category:'여행팁', summary:'크루즈 여행 중 몸이 아플 때 선내 의무실을 이용하는 방법, 진료 범위와 비용, 여행자보험 서류, 상비약과 복용약 준비 기준을 정리했습니다.', thumbnail_url:'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600&auto=format&fit=crop', link_url:'/blog/cruise-onboard-medical-center-guide/', tag_text:'크루즈의무실', published_at:'2026-07-12' },
    { content_id:'cruise-muster-drill-guide', title:'크루즈 비상훈련은 꼭 해야 할까? 머스터 드릴 참여 방법', category:'탑승절차', summary:'크루즈 승선 후 진행하는 머스터 드릴의 의미, 비상 집결 장소 확인법, 디지털 안전교육과 현장 확인 절차를 정리했습니다.', thumbnail_url:'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop', link_url:'/blog/cruise-muster-drill-guide/', tag_text:'머스터드릴', published_at:'2026-07-12' },
    { content_id:'cruise-cabin-outlet-charging-guide', title:'크루즈 객실 콘센트는 몇 개일까? 충전기·어댑터 준비법', category:'준비물', summary:'크루즈 객실의 콘센트와 USB 포트는 선박마다 다릅니다. 충전기, 어댑터, 보조배터리, 멀티탭을 준비할 때 확인할 기준을 정리했습니다.', thumbnail_url:'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1600&auto=format&fit=crop', link_url:'/blog/cruise-cabin-outlet-charging-guide/', tag_text:'크루즈콘센트', published_at:'2026-07-11' },
    { content_id:'cruise-laundry-guide', title:'크루즈 선내 세탁은 어떻게 하나요? 세탁실·세탁 서비스 이용법', category:'준비물', summary:'장기 크루즈에서 옷을 어떻게 세탁하는지 셀프 세탁실, 유료 세탁 서비스, 객실 건조 방법과 준비물을 정리했습니다.', thumbnail_url:'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1600&auto=format&fit=crop', link_url:'/blog/cruise-laundry-guide/', tag_text:'크루즈세탁', published_at:'2026-07-11' },
    { content_id:'cruise-travel-insurance-guide', title:'크루즈 여행자보험 필요할까? 해외여행 보험 체크 기준', category:'여행팁', summary:'크루즈 여행 전 여행자보험에서 확인할 의료비, 수하물, 일정 변경, 보장 제외 조건을 정리했습니다.', thumbnail_url:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop', link_url:'/blog/cruise-travel-insurance-guide/', tag_text:'여행자보험', published_at:'2026-07-10' },
    { content_id:'cruise-cabin-location-guide', title:'크루즈 객실 위치는 어디가 좋을까? 중앙·선수·선미 선택 기준', category:'선실비교', summary:'크루즈 객실 위치를 고를 때 중앙, 선수, 선미, 고층, 저층, 엘리베이터 근처 객실의 차이를 정리했습니다.', thumbnail_url:'https://images.unsplash.com/photo-1510132310763-2df322eed83f?q=80&w=1600&auto=format&fit=crop', link_url:'/blog/cruise-cabin-location-guide/', tag_text:'객실위치', published_at:'2026-07-10' },
    { content_id:'cruise-onboard-payment-guide', title:'크루즈 선상 결제는 어떻게 하나요? 승선카드와 보증금 이해하기', category:'비용비교', summary:'크루즈 승선카드, 선상 결제, 보증금, 현금·신용카드 등록 방식, 하선 전 정산까지 정리했습니다.', thumbnail_url:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop', link_url:'/blog/cruise-onboard-payment-guide/', tag_text:'선상결제', published_at:'2026-07-10' },
    { content_id:'cruise-sea-day-guide', title:'크루즈 해상일에는 뭐 할까? 배 안에서 보내는 하루', category:'초보가이드', summary:'기항지 없이 바다 위에서 보내는 해상일을 아침, 오후, 저녁 활동 기준으로 정리했습니다.', thumbnail_url:'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1600&auto=format&fit=crop', link_url:'/blog/cruise-sea-day-guide/', tag_text:'해상일', published_at:'2026-07-10' },
    { content_id:'cruise-luggage-guide', title:'크루즈 수하물·캐리어는 어떻게 맡길까?', category:'탑승절차', summary:'승선 전 캐리어 위탁, 객실 배송, 직접 들고 탈 가방 구성과 하선 전 짐 정리까지 정리했습니다.', thumbnail_url:'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop', link_url:'/blog/cruise-luggage-guide/', tag_text:'크루즈수하물', published_at:'2026-07-10' },
    { content_id:'cruise-dress-code-guide', title:'크루즈 복장·드레스코드 어떻게 준비할까?', category:'준비물', summary:'선내 복장, 저녁 식사 드레스코드, 포멀나이트, 수영장과 기항지 옷차림을 정리했습니다.', thumbnail_url:'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1600&auto=format&fit=crop', link_url:'/blog/cruise-dress-code-guide/', tag_text:'크루즈복장', published_at:'2026-07-10' },
    { content_id:'cruise-wifi-guide', title:'크루즈 와이파이 꼭 해야 할까? 인터넷 패키지 선택 기준', category:'여행팁', summary:'크루즈 와이파이 패키지가 필요한 경우와 굳이 필요하지 않은 경우를 항해일, 기항지, 사용 목적 기준으로 정리했습니다.', thumbnail_url:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop', link_url:'/blog/cruise-wifi-guide/', tag_text:'크루즈와이파이', published_at:'2026-07-10' }
  ];
  const baseItems = Array.isArray(source.content_links) ? source.content_links : [];
  const seen = new Set();
  const staticItems = newItems.concat(baseItems).filter(function (item) {
    const key = String(item.content_id || item.link_url || item.title || '').trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (!staticItems.length) return;

  const section = document.getElementById('contentSection');
  const grid = document.getElementById('contentGrid');
  if (!section || !grid) return;

  let visibleCount = window.innerWidth <= 768 ? 4 : 3;
  let isRendering = false;
  let pendingRender = false;

  function escapeHtml(value) {
    return String(value || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }
  function escapeAttribute(value) { return escapeHtml(value).replace(/`/g,'&#96;'); }
  function getMoreWrap() {
    let wrap = section.querySelector('[data-content-more-wrap]');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.setAttribute('data-content-more-wrap','');
      wrap.style.display = 'flex';
      wrap.style.justifyContent = 'center';
      wrap.style.marginTop = '20px';
      grid.insertAdjacentElement('afterend', wrap);
    }
    return wrap;
  }
  function buildCard(item) {
    const title = escapeHtml(item.title || '');
    const summary = escapeHtml(item.summary || '');
    const category = escapeHtml(item.category || '콘텐츠');
    const thumb = escapeAttribute(item.thumbnail_url || '');
    const link = escapeAttribute(item.link_url || '/blog/');
    const tag = escapeHtml(item.tag_text || '');
    return '<article class="sheet-extra-card">' + (thumb ? '<div class="sheet-extra-media"><img src="' + thumb + '" alt="' + escapeAttribute(item.title || '') + '" loading="lazy" /></div>' : '') + '<div class="sheet-extra-chip">' + category + '</div><h3>' + title + '</h3>' + (summary ? '<p>' + summary + '</p>' : '') + '<div class="sheet-extra-action">' + (tag ? '<span class="sheet-extra-inline-tag">' + tag + '</span>' : '<span></span>') + '<a href="' + link + '" class="btn">자세히 보기</a></div></article>';
  }
  function renderStaticContent() {
    if (isRendering) return;
    isRendering = true;
    section.style.display = '';
    const safeCount = Math.max(window.innerWidth <= 768 ? 4 : 3, visibleCount);
    grid.innerHTML = staticItems.slice(0, safeCount).map(buildCard).join('');
    const moreWrap = getMoreWrap();
    if (safeCount < staticItems.length) {
      moreWrap.innerHTML = '<button type="button" class="btn btn-secondary" data-static-content-more>더보기</button>';
      moreWrap.style.display = 'flex';
    } else {
      moreWrap.innerHTML = '';
      moreWrap.style.display = 'none';
    }
    window.setTimeout(function () {
      isRendering = false;
      if (pendingRender) { pendingRender = false; renderStaticContent(); }
    }, 0);
  }
  document.addEventListener('click', function (event) {
    const button = event.target.closest('[data-static-content-more]');
    if (!button) return;
    visibleCount += window.innerWidth <= 768 ? 3 : 6;
    renderStaticContent();
  });
  const observer = new MutationObserver(function () {
    if (isRendering) return;
    pendingRender = true;
    window.setTimeout(function () {
      if (!pendingRender || isRendering) return;
      pendingRender = false;
      renderStaticContent();
    }, 0);
  });
  observer.observe(grid, { childList:true, subtree:false });
  renderStaticContent();
})();