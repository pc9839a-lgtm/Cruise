// Homepage image assignments for static content cards.
// Public guide images use external sources and do not depend on Google Sheets runtime lookup.
(function () {
  var data = window.MOCK_BOOTSTRAP_DATA || {};
  var basicInfo = Array.isArray(data.basic_info) ? data.basic_info : [];
  var images = {
    cruise_easy: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=85&w=1600&h=1000&auto=format&fit=crop',
    cruise_freedom: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=85&w=1600&h=1000&auto=format&fit=crop'
  };

  basicInfo.forEach(function (item) {
    if (!item || !item.section_key) return;
    if (images[item.section_key]) item.image_url = images[item.section_key];
  });
})();
