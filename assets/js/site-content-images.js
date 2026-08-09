// Homepage image assignments for static content cards.
// Keeps public content self-contained in the site without Google Sheets runtime lookup.
(function () {
  var data = window.MOCK_BOOTSTRAP_DATA || {};
  var basicInfo = Array.isArray(data.basic_info) ? data.basic_info : [];
  var images = {
    cruise_easy: '/reviews/KakaoTalk_20260405_150550057_02.jpg',
    cruise_freedom: '/reviews/KakaoTalk_20260405_150550057_04.jpg'
  };

  basicInfo.forEach(function (item) {
    if (!item || !item.section_key) return;
    if (images[item.section_key]) item.image_url = images[item.section_key];
  });
})();
