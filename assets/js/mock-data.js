window.MOCK_BOOTSTRAP_DATA = {
  settings: {
    site_title: '크루즈 플레이',
    hero_title: '크루즈 여행,\n패키지 말고 직구하세요.',
    hero_subtitle: '중개 수수료 없는 투명한 일정 선택으로, 원하는 항해 루트와 상세 항해일정을 바로 확인해보세요.',
    hero_tag_1: '최저가 보장제',
    hero_tag_2: 'NO 쇼핑·옵션',
    hero_tag_3: '100% 출발확정',
    hero_bottom_text: '원하시는 일정이 보이면 바로 문의하세요. 항해 루트부터 상세 일정까지 한눈에 보여드립니다.',
    identity_title: '크루즈플레이는\n여행사가 아닙니다.',
    identity_desc: '쇼핑과 옵션이 포함된 패키지 여행이 아닙니다.\n오직 크루즈 일정과 항해 루트를 투명하게 비교하고 선택하는\n자유여행 중심 안내 플랫폼입니다.',
    footer_description: '항해 루트와 상세 항해일정을 확인하고 바로 문의까지 연결되는 크루즈 랜딩페이지'
  },
  schedules: [
    {
      schedule_id: 'CR001',
      title: '동부 지중해 8박 10일',
      region: '지중해',
      ship_name: 'Enchanted Princess',
      departure_date: '2026-06-22',
      return_date: '2026-07-01',
      departure_airport: '인천',
      summary: '산토리니, 쿠사다시, 아테네까지 한 번에 보는 인기 일정',
      thumbnail_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      schedule_image_url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1400&auto=format&fit=crop',
      detail_intro: '지중해 인기 기항지를 여유롭게 둘러보는 일정',
      route_ports: '로마|산토리니|쿠사다시|아테네|카타콜론|살레르노'
    },
    {
      schedule_id: 'CR002',
      title: '오키나와 4박 5일',
      region: '일본',
      ship_name: 'Costa Serena',
      departure_date: '2026-07-10',
      return_date: '2026-07-14',
      departure_airport: '부산',
      summary: '부담 적게 다녀오기 좋은 인기 크루즈',
      thumbnail_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
      schedule_image_url: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1400&auto=format&fit=crop',
      detail_intro: '가볍게 떠나기 좋은 일본 크루즈',
      route_ports: '부산|오키나와|해상일|부산'
    },
    {
      schedule_id: 'CR003',
      title: '두바이 크루즈 6박 8일',
      region: '두바이',
      ship_name: 'MSC Euribia',
      departure_date: '2026-12-03',
      return_date: '2026-12-10',
      departure_airport: '인천',
      summary: '화려한 도시와 바다를 함께 보는 중동 인기 일정',
      thumbnail_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
      schedule_image_url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1400&auto=format&fit=crop',
      detail_intro: '두바이와 중동의 이국적인 항해 루트를 담은 일정',
      route_ports: '두바이|도하|아부다비|시르바니야스|두바이'
    }
  ],
  schedule_days: [
    { schedule_id: 'CR001', day_no: '1', date: '2026-06-22', port_name: '인천 출발', arrival_time: '-', departure_time: '-', description: '인천 출발 후 현지 이동', image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop' },
    { schedule_id: 'CR001', day_no: '2', date: '2026-06-23', port_name: '로마 승선', arrival_time: '18:00', departure_time: '-', description: '크루즈 승선 및 자유시간', image_url: 'https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=1200&auto=format&fit=crop' },
    { schedule_id: 'CR001', day_no: '3', date: '2026-06-24', port_name: '산토리니', arrival_time: '08:00', departure_time: '18:00', description: '산토리니 자유관광', image_url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop' },
    { schedule_id: 'CR001', day_no: '4', date: '2026-06-25', port_name: '쿠사다시', arrival_time: '07:00', departure_time: '17:00', description: '기항지 관광 또는 자유일정', image_url: 'https://images.unsplash.com/photo-1547981609-4b6bf67db7e4?q=80&w=1200&auto=format&fit=crop' },
    { schedule_id: 'CR002', day_no: '1', date: '2026-07-10', port_name: '부산 출발', arrival_time: '-', departure_time: '-', description: '부산 출발 및 승선', image_url: 'https://images.unsplash.com/photo-1526481280695-3c4691f7f36c?q=80&w=1200&auto=format&fit=crop' },
    { schedule_id: 'CR002', day_no: '2', date: '2026-07-11', port_name: '오키나와', arrival_time: '09:00', departure_time: '19:00', description: '오키나와 자유일정', image_url: 'https://images.unsplash.com/photo-1536753291144-1aa73b4c4b1e?q=80&w=1200&auto=format&fit=crop' },
    { schedule_id: 'CR003', day_no: '1', date: '2026-12-03', port_name: '인천 출발', arrival_time: '-', departure_time: '-', description: '인천 출발 후 두바이 이동', image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop' },
    { schedule_id: 'CR003', day_no: '2', date: '2026-12-04', port_name: '두바이 승선', arrival_time: '17:00', departure_time: '-', description: '승선 및 자유시간', image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop' }
  ],
  reviews: [
    { review_id: 'RV001', title: '지중해 크루즈 첫 경험', region: '지중해', summary: '생각보다 이동 스트레스가 적고, 기항지마다 분위기가 완전히 달라 만족도가 높았어요.', thumbnail_url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop' },
    { review_id: 'RV002', title: '오키나와 가족여행 후기', region: '일본', summary: '짧은 일정인데도 휴양과 관광을 같이 챙길 수 있어서 부모님도 만족하셨어요.', thumbnail_url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop' },
    { review_id: 'RV003', title: '두바이 야경이 기억에 남아요', region: '두바이', summary: '배 위에서 보는 야경이 인상적이었고 도시와 바다를 함께 느끼기 좋은 일정이었어요.', thumbnail_url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop' }
  ]
};
