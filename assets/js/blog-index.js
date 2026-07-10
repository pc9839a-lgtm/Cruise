(function () {
  const blogGrid = document.getElementById('blogGrid');
  const blogEmptyState = document.getElementById('blogEmptyState');
  const blogResultsCount = document.getElementById('blogResultsCount');
  const blogActiveFilterText = document.getElementById('blogActiveFilterText');
  const blogSearchInput = document.getElementById('blogSearchInput');
  const filterRow = document.querySelector('.blog-filter-row');

  if (!blogGrid) return;

  const DATE_BY_SLUG = {
    'cruise-drink-package-comparison': '2026.05.20',
    'cruise-balcony-cabin-guide': '2026.05.17',
    'best-first-cruise-destinations-for-koreans': '2026.05.14',
    'first-cruise-guide': '2026.04.08',
    'cruise-cost-breakdown': '2026.04.07',
    'departure-checklist': '2026.04.08',
    'cruise-vs-package-tour': '2026.04.08',
    'cabin-type-comparison': '2026.04.08',
    'extra-cruise-costs': '2026.04.08',
    'cruise-packing-by-season': '2026.04.08',
    'cruise-boarding-process': '2026.04.08',
    'shore-excursion-guide': '2026.04.08',
    'cruise-seasick-tips': '2026.04.08',
    'cruise-dining-guide': '2026.04.08',
    'cruise-passport-documents-check': '2026.04.08',
    'first-cruise-common-mistakes': '2026.04.08'
  };

  const state = {
    activeCategory: 'all',
    keyword: '',
    items: []
  };

  init();

  function init() {
    bindEvents();
    state.items = extractItemsFromDom();
    renderCategoryButtons(state.items);
    syncFilterButtons();
    update();
  }

  function bindEvents() {
    if (blogSearchInput) {
      blogSearchInput.addEventListener('input', function (event) {
        state.keyword = normalizeText(event.target.value || '');
        update();
      });
    }

    if (filterRow) {
      filterRow.addEventListener('click', function (event) {
        const button = event.target.closest('[data-category]');
        if (!button) return;
        state.activeCategory = String(button.getAttribute('data-category') || 'all').trim();
        syncFilterButtons();
        update();
      });
    }
  }

  function renderCategoryButtons(items) {
    if (!filterRow) return;

    const seen = new Set();
    const categories = [];

    items.forEach(function (item) {
      const category = String(item.category || '').trim();
      if (!category || seen.has(category)) return;
      seen.add(category);
      categories.push(category);
    });

    const currentCategory = state.activeCategory;

    filterRow.innerHTML = [
      '<button type="button" class="blog-filter-btn" data-category="all">전체</button>'
    ].concat(
      categories.map(function (category) {
        return '<button type="button" class="blog-filter-btn" data-category="' + escapeAttribute(category) + '">' + escapeHtml(category) + '</button>';
      })
    ).join('');

    const hasCurrent = currentCategory === 'all' || categories.some(function (category) {
      return normalizeText(category) === normalizeText(currentCategory);
    });

    state.activeCategory = hasCurrent ? currentCategory : 'all';
  }

  function update() {
    const filteredItems = state.items.filter(function (item) {
      return matchesItemCategory(item) && matchesItemKeyword(item);
    });

    renderCards(filteredItems);

    if (blogResultsCount) blogResultsCount.textContent = String(filteredItems.length);
    if (blogEmptyState) blogEmptyState.style.display = filteredItems.length === 0 ? 'block' : 'none';

    if (blogActiveFilterText) {
      const activeButton = filterRow ? filterRow.querySelector('[data-category].is-active') : null;
      blogActiveFilterText.textContent = activeButton ? String(activeButton.textContent || '전체').trim() : '전체';
    }
  }

  function extractItemsFromDom() {
    return Array.from(blogGrid.querySelectorAll('.blog-card')).map(function (card) {
      const coverLink = card.querySelector('.blog-card-cover');
      const image = card.querySelector('.blog-card-cover img');
      const titleLink = card.querySelector('.blog-card-title a');
      const dateNode = card.querySelector('.blog-card-date');
      const linkUrl = titleLink
        ? String(titleLink.getAttribute('href') || '').trim()
        : (coverLink ? String(coverLink.getAttribute('href') || '').trim() : '');
      const slug = extractSlug(linkUrl);
      const dateText = sanitizeDateText(dateNode ? String(dateNode.textContent || '').trim() : '') || DATE_BY_SLUG[slug] || '';

      return {
        category: String(card.dataset.category || '').trim(),
        title: String(card.dataset.title || (titleLink ? titleLink.textContent : '') || '').trim(),
        summary: String(card.dataset.summary || '').trim(),
        thumbnail_url: image ? String(image.getAttribute('src') || '').trim() : '',
        link_url: linkUrl,
        tag_text: String(card.dataset.tags || '').trim(),
        date_text: dateText
      };
    }).filter(function (item) {
      return !!(item.title && item.link_url);
    });
  }

  function renderCards(items) {
    blogGrid.innerHTML = items.map(buildCardHtml).join('');
  }

  function buildCardHtml(item) {
    const safeTitle = escapeHtml(item.title);
    const safeSummary = escapeHtml(item.summary);
    const safeCategory = escapeHtml(item.category || '콘텐츠');
    const safeLink = escapeAttribute(item.link_url);
    const safeThumb = escapeAttribute(item.thumbnail_url);
    const safeTags = escapeAttribute(item.tag_text);
    const safeDate = escapeHtml(item.date_text || '');
    const dateStyle = item.date_text ? '' : ' style="visibility:hidden;"';

    return [
      '<article class="blog-card"',
      ' data-category="' + escapeAttribute(item.category) + '"',
      ' data-title="' + escapeAttribute(item.title) + '"',
      ' data-summary="' + escapeAttribute(item.summary) + '"',
      ' data-tags="' + safeTags + '">',
      safeThumb
        ? '<a class="blog-card-cover" href="' + safeLink + '"><img src="' + safeThumb + '" alt="' + escapeAttribute(item.title) + '" loading="lazy" /></a>'
        : '<a class="blog-card-cover" href="' + safeLink + '"></a>',
      '<div class="blog-card-body">',
      '<div class="blog-card-topline">',
      '<span class="blog-card-category">' + safeCategory + '</span>',
      '<span class="blog-card-date"' + dateStyle + '>' + safeDate + '</span>',
      '</div>',
      '<h2 class="blog-card-title"><a href="' + safeLink + '">' + safeTitle + '</a></h2>',
      '<p class="blog-card-summary">' + safeSummary + '</p>',
      '<div class="blog-card-actions"><a class="blog-card-link" href="' + safeLink + '">자세히 보기</a></div>',
      '</div>',
      '</article>'
    ].join('');
  }

  function syncFilterButtons() {
    if (!filterRow) return;
    const buttons = filterRow.querySelectorAll('[data-category]');
    buttons.forEach(function (button) {
      const category = String(button.getAttribute('data-category') || '').trim();
      button.classList.toggle('is-active', normalizeText(category) === normalizeText(state.activeCategory));
    });
  }

  function matchesItemCategory(item) {
    if (normalizeText(state.activeCategory) === 'all') return true;
    return normalizeText(item.category) === normalizeText(state.activeCategory);
  }

  function matchesItemKeyword(item) {
    if (!state.keyword) return true;
    const haystack = normalizeText([item.title || '', item.summary || '', item.tag_text || '', item.category || ''].join(' '));
    return haystack.indexOf(state.keyword) >= 0;
  }

  function extractSlug(url) {
    const text = String(url || '').trim();
    const match = text.match(/\/blog\/([^/?#]+)\/?/i);
    return match ? decodeURIComponent(match[1]) : '';
  }

  function sanitizeDateText(value) {
    const text = String(value || '').trim();
    if (!text || text === '0000.00.00' || text === '0000-00-00') return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text.replace(/-/g, '.');
    return text;
  }

  function normalizeText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

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
})();
