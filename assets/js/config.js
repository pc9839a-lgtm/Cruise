// CruisePlay runtime data policy: public content is embedded in site source files.
// Google Sheets / Apps Script remain only for inquiry and partner form submissions.
try {
  window.localStorage.removeItem('cruiseplay_bootstrap_cache_v1');
} catch (error) {}

window.APP_CONFIG = {
  apiUrl: '/api/contact',
  useMockOnly: true,
  submitTimeout: 30000
};
