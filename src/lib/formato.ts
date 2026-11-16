// Formatação de preço, hora e distância no jeito do Rolê.

/** 0 → "0800"; 1500 → "R$ 15"; 1250 → "R$ 12,50". Recebe centavos. */
export function precoCurto(centavos: number): string {
  if (centavos <= 0) return '0800';
  const reais = centavos / 100;
  const texto = Number.isInteger(reais)
    ? String(reais)
    : reais.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `R$ ${texto}`;
}

/** "21:00" → "21H"; "21:30" → "21H30". */
export function horaCartaz(hora: string): string {
  const [h = '', m = '00'] = hora.split(':');
  return m === '00' ? `${h}H` : `${h}H${m}`;
}

/** "21:00" → "21h"; "21:30" → "21h30". */
export function horaTexto(hora: string): string {
  return horaCartaz(hora).toLowerCase();
}

/** Distância aproximada: nunca apresenta como medição exata. */
export function distanciaAproximada(km: number): string {
  if (km < 0.3) return 'no centro';
  const texto = km.toLocaleString('pt-BR', { maximumFractionDigits: 1 });
  return `~${texto} km do centro`;
}

export function plural(n: number, singular: string, pluralTexto: string): string {
  return `${n} ${n === 1 ? singular : pluralTexto}`;
}
