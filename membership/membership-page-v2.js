(() => {
  'use strict';
  const startedAt = Date.now();
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function gotoInquiry(event) {
    if (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
    $('#membership-inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function patchPlanCopy() {
    const heading = $('#plans .membership-section-head');
    if (heading) {
      heading.innerHTML = '<h2>내가 언제 갈지만 정하면 됩니다</h2><p>1~2년에 한 번 계획하면 클래식, 포인트를 더 빨리 모으고 싶으면 프리미엄.</p>';
    }
    $$('[data-plan-signup-link]').forEach((link) => {
      link.textContent = '이 플랜으로 내 여행비 확인하기';
    });
    const floating = $('.floating-cta');
    if (floating) floating.textContent = '내 크루즈 가격 확인';
  }

  function bindInquiry() {
    const form = $('#membership-price-form');
    if (!form) return;
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const status = $('#membership-form-status');
      const button = $('#membership-form-submit');
      const region = $('#membership-region').value.trim();
      const time = $('#membership-time').value.trim();
      const people = $('#membership-people').value;
      const name = $('#membership-name').value.trim();
      const phone = $('#membership-phone').value.replace(/\D+/g, '');
      const agree = $('#membership-agree').checked;
      const fail = (message) => {
        status.className = 'mv2-status err';
        status.textContent = message;
      };
      if (!region) return fail('가고 싶은 지역이나 노선을 입력해주세요.');
      if (!time) return fail('대략적인 출발 시기를 입력해주세요.');
      if (!people) return fail('인원을 선택해주세요.');
      if (name.length < 2) return fail('이름을 확인해주세요.');
      if (phone.length < 9 || phone.length > 11) return fail('연락처를 확인해주세요.');
      if (!agree) return fail('개인정보 수집 및 이용 동의가 필요합니다.');

      const q = new URLSearchParams(location.search);
      const data = new FormData();
      const values = {
        form_type: 'main',
        name,
        phone,
        people_count: people,
        interest_schedule_id: 'membership_price',
        schedule_id: 'membership_price',
        region_detail: region,
        travel_ready_status: '',
        age_group: '',
        message: `희망 출발 시기: ${time}`,
        privacy_agree: 'Y',
        form_started_at: String(startedAt),
        website: '',
        agent_code: q.get('agent') || '',
        utm_source: q.get('utm_source') || '',
        utm_medium: q.get('utm_medium') || '',
        utm_campaign: q.get('utm_campaign') || '',
        page_url: location.href,
        referrer: document.referrer || ''
      };
      Object.entries(values).forEach(([k, v]) => data.set(k, v));

      button.disabled = true;
      status.className = 'mv2-status';
      status.textContent = '접수 중입니다.';
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: data,
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        const json = await response.json().catch(() => null);
        if (!response.ok || !json?.success) throw new Error(json?.message || '문의 접수에 실패했습니다.');
        status.textContent = '접수되었습니다. 확인 후 연락드리겠습니다.';
        form.reset();
        window.dataLayer?.push?.({ event: 'membership_price_inquiry_submit' });
      } catch (error) {
        fail(error.message || '문의 접수에 실패했습니다.');
      } finally {
        button.disabled = false;
      }
    });
  }

  function bindClicks() {
    document.addEventListener('click', (event) => {
      const inquiryTarget = event.target.closest('.floating-cta,[data-plan-signup-link],[data-membership-inquiry]');
      if (inquiryTarget) gotoInquiry(event);
    }, true);
  }

  function init() {
    bindClicks();
    bindInquiry();
    patchPlanCopy();
    setTimeout(patchPlanCopy, 450);
    setTimeout(patchPlanCopy, 1400);
    setTimeout(patchPlanCopy, 2800);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
