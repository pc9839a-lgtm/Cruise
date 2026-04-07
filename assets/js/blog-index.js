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
    return Array.from(
      blogGrid.querySelectorAll('.blog-card, article[data-category]')
    );
  }

  function syncFilterButtons() {
    if (!filterRow) return;

    const buttons = filterRow.querySelectorAll('[data-category]');
    buttons.forEach(function (button) {
      const category = String(button.getAttribute('data-category') || '').trim();
      const isActive = category === state.activeCategory;
      button.classList.toggle('is-active', isActive);
    });

    if (blogActiveFilterText) {
      const activeButton = filterRow.querySelector('[data-category].is-active');
      blogActiveFilterText.textContent = activeButton
        ? String(activeButton.textContent || '전체').trim()
        : '전체';
    }
  }

  function normalizeCategory(value) {
    return String(value || '').trim().toLowerCase();
  }

  function matchesCategory(card) {
    if (state.activeCategory === 'all') return true;

    const cardCategory = normalizeCategory(card.dataset.category);
    const activeCategory = normalizeCategory(state.activeCategory);

    return cardCategory === activeCategory;
  }

  function matchesKeyword(card) {
    if (!state.keyword) return true;

    const title = String(card.dataset.title || '').toLowerCase();
    const summary = String(card.dataset.summary || '').toLowerCase();
    const tags = String(card.dataset.tags || '').toLowerCase();
    const category = String(card.dataset.category || '').toLowerCase();
    const text = [title, summary, tags, category].join(' ');

    return text.includes(state.keyword);
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
