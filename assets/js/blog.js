(function () {
  const blogGrid = document.getElementById('blogGrid');
  const blogEmpty = document.getElementById('blogEmpty');
  const blogResultCount = document.getElementById('blogResultCount');
  const blogCategoryFilters = document.getElementById('blogCategoryFilters');
  const blogSearchInput = document.getElementById('blogSearchInput');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');

  const state = {
    posts: [],
    activeCategory: '전체',
    keyword: ''
  };

  init();

  async function init() {
    bindStaticEvents();
    const posts = await loadPosts();
    state.posts = posts.sort((a, b) => {
      return String(b.published_at || '').localeCompare(String(a.published_at || ''));
    });
    renderCategoryFilters();
    renderPosts();
  }

  function bindStaticEvents() {
    if (mobileMenuToggle && mainNav) {
      mobileMenuToggle.addEventListener('click', function () {
        mainNav.classList.toggle('is-open');
      });
    }

    if (blogSearchInput) {
      blogSearchInput.addEventListener('input', function (event) {
        state.keyword = String(event.target.value || '').trim().toLowerCase();
        renderPosts();
      });
    }

    if (blogCategoryFilters) {
      blogCategoryFilters.addEventListener('click', function (event) {
        const button = event.target.closest('[data-category]');
        if (!button) return;
        state.activeCategory = button.getAttribute('data-category') || '전체';
        renderCategoryFilters();
        renderPosts();
      });
    }
  }

  async function loadPosts() {
    try {
      const response = await fetch('data/posts.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('posts-json-load-failed');
      const json = await response.json();
      return Array.isArray(json) ? json : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function renderCategoryFilters() {
    if (!blogCategoryFilters) return;
    const categories = ['전체'].concat(
      Array.from(new Set(state.posts.map(function (post) {
        return String(post.category || '').trim();
      }).filter(Boolean)))
    );

    blogCategoryFilters.innerHTML = categories.map(function (category) {
      const activeClass = state.activeCategory === category ? ' is-active' : '';
      return '<button type="button" class="blog-filter-chip' + activeClass + '" data-category="' + escapeHtml(category) + '">' + escapeHtml(category) + '</button>';
    }).join('');
  }

  function renderPosts() {
    if (!blogGrid) return;

    const filtered = state.posts.filter(function (post) {
      const matchCategory = state.activeCategory === '전체' || String(post.category || '') === state.activeCategory;
      const haystack = [post.title, post.summary, post.category].join(' ').toLowerCase();
      const matchKeyword = !state.keyword || haystack.includes(state.keyword);
      return matchCategory && matchKeyword;
    });

    if (blogResultCount) {
      blogResultCount.textContent = filtered.length + '개 콘텐츠';
    }

    if (!filtered.length) {
      blogGrid.innerHTML = '';
      if (blogEmpty) blogEmpty.hidden = false;
      return;
    }

    if (blogEmpty) blogEmpty.hidden = true;

    blogGrid.innerHTML = filtered.map(function (post) {
      const imageMarkup = post.thumbnail
        ? '<div class="blog-card-cover"><img src="' + escapeAttribute(post.thumbnail) + '" alt="' + escapeAttribute(post.title || '콘텐츠 대표 이미지') + '" loading="lazy"></div>'
        : '<div class="blog-card-cover"></div>';

      return [
        '<article class="blog-card">',
          imageMarkup,
          '<div class="blog-card-body">',
            '<div class="blog-card-topline">',
              '<span class="blog-card-category">' + escapeHtml(post.category || '콘텐츠') + '</span>',
              '<span class="blog-card-date">' + escapeHtml(formatDate(post.published_at)) + '</span>',
            '</div>',
            '<h2 class="blog-card-title">' + escapeHtml(post.title || '') + '</h2>',
            '<p class="blog-card-summary">' + escapeHtml(post.summary || '') + '</p>',
            '<div class="blog-card-actions">',
              '<a class="blog-card-link" href="post.html?slug=' + encodeURIComponent(post.slug || '') + '">자세히 보기</a>',
            '</div>',
          '</div>',
        '</article>'
      ].join('');
    }).join('');
  }

  function formatDate(value) {
    if (!value) return '';
    return String(value).replace(/-/g, '.');
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
