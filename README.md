# Cruise Landing Package

이 패키지는 아래 구성을 포함합니다.

- `index.html` : 메인 랜딩페이지
- `assets/css/styles.css` : 전체 스타일
- `assets/js/config.js` : Apps Script URL, 연락처 링크 설정
- `assets/js/mock-data.js` : 목업 데이터
- `assets/js/main.js` : 일정/후기 렌더링, 폼 처리, URL 파라미터 추적
- `sheet_templates/*.csv` : 구글시트 탭 업로드용 템플릿
- `apps_script.gs` : 구글 Apps Script 전체 코드

## 바로 쓰는 순서
1. `sheet_templates`의 CSV들을 구글시트 탭으로 업로드
2. `apps_script.gs`를 새 Apps Script 프로젝트에 붙여넣기
3. 웹앱으로 배포
4. 배포 URL을 `assets/js/config.js`의 `apiUrl`에 입력
5. `useMockOnly`를 `false`로 변경
6. Cloudflare Pages에 폴더 전체 업로드

## 링크 추적 예시
- `/?agent=kim01&utm_source=naver&utm_medium=blog`
- `/?agent=lee02&utm_source=instagram&utm_medium=dm`

## 수정 포인트
- 브랜드명: `settings.csv`의 `site_name`
- 메인 카피: `settings.csv`의 `hero_*`
- 하단 버튼 링크: `settings.csv`의 `phone_link`, `chat_link`
- 일정 카드: `schedules.csv`
- 일정 상세 타임라인: `schedule_days.csv`
- 후기 카드: `reviews.csv`

## 참고
- 브라우저에서 시트 데이터를 읽기 위해 GET은 JSONP 방식으로 구성했습니다.
- 폼 제출은 hidden iframe + postMessage 방식이라 정적 사이트에서도 동작하도록 설계했습니다.
