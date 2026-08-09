# CruisePlay 콘텐츠 / Google Sheets 경계

업데이트: 2026-08-09

## 원칙

CruisePlay의 공개 콘텐츠는 Google Sheets를 CMS처럼 조회하지 않는다.
홈페이지 공개 콘텐츠는 저장소의 정적 JavaScript 소스에 값 자체를 포함한다.
Google Sheets / Apps Script는 사용자가 제출하는 운영 데이터와 담당자 배분처럼 정적 파일로 대체할 수 없는 기능에만 사용한다.

## 홈페이지 정적 콘텐츠

2026-08-09 `cruise_sheet_template`의 콘텐츠 탭 전체를 확인하여 아래 파일에 실제 값으로 복사했다.

- `assets/js/site-content-core.js`: 공개 설정, 추천 일정 5개, 일정 상세 28개
- `assets/js/site-content-reviews.js`: 여행 후기 18개
- `assets/js/site-content-guides.js`: 이용대상자, 기초안내, 예약과정, 선실비교, FAQ, 신뢰요소
- `assets/js/site-content-links.js`: 콘텐츠 연결 16개

`assets/js/mock-data.js`는 위 정적 소스 파일을 페이지 파싱 시 로드한다.
`assets/js/config.js`는 `useMockOnly: true`로 고정되어 있으므로 메인 화면은 Google Sheets, Apps Script, 콘텐츠 API를 호출하지 않는다.
과거 `/api/content` 경로는 삭제했다.

공개 콘텐츠 대상은 다음과 같다.

- 사이트 공개 설정 문구
- 추천 일정
- 일정 상세 / 기항 일정
- 여행 후기
- 기초 안내
- 이용 대상자
- 예약 과정
- 선실 비교
- FAQ
- 신뢰 요소
- 블로그/콘텐츠 연결 목록

## Google Sheets에 남기는 운영 데이터

다음 항목만 동적으로 생성되거나 운영 중 변경되므로 Google Sheets / Apps Script를 유지한다.

- `상담문의`: 고객 문의 접수 데이터
- `파트너문의`: 파트너 신청/상담 데이터
- `영업자`: `agent_code` 기준 담당자 배분 및 알림 대상
- `알림로그`: 문의 메일 발송 성공/실패 기록
- 서버 운영용 이메일/알림 설정

프론트 폼은 `/api/contact`를 사용한다.
`functions/api/contact.js`가 입력값 검증/보안 처리를 수행한 뒤 Google Apps Script로 전달한다.

## 수정 규칙

1. 일정/후기/FAQ/선실/안내 콘텐츠를 Google Sheets에서 자동 동기화하지 않는다.
2. 공개 콘텐츠 변경은 위 `site-content-*.js` 파일 또는 해당 HTML/블로그 파일을 직접 수정하고 배포한다.
3. Google Sheets는 문의 및 파트너 운영대장으로 취급한다.
4. 홈페이지에서 Google Apps Script `GET bootstrap` 또는 별도 콘텐츠 API를 다시 연결하지 않는다.
5. 문의/파트너 POST 흐름과 공개 콘텐츠 로딩 흐름을 합치지 않는다.
6. 기존 브라우저의 `cruiseplay_bootstrap_cache_v1`은 `config.js`에서 제거하여 과거 Sheet 응답이 재사용되지 않게 한다.
7. Google Sheet를 참고해 콘텐츠를 갱신해야 할 때도 수동 검수 후 사이트 소스에 복사하며 런타임 연동은 만들지 않는다.

## 현재 데이터 스냅샷

2026-08-09 Google Sheet 전체 확인 기준:

- 일정 5개
- 일정 상세 28개 일차
- 후기 18개
- FAQ 9개
- 예약 과정 3개
- 이용 대상자 3개
- 선실 비교 3개
- 기초 안내 3개
- 신뢰 요소 3개
- 콘텐츠 연결 16개

운영용 `설정` 값 중 `default_email`은 공개 콘텐츠가 아니므로 브라우저 소스에 복사하지 않고 서버/Sheet 운영값으로 남긴다.
