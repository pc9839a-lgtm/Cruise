// One-vs-two cruise staterooms: pure arithmetic and optional page binding.
// No storage, analytics, network requests, or HTML insertion.
export function compareCabinQuotes(oneText, twoText, extraText = '0') {
  const entries = [oneText, twoText, extraText].map(value => String(value).trim());
  if (entries.some(value => value === '')) return {valid: false, difference: null};
  const values = entries.map(Number);
  if (values.some(value => !Number.isFinite(value) || value < 0)) return {valid: false, difference: null};
  return {valid: true, difference: values[1] + values[2] - values[0]};
}

export function formatCabinDifference(result, selectedCurrency = 'KRW') {
  if (!result.valid) return '두 견적과 별도 비용을 모두 0 이상의 숫자로 입력하세요.';
  const currency = ['KRW','USD','EUR'].includes(selectedCurrency) ? selectedCurrency : 'KRW';
  const fmt = new Intl.NumberFormat('ko-KR', {
    style: 'currency', currency, maximumFractionDigits: currency === 'KRW' ? 0 : 2
  });
  if (result.difference > 0) {
    return '4인 1실이 ' + fmt.format(result.difference)
      + ' 저렴합니다. 두 번째 욕실과 공간의 가치를 함께 비교하세요.';
  }
  if (result.difference < 0) {
    return '2인 2실이 ' + fmt.format(-result.difference)
      + ' 저렴합니다. 인접·커넥팅 배정 여부를 확인하세요.';
  }
  return '두 구성의 총 결제액이 같습니다. 침대·욕실·위치·취소 조건으로 선택하세요.';
}

if (typeof document !== 'undefined') {
  const button = document.getElementById('family-run');
  const one = document.getElementById('family-one');
  const two = document.getElementById('family-two');
  const extra = document.getElementById('family-extra');
  const currency = document.getElementById('family-currency');
  const output = document.getElementById('family-result');
  if (button && one && two && extra && currency && output) {
    button.addEventListener('click', () => {
      const result = compareCabinQuotes(one.value, two.value, extra.value);
      output.textContent = formatCabinDifference(result, currency.value);
    });
  }
}
