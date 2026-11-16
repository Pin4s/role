// Vocabulário do domínio: listas fechadas, rótulos e type guards.
// As listas são a fonte da verdade; os tipos derivam delas.

export const TIPOS = ['show', 'bar', 'festa', 'feira', 'standup', 'esporte', 'cultural'] as const;
export type TipoEvento = (typeof TIPOS)[number];

export const ESTILOS = ['pagode', 'sertanejo', 'forro', 'rock', 'funk', 'mpb', 'sem-musica'] as const;
export type Estilo = (typeof ESTILOS)[number];

export const AMBIENTES = ['dancar', 'conversar', 'universitario', 'ar-livre', 'familia'] as const;
export type Ambiente = (typeof AMBIENTES)[number];

export const PLANOS = ['mural', 'lambe', 'outdoor'] as const;
export type Plano = (typeof PLANOS)[number];

export const FAIXAS_PRECO = ['gratis', 'ate20', '20a50', '50mais'] as const;
export type FaixaPreco = (typeof FAIXAS_PRECO)[number];

export const FAIXAS_DISTANCIA = ['a-pe', 'ate5', 'qualquer'] as const;
export type FaixaDistancia = (typeof FAIXAS_DISTANCIA)[number];

export const ROTULO_TIPO: Record<TipoEvento, string> = {
  show: 'Show',
  bar: 'Bar/mesa',
  festa: 'Festa',
  feira: 'Feira',
  standup: 'Stand-up',
  esporte: 'Esporte',
  cultural: 'Cultural',
};

export const ROTULO_ESTILO: Record<Estilo, string> = {
  pagode: 'Pagode/samba',
  sertanejo: 'Sertanejo',
  forro: 'Forró',
  rock: 'Rock',
  funk: 'Funk/eletrônica',
  mpb: 'MPB',
  'sem-musica': 'Sem música',
};

export const ROTULO_AMBIENTE: Record<Ambiente, string> = {
  dancar: 'Pra dançar',
  conversar: 'Pra conversar',
  universitario: 'Universitário',
  'ar-livre': 'Ao ar livre',
  familia: 'De boa com a família',
};

export const ROTULO_PRECO: Record<FaixaPreco, string> = {
  gratis: '0800',
  ate20: 'Até R$ 20',
  '20a50': 'R$ 20–50',
  '50mais': 'R$ 50+',
};

export const ROTULO_DISTANCIA: Record<FaixaDistancia, string> = {
  'a-pe': 'Dá pra ir a pé',
  ate5: 'Até 5 km',
  qualquer: 'Qualquer lugar',
};

export const ROTULO_PLANO: Record<Plano, string> = {
  mural: 'Mural',
  lambe: 'Lambe',
  outdoor: 'Outdoor',
};

function pertence<T extends string>(lista: readonly T[], valor: string): valor is T {
  return lista.some((item) => item === valor);
}

export const ehTipo = (v: string): v is TipoEvento => pertence(TIPOS, v);
export const ehEstilo = (v: string): v is Estilo => pertence(ESTILOS, v);
export const ehAmbiente = (v: string): v is Ambiente => pertence(AMBIENTES, v);
export const ehPlano = (v: string): v is Plano => pertence(PLANOS, v);
export const ehFaixaPreco = (v: string): v is FaixaPreco => pertence(FAIXAS_PRECO, v);
export const ehFaixaDistancia = (v: string): v is FaixaDistancia => pertence(FAIXAS_DISTANCIA, v);

export interface Evento {
  id: string;
  titulo: string;
  artista: string;
  localId: LocalId;
  /** Dia no formato AAAA-MM-DD, no fuso de Teófilo Otoni. */
  data: string;
  /** HH:MM */
  horaInicio: string;
  /** Em centavos. 0 = grátis (0800). */
  preco: number;
  tipo: TipoEvento;
  estilo: Estilo;
  ambiente: Ambiente[];
  descricao: string;
  destaque: Plano;
  vouCount: number;
  /** true quando foi cadastrado pelo produtor nesse aparelho. */
  novo: boolean;
}

export const LOCAL_IDS = [
  'praca-tiradentes',
  'praca-germanica',
  'parque-exposicoes',
  'expominas',
  'green-bar',
  'chicos-bar',
  'trapiche',
  'butiquim',
  'arena-sports',
  'raynices',
] as const;
export type LocalId = (typeof LOCAL_IDS)[number];
export const ehLocalId = (v: string): v is LocalId => pertence(LOCAL_IDS, v);

export interface Local {
  id: LocalId;
  nome: string;
  /** Nome curto pra caber no cartaz. */
  curto: string;
  bairro: string;
  /** Distância aproximada do centro, em km. Não é medição exata. */
  kmDoCentro: number;
  tipo: string;
}
