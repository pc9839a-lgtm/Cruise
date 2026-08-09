// Static content loader. These files contain the values copied from Google Sheet on 2026-08-09.
// No runtime Google Sheets/API content synchronization is used.
window.MOCK_BOOTSTRAP_DATA = {};
[
  'assets/js/site-content-core.js?v=20260809-sheet-snapshot-1',
  'assets/js/site-content-reviews.js?v=20260809-sheet-snapshot-1',
  'assets/js/site-content-guides.js?v=20260809-sheet-snapshot-1',
  'assets/js/site-content-links.js?v=20260809-sheet-snapshot-1',
  'assets/js/site-content-images.js?v=20260809-membership-teaser-2'
].forEach(function (src) {
  document.write('<script src="' + src + '"></' + 'script>');
});
