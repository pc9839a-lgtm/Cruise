import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';

// No network traffic or customer data. Run the real Pages Function with a
// mocked Apps Script response and in-memory Cloudflare cache.
const origin = 'https://cruiseplay-dyt.pages.dev';
const code = readFileSync('functions/api/contact.js', 'utf8').replace(/^export\s+/gm, '');
const upstreamRequests = [];
const sandbox = {
  Request, Response, FormData, Headers, URL, TextEncoder, crypto: webcrypto,
  caches: { default: { match: async () => null, put: async () => undefined } },
  fetch: async (url, options) => {
    assert.match(String(url), /^https:\/\/script\.google\.com\/macros\/s\//);
    assert.equal(options.method, 'POST');
    upstreamRequests.push({url:String(url)});
    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });
  }
};
vm.createContext(sandbox);
vm.runInContext(code, sandbox, { filename: 'contact.js' });
assert.equal(typeof sandbox.onRequestPost, 'function');

let requestId = 0;
function fakeContext(schedule, ip, formType = 'main') {
  const data = new FormData();
  data.set('name', '테스트');
  data.set('phone', '01099990000');
  data.set('people_count', '1');
  data.set('age_group', formType === 'partner' ? '30대' : '');
  data.set('travel_ready_status', formType === 'partner' ? '있음' : '');
  data.set('privacy_agree', 'Y');
  data.set('form_type', formType);
  data.set('interest_schedule_id', schedule);
  data.set('form_started_at', String(Date.now()-5000));
  return {
    request: new Request(origin+'/api/contact', {
      method:'POST', body:data,
      headers:{
        Origin:origin,
        'X-Requested-With':'XMLHttpRequest',
        'CF-Connecting-IP':ip,
        'Sec-Fetch-Site':'same-origin'
      }
    }),
    waitUntil() {}
  };
}
async function submit(schedule, ip, formType='main') {
  const response = await sandbox.onRequestPost(fakeContext(schedule, ip, formType));
  return { status:response.status, json:await response.json() };
}

const first = await submit('main_inquiry', '198.51.100.1');
assert.equal(first.status,200,'first general form must submit');
const globalIpLimit = await submit('membership_inquiry', '198.51.100.1');
assert.equal(globalIpLimit.status,429,'IP anti-spam cooldown must remain active');
const independentMembership = await submit('membership_inquiry', '198.51.100.2');
assert.equal(independentMembership.status,200,'membership must not share the general phone key');
const duplicateMembership = await submit('membership_inquiry', '198.51.100.3');
assert.equal(duplicateMembership.status,429,'membership phone cooldown must remain active');
const duplicateGeneral = await submit('main_inquiry', '198.51.100.4');
assert.equal(duplicateGeneral.status,429,'general phone cooldown must remain active');
const partnerUnchanged = await submit('partner_membership', '198.51.100.5', 'partner');
assert.equal(partnerUnchanged.status,429,'partner keeps the original shared phone key');
assert.equal(upstreamRequests.length,2,'only two accepted mocked submissions');
console.log('MEMBERSHIP_CONTACT_MOCK_PASS', JSON.stringify({
  general:first.status,
  sameIp:globalIpLimit.status,
  membership:independentMembership.status,
  duplicateMembership:duplicateMembership.status,
  duplicateGeneral:duplicateGeneral.status,
  partner:partnerUnchanged.status,
  mockedUpstreamCalls:upstreamRequests.length
}));
