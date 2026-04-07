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
    keyword: ''
  };

  init();

  function init() {
    bindEvents();
    syncFilterButtons();
    update();
  }

  function bindEvents() {
    if (blogSearchInput) {
      blogSearchInput.addEventListener('input', function (event) {
        state.keyword = String(event.target.value || '').trim().toLowerCase();
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

  function getCards() {
    return Array.from(blogGrid.querySelectorAll('.blog-card'));
  }

  function syncFilterButtons() {
    if (!filterRow) return;

    const buttons = filterRow.querySelectorAll('[data-category]');
    buttons.forEach(function (button) {
      const category = String(button.getAttribute('data-category') || '').trim();
      button.classList.toggle('is-active', category === state.activeCategory);
    });

    if (blogActiveFilterText) {
      const activeButton = filterRow.querySelector('[data-category].is-active');
      blogActiveFilterText.textContent = activeButton
        ? String(activeButton.textContent || '전체').trim()
        : '전체';
    }
  }

  function normalizeText(value) {
    return String(value || '').trim().toLowerCase();
  }

  function matchesCategory(card) {
    if (state.activeCategory === 'all') return true;
    return normalizeText(card.dataset.category) === normalizeText(state.activeCategory);
  }

  function matchesKeyword(card) {
    if (!state.keyword) return true;

    const haystack = [
      card.dataset.title || '',
      card.dataset.summary || '',
      card.dataset.tags || '',
      card.dataset.category || ''
    ].join(' ').toLowerCase();

    return haystack.includes(state.keyword);
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
})();
