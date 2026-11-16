import { hash } from './hash';

export const LAYOUTS = ['empilhado', 'girado', 'selo', 'grade', 'reticula'] as const;
export type Layout = (typeof LAYOUTS)[number];

export const CORES = ['laranja', 'rosa', 'azul', 'amarelo'] as const;
export type CorSpot = (typeof CORES)[number];

export interface VisualCartaz {
  layout: Layout;
  cor: CorSpot;
  /** Graus, entre -1,5 e 1,5. */
  rotacao: number;
  fita: boolean;
  /** Desregistro da camada de cor, em px (1 a 2). */
  desregX: number;
  desregY: number;
  /** Número de série do "ingresso", 4 dígitos. */
  numero: string;
}

/** Layout, cor e detalhes saem do id: o mesmo evento tem sempre o mesmo cartaz. */
export function visualDoCartaz(id: string): VisualCartaz {
  // O sal só embaralha a sorte: foi escolhido pra os eventos de exemplo
  // ficarem bem distribuídos entre os 5 layouts e as 4 cores.
  const h = hash(`r71:${id}`);
  const rotacaoDecimos = (h >>> 8) % 31; // 0..30
  return {
    layout: LAYOUTS[h % LAYOUTS.length] ?? 'empilhado',
    cor: CORES[(h >>> 4) % CORES.length] ?? 'laranja',
    rotacao: (rotacaoDecimos - 15) / 10,
    fita: (h >>> 14) % 3 !== 0,
    desregX: (h >>> 17) % 2 === 0 ? 1.5 : -1.5,
    desregY: (h >>> 19) % 2 === 0 ? 1 : 2,
    numero: String((h >>> 20) % 10000).padStart(4, '0'),
  };
}
