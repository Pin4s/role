// Poucos ícones, desenhados à mão: traço torto de propósito, como caneta.

export type NomeIcone =
  | 'agenda'
  | 'salvos'
  | 'divulgar'
  | 'sobre'
  | 'filtro'
  | 'fechar'
  | 'zap'
  | 'mapa'
  | 'voltar'
  | 'seta'
  | 'check';

const TRACOS: Record<NomeIcone, string[]> = {
  agenda: ['M4.5 6.2 L19.4 5.6 L19.8 19.6 L4.2 20 Z', 'M4.4 10.2 L19.6 9.8', 'M8.5 3.4 L8.7 7.4', 'M15.4 3.3 L15.5 7.2', 'M8 14 L10 13.9 M14 14.1 L16.2 14 M8.2 16.9 L10.1 16.9'],
  salvos: ['M9 3.6 L15.2 3.8 L14.4 9.6 L17.6 12.4 L6.6 12.6 L9.6 9.6 Z', 'M12.1 12.7 L11.8 20.8'],
  divulgar: ['M4 10.2 L4.3 14.4 L8 14.2 L16.8 18.6 L16.4 5.4 L8 9.9 Z', 'M8 14.2 L9.4 19.4 L11.6 19', 'M19.4 9.5 L20.8 8.8 M19.6 12.2 L21.2 12.2 M19.4 14.9 L20.6 15.6'],
  sobre: ['M6 3.8 L14.6 3.6 L18.4 7.6 L18.2 20.4 L5.8 20.2 Z', 'M14.6 3.6 L14.4 7.8 L18.4 7.6', 'M8.6 11.4 L15.4 11.2 M8.6 14.6 L15 14.6 M8.6 17.6 L12.6 17.5'],
  filtro: ['M3.8 7 L20.2 7.2', 'M3.8 12.2 L20.2 12', 'M3.8 17.2 L20.2 17.4'],
  fechar: ['M6 6.2 L18 17.8', 'M17.8 6 L6.2 18'],
  zap: ['M4.6 11.6 C4.6 7.2 8 4.6 12.2 4.6 C16.6 4.6 19.6 7.4 19.6 11.4 C19.6 15.6 16.2 18.2 12 18.2 C10.8 18.2 9.8 18 8.8 17.6 L4.6 19.4 L5.8 15.6 C5 14.4 4.6 13 4.6 11.6 Z'],
  mapa: ['M12 21 C12 21 5.6 14.6 5.6 9.8 C5.6 6 8.4 3.4 12 3.4 C15.6 3.4 18.4 6 18.4 9.8 C18.4 14.6 12 21 12 21 Z', 'M12 7.6 C13.4 7.6 14.3 8.6 14.3 9.9 C14.3 11.2 13.3 12.1 12 12.1 C10.7 12.1 9.8 11.1 9.8 9.9 C9.8 8.5 10.7 7.6 12 7.6 Z'],
  voltar: ['M19.6 12.2 L4.8 11.8', 'M10.2 6.2 L4.6 11.8 L10.4 17.6'],
  seta: ['M4.6 12 L19.2 12.2', 'M13.8 6.4 L19.4 12.2 L13.6 17.8'],
  check: ['M4.6 12.8 L9.6 17.6 L19.6 6.4'],
};

/** Botõezinhos do filtro (desenhados por cima das linhas). */
const BOLINHAS: Partial<Record<NomeIcone, [number, number][]>> = {
  filtro: [
    [9, 7.1],
    [15.6, 12.1],
    [7.4, 17.3],
  ],
};

interface Props {
  nome: NomeIcone;
  tamanho?: number;
  className?: string;
}

export function Icone({ nome, tamanho = 24, className }: Props) {
  return (
    <svg
      className={className}
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {TRACOS[nome].map((d) => (
        <path key={d} d={d} />
      ))}
      {BOLINHAS[nome]?.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2.1} fill="var(--papel)" />
      ))}
    </svg>
  );
}
