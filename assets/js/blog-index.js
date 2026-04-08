(function () {
  const blogGrid = document.getElementById('blogGrid');
  const blogEmptyState = document.getElementById('blogEmptyState');
  const blogResultsCount = document.getElementById('blogResultsCount');
  const blogActiveFilterText = document.getElementById('blogActiveFilterText');
  const blogSearchInput = document.getElementById('blogSearchInput');
  const filterRow = document.querySelector('.blog-filter-row');

  if (!blogGrid) return;

  const CLIENT_CACHE_KEY = 'cruise_blog_content_links_v2';
  const CLIENT_CACHE_TTL_MS = 60 * 1000;

  const state = {
    activeCategory: 'all',
    keyword: ''
  };

  init();

  async function init() {
    bindEvents();

    const cachedItems = getCachedItems();
    if (cachedItems.length) {
      renderCategoryButtons(cachedItems);
      renderCards(cachedItems);
      syncFilterButtons();
      update();
    }

    await hydrateFromRemote();
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

    try {
      const items = await loadContentItems(apiUrl);
      if (!items.length) return;

      setCachedItems(items);
      renderCategoryButtons(items);
      renderCards(items);
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

  async function loadContentItems(apiUrl) {
    const directPayload = await tryLoadContentLinks(apiUrl);
    const directItems = normalizeItems(directPayload && directPayload.content_links);
    if (directItems.length) return directItems;

    const fallbackPayload = await jsonpRequest(apiUrl, {
      action: 'bootstrap_deferred',
      _ts: Date.now()
    });
    return normalizeItems(fallbackPayload && fallbackPayload.content_links);
  }

  async function tryLoadContentLinks(apiUrl) {
    try {
      return await jsonpRequest(apiUrl, {
        action: 'content_links',
        _ts: Date.now()
      });
    } catch (error) {
      return null;
    }
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
        reject(new Error('\uJSONP \uc694\uccad\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.'));
      };

      timeoutId = window.setTimeout(function () {
        if (done) return;
        done = true;
        cleanup();
        reject(new Error('JSONP \uc751\ub2f5 \uc2dc\uac04\uc774 \ucd08\uacfc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.'));
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
        const contentId = String(item && item.content_id || '').trim();
        const updatedRaw = String(
          item && (
            item.updated_at ||
            item.modified_at ||
            item.publish_date ||
            item.published_date ||
            item.date ||
            item.created_at
          ) || ''
        ).trim();

        return {
          content_id: contentId,
          category: String(item && item.category || '').trim(),
          title: String(item && item.title || '').trim(),
          summary: String(item && item.summary || '').trim(),
          thumbnail_url: buildImageUrl(String(item && item.thumbnail_url || '').trim(), contentId, updatedRaw),
          link_url: String(item && item.link_url || '').trim(),
          tag_text: String(item && item.tag_text || '').trim(),
          date_text: formatDateText(updatedRaw)
        };
      })
      .filter(function (item) {
        return !!(item.title && item.link_url);
      });
  }

  function buildImageUrl(url, contentId, updatedRaw) {
    const text = String(url || '').trim();
    if (!text) return '';

    const version = String(updatedRaw || contentId || '').trim();
    if (!version) return text;

    return text + (text.indexOf('?') >= 0 ? '&' : '?') + 'v=' + encodeURIComponent(version);
  }

  function formatDateText(value) {
    const text = String(value || '').trim();
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
      '<button type="button" class="blog-filter-btn" data-category="all">\uc804\uccb4</button>'
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
        ? '<a class="blog-card-cover" href="' + safeLink + '"><img src="' + safeThumb + '" alt="' + escapeAttribute(item.title) + '" loading="lazy" decoding="async" /></a>'
        : '<a class="blog-card-cover" href="' + safeLink + '"></a>',
      '<div class="blog-card-body">',
      '<div class="blog-card-topline">',
      '<span class="blog-card-category">' + safeCategory + '</span>',
      '<span class="blog-card-date"' + dateStyle + '>' + safeDate + '</span>',
      '</div>',
      '<h2 class="blog-card-title"><a href="' + safeLink + '">' + safeTitle + '</a></h2>',
      '<p class="blog-card-summary">' + safeSummary + '</p>',
      '<div class="blog-card-actions">',
      '<a class="blog-card-link" href="' + safeLink + '">\uc790\uc138\ud788 \ubcf4\uae30</a>',
      '</div>',
      '</div>',
      '</article>'
    ].join('');
  }

  function getCards() {
    return Array.from(blogGrid.querySelectorAll('.blog-card'));
  }

  function syncFilterButtons() {
    if (!filterRow) return;

    const buttons = filterRow.querySelectorAll('[data-category]');
    buttons.forEach(function (button) {
      const category = String(button.getAttribute('data-category') || '').trim();
      button.classList.toggle('is-active', normalizeText(category) === normalizeText(state.activeCategory));
    });

    if (blogActiveFilterText) {
      const activeButton = filterRow.querySelector('[data-category].is-active');
      blogActiveFilterText.textContent = activeButton
        ? String(activeButton.textContent || '\uc804\uccb4').trim()
        : '\uc804\uccb4';
    }
  }

  function normalizeText(value) {
    return String(value || '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function matchesCategory(card) {
    if (normalizeText(state.activeCategory) === 'all') return true;
    return normalizeText(card.dataset.category) === normalizeText(state.activeCategory);
  }

  function matchesKeyword(card) {
    if (!state.keyword) return true;

    const haystack = normalizeText([
      card.dataset.title || '',
      card.dataset.summary || '',
      card.dataset.tags || '',
      card.dataset.category || ''
    ].join(' '));

    return haystack.indexOf(state.keyword) >= 0;
  }

  function update() {
    const cards = getCards();
    let visibleCount = 0;

    cards.forEach(function (card) {
      const visible = matchesCategory(card) && matchesKeyword(card);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (blogResultsCount) {
      blogResultsCount.textContent = String(visibleCount);
    }

    if (blogEmptyState) {
      blogEmptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  function getCachedItems() {
    try {
      const raw = window.sessionStorage.getItem(CLIENT_CACHE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.items)) return [];
      if (Date.now() - Number(parsed.saved_at || 0) > CLIENT_CACHE_TTL_MS) return [];
      return parsed.items;
    } catch (error) {
      return [];
    }
  }

  function setCachedItems(items) {
    try {
      window.sessionStorage.setItem(CLIENT_CACHE_KEY, JSON.stringify({
        saved_at: Date.now(),
        items: items
      }));
    } catch (error) {
      // ignore storage errors
    }
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
