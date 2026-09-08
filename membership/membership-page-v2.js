(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function revealPostReviewSections() {
    const sections = ['#price-pain', '#price-compare', '#same-cruise', '#guide-question']
      .map((selector) => $(selector))
      .filter(Boolean);

    if (!sections.length) return;

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-section-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-section-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

    sections.forEach((section) => observer.observe(section));
  }

  function bindCostCaseActions() {
    const calcButton = $('[data-scroll-calculator]');
    if (calcButton) {
      calcButton.addEventListener('click', () => {
        $('#calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    $$('[data-case-inquiry]').forEach((link) => {
      link.addEventListener('click', () => {
        try {
          sessionStorage.setItem('membershipInquiryContext', JSON.stringify({
            source: 'membership-cost-case',
            ship: 'MSC World Asia',
            route: 'Barcelona',
            nights: 7,
            cabin: 'balcony',
            party: 2,
            bookingTotalUsd: 3887.35,
            pointUsed: 1805.84,
            cardPaidUsd: 2020.88,
            processingFeeUsd: 60.63,
            cashOutUsd: 3081.51,
            airfareKrwPerPerson: 1800000
          }));
        } catch (error) {
          // Query parameters on the link still preserve the selected case.
        }
      });
    });
  }

  function init() {
    // Hero and the immediately following review section are intentionally untouched.
    revealPostReviewSections();
    bindCostCaseActions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
