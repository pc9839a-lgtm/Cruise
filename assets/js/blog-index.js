(function () {
  const blogGrid = document.getElementById('blogGrid');
  const blogEmptyState = document.getElementById('blogEmptyState');
  const blogResultsCount = document.getElementById('blogResultsCount');
  const blogActiveFilterText = document.getElementById('blogActiveFilterText');
  const blogSearchInput = document.getElementById('blogSearchInput');
  const filterRow = document.querySelector('.blog-filter-row');

  if (!blogGrid) return;

  const state = {
    activeCategory: 'all',
    keyword: '',
    items: []
  };

  init();

  async function init() {
    bindEvents();

    state.items = extractItemsFromDom();
    renderCategoryButtons(state.items);
    syncFilterButtons();
    update();

    await hydrateFromRemote();

    if (!state.items.length) {
      state.items = extractItemsFromDom();
    }

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

  async function hydrateFromRemote() {
    const apiUrl = getApiUrl();
    if (!apiUrl) return;

    const cacheKey = 'cruise_blog_runtime_items_v3';
    const cacheTtlMs = 5 * 60 * 1000;

    try {
      const cachedRaw = sessionStorage.getItem(cacheKey);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        if (cached && Array.isArray(cached.items) && Date.now() - Number(cached.savedAt || 0) < cacheTtlMs) {
          state.items = cached.items;
          return;
        }
      }
    } catch (error) {}

    try {
      const payload = await jsonpRequest(apiUrl, {
        action: 'blog_index',
        _ts: Date.now()
      });

      const items = normalizeItems(
        (payload && payload.posts) ||
        (payload && payload.content_links)
      );

      if (!items.length) return;

      state.items = items;

      try {
        sessionStorage.setItem(cacheKey, JSON.stringify({
          savedAt: Date.now(),
          items: items
        }));
      } catch (error) {}
    } catch (error) {
      console.error('[blog-index] remote content load failed:', error);
    }
  }

  function getApiUrl() {
    const candidates = [
      window.CRUISE_DATA_API_URL,
      getMetaContent('cruise-data-api-url'),
      document.body ? document.body.getAttribute('data-cruise-api-url') : '',
      document.documentElement ? document.documentElement.getAttribute('data-cruise-api-url') : ''
    ];

    for (let i = 0; i < candidates.length; i += 1) {
      const value = sanitizeApiUrl(candidates[i]);
      if (value) return value;
    }

    return '';
  }

  function getMetaContent(name) {
    const node = document.querySelector('meta[name="' + name + '"]');
    return node ? node.getAttribute('content') : '';
  }

  function sanitizeApiUrl(value) {
    const text = String(value || '').trim();
    if (!text) return '';
    if (/^__.+__$/.test(text)) return '';
    if (/YOUR_|YOUR-|REPLACE/i.test(text)) return '';
    if (!/^https?:\/\//i.test(text)) return '';
    return text;
  }

  function jsonpRequest(baseUrl, params) {
    return new Promise(function (resolve, reject) {
      const callbackName = '__cruiseBlogJsonp_' + Date.now() + '_' + Math.random().toString(36).slice(2);
      const script = document.createElement('script');
      const timeoutMs = 8000;
      let done = false;
      let timeoutId = null;

      function cleanup() {
        if (timeoutId) window.clearTimeout(timeoutId);
        if (script.parentNode) script.parentNode.removeChild(script);
        try {
          delete window[callbackName];
        } catch (error) {
          window[callbackName] = undefined;
        }
      }

      window[callbackName] = function (payload) {
        if (done) return;
        done = true;
        cleanup();
        resolve(payload);
      };

      script.async = true;
      script.src = appendQuery(baseUrl, Object.assign({}, params, { callback: callbackName }));
      script.onerror = function () {
        if (done) return;
        done = true;
        cleanup();
        reject(new Error('요청 실패'));
      };

      timeoutId = window.setTimeout(function () {
        if (done) return;
        done = true;
        cleanup();
        reject(new Error('응답 시간 초과'));
      }, timeoutMs);

      document.head.appendChild(script);
    });
  }

  function appendQuery(url, params) {
    const query = Object.keys(params || {})
      .filter(function (key) {
        return params[key] !== undefined && params[key] !== null && params[key] !== '';
      })
      .map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(String(params[key]));
      })
      .join('&');

    if (!query) return url;
    return url + (url.indexOf('?') >= 0 ? '&' : '?') + query;
  }

  function normalizeItems(list) {
    if (!Array.isArray(list)) return [];

    return list
      .map(function (item) {
        return {
          category: String(item && item.category || '').trim(),
          title: String(item && item.title || '').trim(),
          summary: String(item && item.summary || '').trim(),
          thumbnail_url: appendImageBust(String(item && item.thumbnail_url || '').trim()),
          link_url: String(item && item.link_url || '').trim(),
          tag_text: String(item && item.tag_text || '').trim(),
          date_text: formatDateText(
            item && (
              item.publish_date ||
              item.published_date ||
              item.date ||
              item.created_at ||
              item.updated_at
            )
          )
        };
      })
      .filter(function (item) {
        return !!(item.title && item.link_url);
      });
  }

  function extractItemsFromDom() {
    return Array.from(blogGrid.querySelectorAll('.blog-card')).map(function (card) {
      const coverLink = card.querySelector('.blog-card-cover');
      const image = card.querySelector('.blog-card-cover img');
      const titleLink = card.querySelector('.blog-card-title a');
      const dateNode = card.querySelector('.blog-card-date');

      return {
        category: String(card.dataset.category || '').trim(),
        title: String(card.dataset.title || (titleLink ? titleLink.textContent : '') || '').trim(),
        summary: String(card.dataset.summary || '').trim(),
        thumbnail_url: image ? String(image.getAttribute('src') || '').trim() : '',
        link_url: titleLink
          ? String(titleLink.getAttribute('href') || '').trim()
          : (coverLink ? String(coverLink.getAttribute('href') || '').trim() : ''),
        tag_text: String(card.dataset.tags || '').trim(),
        date_text: sanitizeDateText(dateNode ? String(dateNode.textContent || '').trim() : '')
      };
    }).filter(function (item) {
      return !!(item.title && item.link_url);
    });
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

    if (blogResultsCount) {
      blogResultsCount.textContent = String(filteredItems.length);
    }

    if (blogEmptyState) {
      blogEmptyState.style.display = filteredItems.length === 0 ? 'block' : 'none';
    }

    if (blogActiveFilterText) {
      const activeButton = filterRow ? filterRow.querySelector('[data-category].is-active') : null;
      blogActiveFilterText.textContent = activeButton
        ? String(activeButton.textContent || '전체').trim()
        : '전체';
    }
  }

  function renderCards(items) {
    blogGrid.innerHTML = items.map(function (item) {
      return buildCardHtml(item);
    }).join('');
  }

  function buildCardHtml(item) {
    const safeTitle = escapeHtml(item.title);
    const safeSummary = escapeHtml(item.summary);
    const safeCategory = escapeHtml(item.category);
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
      '<div class="blog-card-actions">',
      '<a class="blog-card-link" href="' + safeLink + '">자세히 보기</a>',
      '</div>',
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

    const haystack = normalizeText([
      item.title || '',
      item.summary || '',
      item.tag_text || '',
      item.category || ''
    ].join(' '));

    return haystack.indexOf(state.keyword) >= 0;
  }

  function normalizeText(value) {
    return String(value || '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function sanitizeDateText(value) {
    const text = String(value || '').trim();
    if (!text) return '';
    if (text === '0000.00.00' || text === '0000-00-00') return '';
    return text;
  }

  function formatDateText(value) {
    const text = sanitizeDateText(String(value || '').trim());
    if (!text) return '';

    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
      return text.replace(/-/g, '.');
    }

    if (/^\d{4}\.\d{2}\.\d{2}$/.test(text)) {
      return text;
    }

    const match = text.match(/(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
    if (!match) return text;

    return [
      match[1],
      String(match[2]).padStart(2, '0'),
      String(match[3]).padStart(2, '0')
    ].join('.');
  }

  function appendImageBust(url) {
    const safeUrl = String(url || '').trim();
    if (!safeUrl) return '';
    return safeUrl;
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
