/*
 * Partner inquiry route patch for the current Korean Apps Script.
 *
 * Apply this to the live Apps Script deployment:
 * 1. Add `partnerInquiries: '파트너문의'` to SHEET_NAMES.
 * 2. In doPost(), replace the single append to SHEET_NAMES.inquiries with
 *    the `targetSheetName` block below.
 * 3. Add the helper functions at the bottom of the script.
 */

/* SHEET_NAMES addition:
  partnerInquiries: '파트너문의',
*/

/* doPost() replacement block:

    const isPartnerInquiry = isPartnerInquiry_(params);
    const targetSheetName = isPartnerInquiry
      ? SHEET_NAMES.partnerInquiries
      : SHEET_NAMES.inquiries;

    appendByHeader_(
      targetSheetName,
      isPartnerInquiry
        ? buildPartnerInquiryData_({
            params: params,
            inquiryData: inquiryData,
            createdAt: createdAt,
            agentCode: agentCode,
            assignedEmail: assignedEmail,
            settings: settings
          })
        : inquiryData
    );

*/

function isPartnerInquiry_(params) {
  return toText_(params.raw_type) === 'partner_inquiry' ||
    toText_(params.inquiry_type) === 'partner' ||
    toText_(params.interest_schedule_id) === 'partner_membership' ||
    toText_(params.schedule_id) === 'partner_membership';
}

function buildPartnerInquiryData_(context) {
  const params = context.params || {};
  const inquiryData = context.inquiryData || {};
  const settings = context.settings || {};

  return {
    created_at: context.createdAt,
    name: firstNonEmpty_(inquiryData.name, params.name),
    phone: firstNonEmpty_(inquiryData.phone, toText_(params.phone).replace(/\D+/g, '')),
    age_group: toText_(params.age_group),
    region_detail: firstNonEmpty_(inquiryData.region_detail, params.region_detail),
    travel_ready_status: firstNonEmpty_(inquiryData.travel_ready_status, params.travel_ready_status),
    message: firstNonEmpty_(inquiryData.message, params.message, params.memo, params.partner_message),
    agent_code: firstNonEmpty_(context.agentCode, params.agent_code, 'admin'),
    utm_source: firstNonEmpty_(inquiryData.utm_source, params.utm_source),
    utm_medium: firstNonEmpty_(inquiryData.utm_medium, params.utm_medium),
    utm_campaign: firstNonEmpty_(inquiryData.utm_campaign, params.utm_campaign),
    page_url: firstNonEmpty_(inquiryData.page_url, params.page_url, params.landing_page),
    referrer: firstNonEmpty_(inquiryData.referrer, params.referrer),
    assigned_email: firstNonEmpty_(context.assignedEmail, inquiryData.assigned_email),
    mail_sent: 'N',
    status: '신규',
    site_name: firstNonEmpty_(params.site_name, settings.site_title, settings.site_name, '크루즈 제휴마케팅'),
    raw_type: 'partner_inquiry'
  };
}
