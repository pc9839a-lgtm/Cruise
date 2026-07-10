window.MOCK_BOOTSTRAP_DATA = {
  settings: {
    site_title: '크루즈플레이',
    site_subtitle: '처음 크루즈를 준비하는 분을 위한 일정 비교와 실전 가이드',
    phone: '010-0000-0000',
    kakao_url: 'https://open.kakao.com/o/xxxxxxx',
    default_email: 'pc9839a@naver.com,zkzk0601@naver.com',
    hero_tag_1: '일정 비교 안내',
    hero_tag_2: '쇼핑·옵션 없는 자유여행',
    hero_tag_3: '출발 가능 일정 상담',
    hero_title: '크루즈 여행,\n처음이라도 쉽게 준비하세요.',
    hero_subtitle: '선박, 출발지, 항해 루트, 예상 비용을 한눈에 비교하고\n내 일정에 맞는 크루즈를 확인해보세요.',
    hero_bottom_text: '표시 가격보다 실제 준비 과정과 포함 항목을 먼저 확인하는 것이 중요합니다.',
    identity_title: '크루즈플레이는\n여행사가 아닙니다.',
    identity_desc: '쇼핑과 옵션이 포함된 패키지 여행이 아닙니다.\n오직 크루즈 티켓만 투명하게 비교하고 선택하는\n100% 자유여행 플랫폼입니다.'
  },
  schedules: [
    { schedule_id: 'CR007', title: '디즈니 4박 5일 8월', region: '싱가포르', ship_name: '디즈니 어드벤처', departure_date: '2026-08-20', return_date: '2026-08-24', departure_airport: '', summary: '싱가포르 정박 중심의 디즈니 어드벤처 4박 일정', thumbnail_url: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1600&auto=format&fit=crop', route_ports: '싱가포르', highlight_yn: 'Y' },
    { schedule_id: 'CR004', title: '도쿄-대만 3박 4일 11월', region: '아시아', ship_name: 'MSC 벨리시마', departure_date: '2026-11-21', return_date: '2026-11-24', departure_airport: '', summary: '도쿄 출항 후 대만 기륭으로 이어지는 MSC 벨리시마 일정', thumbnail_url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1600&auto=format&fit=crop', route_ports: '도쿄|전일해상|기륭', highlight_yn: '' },
    { schedule_id: 'CR005', title: '대만 4박 5일 12월', region: '아시아', ship_name: 'MSC 벨리시마', departure_date: '2026-12-12', return_date: '2026-12-16', departure_airport: '', summary: '기륭, 미야코, 나하, 이시가키를 잇는 아시아 크루즈 일정', thumbnail_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop', route_ports: '기륭|미야코|나하|이시가키|기륭', highlight_yn: '' },
    { schedule_id: 'CR006', title: '지중해 7박 8일 2월', region: '지중해', ship_name: 'MSC 월드 아시아', departure_date: '2027-02-11', return_date: '2027-02-19', departure_airport: '', summary: '바르셀로나에서 출발해 프랑스, 이탈리아, 몰타를 지나는 지중해 일정', thumbnail_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop', route_ports: '바르셀로나|마르세유|제노바|치비타베키아|메시나|발레타|바르셀로나', highlight_yn: '' }
  ],
  schedule_days: [
    { schedule_id: 'CR007', day_no: '1', date: '2026-08-20', port_name: '싱가포르', arrival_time: '', departure_time: '', description: '승선 및 정박' },
    { schedule_id: 'CR007', day_no: '2', date: '2026-08-21', port_name: '싱가포르', arrival_time: '', departure_time: '', description: '싱가포르 정박' },
    { schedule_id: 'CR007', day_no: '3', date: '2026-08-22', port_name: '싱가포르', arrival_time: '', departure_time: '', description: '싱가포르 정박' },
    { schedule_id: 'CR007', day_no: '4', date: '2026-08-23', port_name: '싱가포르', arrival_time: '', departure_time: '', description: '싱가포르 정박' },
    { schedule_id: 'CR007', day_no: '5', date: '2026-08-24', port_name: '싱가포르', arrival_time: '07:00', departure_time: '', description: '하선' },
    { schedule_id: 'CR004', day_no: '1', date: '2026-11-21', port_name: '도쿄', arrival_time: '', departure_time: '19:00', description: '도쿄항 출항' },
    { schedule_id: 'CR004', day_no: '2', date: '2026-11-22', port_name: '전일해상', arrival_time: '', departure_time: '', description: '해상일' },
    { schedule_id: 'CR004', day_no: '3', date: '2026-11-23', port_name: '전일해상', arrival_time: '', departure_time: '', description: '해상일' },
    { schedule_id: 'CR004', day_no: '4', date: '2026-11-24', port_name: '기륭', arrival_time: '07:00', departure_time: '', description: '기륭 도착' }
  ],
  basic_info: [
    { section_key: 'cruise_intro', title: '크루즈 여행이란?', subtitle: '숙박과 이동, 식사와 여가가 함께 있는 여행', body: '크루즈는 배 이동만 하는 여행이 아니라 객실, 식사, 공연, 기항지 이동이 하나로 이어지는 여행 방식입니다.', point_1: '짐을 자주 옮기지 않아도 됩니다', point_2: '선내 식사와 시설을 함께 이용합니다', point_3: '항해 루트에 따라 여러 도시를 경험합니다', image_url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1600&auto=format&fit=crop' },
    { section_key: 'cost_check', title: '가격보다 포함 항목 확인', subtitle: '객실가만 보면 실제 예산을 놓치기 쉽습니다', body: '항공권, 세금, 팁, 와이파이, 음료 패키지, 기항지 비용을 나누어 보면 전체 예산을 더 정확하게 볼 수 있습니다.', point_1: '포함/별도 항목 확인', point_2: '1인 기준과 2인 기준 구분', point_3: '기항지 비용까지 함께 체크', image_url: '' },
    { section_key: 'first_timer', title: '처음 타는 분도 준비 가능', subtitle: '여권, 체크인, 선실 선택부터 차근차근', body: '처음 크루즈를 준비하는 분을 위해 필요한 서류와 승선 절차, 객실 선택 기준을 쉽게 정리합니다.', point_1: '여권 유효기간 확인', point_2: '승선 체크인 서류 준비', point_3: '선실 위치와 타입 비교', image_url: '' }
  ],
  reviews: [
    { review_id: 'RV001', title: '첫 크루즈 여행 준비 후기', region: '아시아', summary: '처음에는 복잡해 보였지만 일정과 준비물을 나눠보니 훨씬 쉬웠습니다.', thumbnail_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop', content: '처음 준비하는 분에게 필요한 체크리스트가 도움이 됐습니다.' },
    { review_id: 'RV002', title: '선실 비교가 도움 됐어요', region: '아시아', summary: '발코니와 오션뷰 차이를 보고 예산에 맞는 객실을 고를 수 있었습니다.', thumbnail_url: 'https://images.unsplash.com/photo-1510132310763-2df322eed83f?q=80&w=1600&auto=format&fit=crop', content: '객실 타입별 장단점을 먼저 이해하고 문의하니 상담이 쉬웠습니다.' }
  ],
  targets: [
    { title: '첫 크루즈를 준비하는 분', subtitle: '용어와 절차가 낯선 경우', description: '승선 절차, 선실 선택, 준비물부터 차근차근 확인할 수 있습니다.', point_1: '기본 개념 정리', point_2: '준비물 체크' },
    { title: '가족 또는 커플 여행을 찾는 분', subtitle: '동선과 휴식이 중요한 경우', description: '짐 이동이 적고 선내 시설을 함께 즐길 수 있는 일정 중심으로 비교할 수 있습니다.', point_1: '선내 시설 확인', point_2: '객실 타입 비교' },
    { title: '비용 구조가 궁금한 분', subtitle: '객실가와 총예산을 구분하고 싶은 경우', description: '항공, 팁, 세금, 선택 비용까지 전체 예산 기준으로 확인할 수 있습니다.', point_1: '포함 항목 확인', point_2: '별도 비용 체크' }
  ],
  process_steps: [
    { step_title: '일정 확인', step_desc: '출발지, 항해 루트, 선박, 기간을 먼저 비교합니다.', highlight_text: '항로와 일정부터 확인' },
    { step_title: '선실 선택', step_desc: '인사이드, 오션뷰, 발코니 등 객실 타입을 비교합니다.', highlight_text: '예산과 여행 스타일 기준' },
    { step_title: '포함 항목 확인', step_desc: '세금, 팁, 식사, 와이파이, 기항지 비용을 나누어 봅니다.', highlight_text: '총예산 기준 확인' },
    { step_title: '문의 및 준비', step_desc: '관심 일정으로 문의 후 여권과 체크인 서류를 준비합니다.', highlight_text: '승선 전 체크리스트' }
  ],
  cabins: [
    { cabin_type: 'Inside', title: '인사이드 객실', summary: '창이 없는 기본 객실로 객실 체류 시간이 짧은 분에게 적합합니다.', best_for: '예산을 중시하는 여행자', point_1: '가성비 중심', point_2: '선내 활동 위주', badge_1: '실속형' },
    { cabin_type: 'Oceanview', title: '오션뷰 객실', summary: '창을 통해 바다를 볼 수 있어 답답함이 적은 객실입니다.', best_for: '기본 편안함을 원하는 여행자', point_1: '바다 조망', point_2: '중간 예산', badge_1: '균형형' },
    { cabin_type: 'Balcony', title: '발코니 객실', summary: '개별 발코니가 있어 항해 분위기를 더 여유롭게 즐길 수 있습니다.', best_for: '휴식과 전망을 중시하는 여행자', point_1: '개별 발코니', point_2: '만족도 높은 선택', badge_1: '추천형' }
  ],
  faqs: [
    { category: '기본', question: '크루즈가 처음인데 준비가 어렵지 않을까요?', answer: '처음에는 낯선 용어가 많지만 여권, 체크인, 객실, 비용 구조만 나누어 보면 충분히 준비할 수 있습니다.' },
    { category: '비용', question: '크루즈 가격은 객실가만 보면 되나요?', answer: '아닙니다. 항공권, 세금, 팁, 와이파이, 음료 패키지, 기항지 비용까지 함께 확인하는 것이 좋습니다.' },
    { category: '기항지', question: '기항지 관광은 꼭 신청해야 하나요?', answer: '일정과 항구 위치에 따라 자유여행이 가능한 경우도 있고 공식 투어가 편한 경우도 있습니다.' }
  ],
  trust_points: [
    { badge_text: 'GUIDE', title: '처음 타는 분 기준', description: '전문 용어보다 실제 준비 과정에서 필요한 내용을 중심으로 정리합니다.' },
    { badge_text: 'CHECK', title: '포함 항목 중심', description: '표시 가격보다 실제 총예산을 확인할 수 있도록 비용 구조를 나눠 안내합니다.' },
    { badge_text: 'CONTENT', title: '정보형 콘텐츠 운영', description: '선실, 비용, 준비물, 기항지 등 검색 수요가 있는 글을 계속 쌓아갑니다.' }
  ],
  content_links: [
    { content_id: 'cruise-drink-package-comparison', title: '음료패키지 꼭 해야 할까? 대표 선사별 선택 기준', category: '식사정보', summary: '커피, 탄산, 주류 포함 여부와 여행 스타일별 선택 기준을 정리했습니다.', thumbnail_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1600&auto=format&fit=crop', link_url: '/blog/cruise-drink-package-comparison/', tag_text: '음료패키지', published_at: '2026-05-20' },
    { content_id: 'cruise-balcony-cabin-guide', title: '크루즈 발코니 객실 꼭 해야 할까?', category: '선실비교', summary: '발코니, 오션뷰, 인사이드 객실을 여행 스타일과 예산 기준으로 비교합니다.', thumbnail_url: 'https://images.unsplash.com/photo-1510132310763-2df322eed83f?q=80&w=1600&auto=format&fit=crop', link_url: '/blog/cruise-balcony-cabin-guide/', tag_text: '발코니객실', published_at: '2026-05-17' },
    { content_id: 'best-first-cruise-destinations-for-koreans', title: '한국인이 가기 좋은 첫 크루즈 여행지 추천', category: '초보가이드', summary: '일본, 대만, 싱가포르 등 처음 선택하기 좋은 항로를 정리했습니다.', thumbnail_url: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1600&auto=format&fit=crop', link_url: '/blog/best-first-cruise-destinations-for-koreans/', tag_text: '첫크루즈', published_at: '2026-05-14' },
    { content_id: 'first-cruise-guide', title: '크루즈 처음 타기 전 꼭 알아야 할 기본 정보', category: '초보가이드', summary: '처음 이용하는 분들이 가장 많이 궁금해하는 준비사항을 정리했습니다.', thumbnail_url: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1600&auto=format&fit=crop', link_url: '/blog/first-cruise-guide/', tag_text: '처음크루즈', published_at: '2026-04-08' },
    { content_id: 'cruise-cost-breakdown', title: '크루즈 비용은 어떻게 구성될까요?', category: '비용비교', summary: '객실가, 항공, 팁, 세금 등 실제 비용 구조를 설명합니다.', thumbnail_url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1600&auto=format&fit=crop', link_url: '/blog/cruise-cost-breakdown/', tag_text: '비용정리', published_at: '2026-04-07' },
    { content_id: 'departure-checklist', title: '출발 전 체크리스트 한 번에 보기', category: '준비물', summary: '여권, 의류, 멀미약, 체크인 서류까지 출발 전 챙길 항목을 정리했습니다.', thumbnail_url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop', link_url: '/blog/departure-checklist/', tag_text: '준비물체크', published_at: '2026-04-08' }
  ]
};