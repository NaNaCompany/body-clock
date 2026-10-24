export const TARGET = 10000;
export function measurement(start, end) {
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) throw new RangeError('Incorrect measurement time');
  const elapsed = (end-start)/1000;
  return { elapsed, error: Math.abs(elapsed-10) };
}
export function summarize(rounds) {
  if (rounds.length!==3) throw new RangeError('Three valid measurements are required.');
  const error=rounds.reduce((s,r)=>s+r.error,0)/3;
  return {error, accuracy:Math.max(0,100-error*10), title:error<.2?'An atomic clock inside':error<.6?'Remarkable timing':error<1.2?'A pretty accurate clock':'A free-spirited time traveler'};
}
