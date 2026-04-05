# 구글시트 탭 구조

아래 CSV 파일 각각을 구글시트 탭으로 업로드해서 사용하면 됩니다.

## 권장 탭명
- settings
- agents
- schedules
- schedule_days
- reviews
- inquiries
- mail_logs

## 운영 원칙
- `schedules`는 일정 카드용 1행 1항차
- `schedule_days`는 일정 상세용 1행 1일차
- `reviews`는 후기 카드용
- `inquiries`는 상담 DB
- `mail_logs`는 메일 발송 기록

## 이미지 URL
- `hero_image_url`, `schedule_image_url`, `thumbnail_url`에는
  외부에서 접근 가능한 공개 URL을 넣어주세요.
- Google Drive 링크를 쓸 경우 직접 이미지 URL 형태로 정리해서 넣는 것을 권장합니다.

## 노출 제어
- `status` 컬럼에는 `public` 또는 `hidden`
- `use_yn` 컬럼에는 `Y` 또는 `N`

## 영업자 링크 예시
- `https://도메인.com/?agent=kim01&utm_source=naver&utm_medium=blog`
- `https://도메인.com/?agent=lee02&utm_source=instagram&utm_medium=dm`

폼이 들어오면 `agent` 값을 기준으로 `agents` 탭에서 이메일을 찾아 알림을 보냅니다.
