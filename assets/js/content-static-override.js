(function () {
  const source = window.MOCK_BOOTSTRAP_DATA || {};
  const newItems = [
    {
      content_id: 'cruise-wifi-guide',
      title: '크루즈 와이파이 꼭 해야 할까? 인터넷 패키지 선택 기준',
      category: '여행팁',
      summary: '크루즈 와이파이 패키지가 필요한 경우와 굳이 필요하지 않은 경우를 항해일, 기항지, 사용 목적 기준으로 정리했습니다.',
      thumbnail_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop',
      link_url: '/blog/cruise-wifi-guide/',
      tag_text: '크루즈와이파이',
      published_at: '2026-07-10'
    }
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
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, '&#96;');
  }

  function getMoreWrap() {
    let wrap = section.querySelector('[data-content-more-wrap]');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.setAttribute('data-content-more-wrap', '');
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

    return `
      <article class="sheet-extra-card">
        ${thumb ? `<div class="sheet-extra-media"><img src="${thumb}" alt="${escapeAttribute(item.title || '')}" loading="lazy" /></div>` : ''}
        <div class="sheet-extra-chip">${category}</div>
        <h3>${title}</h3>
        ${summary ? `<p>${summary}</p>` : ''}
        <div class="sheet-extra-action">
          ${tag ? `<span class="sheet-extra-inline-tag">${tag}</span>` : '<span></span>'}
          <a href="${link}" class="btn">자세히 보기</a>
        </div>
      </article>
    `.trim();
  }

  function renderStaticContent() {
    if (isRendering) return;
    isRendering = true;
    section.style.display = '';

    const safeCount = Math.max(window.innerWidth <= 768 ? 4 : 3, visibleCount);
    const items = staticItems.slice(0, safeCount);
    grid.innerHTML = items.map(buildCard).join('');

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
      if (pendingRender) {
        pendingRender = false;
        renderStaticContent();
      }
    }, 0);
  }

  document.addEventListener('click', function (event) {
    const moreButton = event.target.closest('[data-static-content-more]');
    if (!moreButton) return;
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

  observer.observe(grid, { childList: true, subtree: false });
  renderStaticContent();
})();
