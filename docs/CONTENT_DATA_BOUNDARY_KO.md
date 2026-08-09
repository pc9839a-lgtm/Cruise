# CruisePlay 콘텐츠 / Google Sheets 경계

업데이트: 2026-08-09

## 원칙

CruisePlay의 공개 콘텐츠는 Google Sheets를 CMS처럼 조회하지 않는다.
홈페이지는 저장소에 포함된 정적 콘텐츠를 기준으로 렌더링한다.
Google Sheets / Apps Script는 사용자가 제출하는 운영 데이터와 담당자 배분처럼 정적 파일로 대체할 수 없는 기능에만 사용한다.

## 홈페이지 정적 콘텐츠

기준 파일: `assets/data/bootstrap-fallback.json`

다음 데이터는 홈페이지 배포물에 포함하며 Google Sheets GET 동기화를 사용하지 않는다.

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

`assets/js/config.js`의 콘텐츠 엔드포인트는 `/api/content`다.
`functions/api/content.js`는 위 정적 JSON만 읽어 기존 메인 JS가 기대하는 JSONP 형식으로 반환한다.
Google Apps Script의 `action=bootstrap` 응답은 홈페이지 콘텐츠 소스로 사용하지 않는다.

## Google Sheets에 남기는 운영 데이터

다음 항목은 동적으로 생성되거나 운영 중 변경되므로 Google Sheets / Apps Script를 유지한다.

- `상담문의`: 고객 문의 접수 데이터
- `파트너문의`: 파트너 신청/상담 데이터
- `영업자`: `agent_code` 기준 담당자 배분 및 알림 대상
- `알림로그`: 문의 메일 발송 성공/실패 기록
- 서버 운영용 이메일/알림 설정

프론트 폼은 `/api/contact`를 사용한다.
`functions/api/contact.js`가 입력값 검증/보안 처리를 수행한 뒤 Google Apps Script로 전달한다.

## 수정 규칙

1. 일정/후기/FAQ/선실/안내 콘텐츠를 바꿀 때 Google Sheets를 수정해 자동 반영시키는 방식으로 운영하지 않는다.
2. 공개 콘텐츠 변경은 저장소의 정적 데이터 또는 해당 HTML/블로그 파일을 수정하고 배포한다.
3. Google Sheets는 문의 및 파트너 운영대장으로 취급한다.
4. 홈페이지에서 Google Apps Script `GET bootstrap`을 다시 연결하지 않는다.
5. 문의/파트너 POST 흐름과 콘텐츠 GET 흐름을 하나의 엔드포인트로 다시 합치지 않는다.
6. 기존 브라우저의 `cruiseplay_bootstrap_cache_v1`은 `config.js`에서 제거하여 과거 Sheet 응답이 재사용되지 않게 한다.

## 현재 데이터 스냅샷

2026-08-09 Google Sheet 확인 기준으로 정적 데이터와 대조한 주요 구성은 다음과 같다.

- 일정 5개
- 일정 상세 28개 일차
- 후기 18개
- FAQ 9개
- 예약 과정 3개
- 이용 대상자 3개
- 선실 비교 3개
- 신뢰 요소 3개
- 콘텐츠 연결 16개

공개 콘텐츠를 추가할 때는 위 정적 저장소 데이터를 갱신한다.
