export const TARGET = 10000;
export function measurement(start, end) {
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) throw new RangeError('测量时间不正确');
  const elapsed = (end-start)/1000;
  return { elapsed, error: Math.abs(elapsed-10) };
}
export function summarize(rounds) {
  if (rounds.length!==3) throw new RangeError('需要三个有效测量.');
  const error=rounds.reduce((s,r)=>s+r.error,0)/3;
  return {error, accuracy:Math.max(0,100-error*10), title:error<.2?'身体里藏着原子钟':error<.6?'惊人的时间感':error<1.2?'相当准确的时钟':'自由的时间旅人'};
}
