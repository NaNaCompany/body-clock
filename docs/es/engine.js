export const TARGET = 10000;
export function measurement(start, end) {
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) throw new RangeError('Tiempo de medición incorrecto');
  const elapsed = (end-start)/1000;
  return { elapsed, error: Math.abs(elapsed-10) };
}
export function summarize(rounds) {
  if (rounds.length!==3) throw new RangeError('Se requieren tres mediciones válidas.');
  const error=rounds.reduce((s,r)=>s+r.error,0)/3;
  return {error, accuracy:Math.max(0,100-error*10), title:error<.2?'Llevas un reloj atómico':error<.6?'Un sentido del tiempo increíble':error<1.2?'Un reloj bastante preciso':'Viajero del tiempo a tu aire'};
}
