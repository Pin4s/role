import type { Evento, Plano } from '../dominio/tipos';

const PESO: Record<Plano, number> = { outdoor: 0, lambe: 1, mural: 2 };

/** Destaque pago primeiro (Outdoor, depois Lambe); o resto por dia e hora. */
export function ordenarPorDestaque(eventos: readonly Evento[]): Evento[] {
  return [...eventos].sort(
    (a, b) =>
      PESO[a.destaque] - PESO[b.destaque] ||
      a.data.localeCompare(b.data) ||
      a.horaInicio.localeCompare(b.horaInicio),
  );
}
