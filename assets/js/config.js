window.APP_CONFIG = {
  // 홈페이지 콘텐츠는 저장소의 정적 데이터(/assets/data/bootstrap-fallback.json)만 사용합니다.
  // Google Apps Script는 /api/contact를 통한 문의/파트너 입력 저장 용도로만 유지합니다.
  // 2026-08-09: Google Sheets CMS 동기화 제거.
  apiUrl: '/api/content',
  useMockOnly: false,
  submitTimeout: 30000
};
