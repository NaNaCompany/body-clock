export const TARGET = 10000;
export function measurement(start, end) {
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) throw new RangeError('잘못된 측정 시간');
  const elapsed = (end-start)/1000;
  return { elapsed, error: Math.abs(elapsed-10) };
}
export function summarize(rounds) {
  if (rounds.length!==3) throw new RangeError('세 번의 유효한 측정이 필요합니다.');
  const error=rounds.reduce((s,r)=>s+r.error,0)/3;
  return {error, accuracy:Math.max(0,100-error*10), title:error<.2?'몸속에 원자시계':error<.6?'놀라운 시간 감각':error<1.2?'제법 정확한 시계':'자유로운 시간 여행자'};
}
