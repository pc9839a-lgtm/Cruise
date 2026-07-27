(() => {
  'use strict';

  const endpoint = 'https://fxapi.app/api/USD/KRW.json';
  const cacheKey = 'cruiseplay.usdkrw.latest';
  const refreshMs = 5 * 60 * 1000;
  const maxCacheAgeMs = 24 * 60 * 60 * 1000;
  const targets = Array.from(document.querySelectorAll('[data-live-krw]'));

  if (!targets.length) return;

  const formatKoreanWon = (value) => {
    const rounded = Math.round(value / 10000) * 10000;
    const eok = Math.floor(rounded / 100000000);
    const man = Math.floor((rounded % 100000000) / 10000);

    if (eok > 0 && man > 0) return `${eok.toLocaleString('ko-KR')}억 ${man.toLocaleString('ko-KR')}만 원`;
    if (eok > 0) return `${eok.toLocaleString('ko-KR')}억 원`;
    if (man > 0) return `${man.toLocaleString('ko-KR')}만 원`;
    return `${rounded.toLocaleString('ko-KR')}원`;
  };

  const render = (rate, sourceTimestamp) => {
    targets.forEach((target) => {
      const usd = Number(target.dataset.liveKrw);
      if (!Number.isFinite(usd) || usd <= 0) return;

      target.textContent = `(약 ${formatKoreanWon(usd * rate)})`;
      target.hidden = false;
      target.title = `1달러 = ${rate.toLocaleString('ko-KR', { maximumFractionDigits: 2 })}원${sourceTimestamp ? ` · ${sourceTimestamp} 기준` : ''}`;
    });
  };

  const readCache = () => {
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
      if (!cached || !Number.isFinite(cached.rate) || !Number.isFinite(cached.savedAt)) return null;
      if (Date.now() - cached.savedAt > maxCacheAgeMs) return null;
      return cached;
    } catch {
      return null;
    }
  };

  const saveCache = (rate, timestamp) => {
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ rate, timestamp, savedAt: Date.now() }));
    } catch {
      // Storage is optional. The live response still renders normally.
    }
  };

  const loadRate = async () => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 6000);

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        cache: 'no-store',
        signal: controller.signal,
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error(`FX request failed: ${response.status}`);

      const data = await response.json();
      const rate = Number(data.rate);
      if (!Number.isFinite(rate) || rate < 500 || rate > 3000) throw new Error('Invalid USD/KRW rate');

      const timestamp = typeof data.timestamp === 'string' ? data.timestamp : '';
      render(rate, timestamp);
      saveCache(rate, timestamp);
    } catch {
      const cached = readCache();
      if (cached) render(cached.rate, cached.timestamp || '최근 저장 환율');
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  loadRate();
  window.setInterval(loadRate, refreshMs);
})();
