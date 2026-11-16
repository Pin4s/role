import type { Ambiente, Estilo, Evento, LocalId, Plano, TipoEvento } from '../dominio/tipos';

// O formulário do produtor: estado, validação e conversão pra Evento.

export interface Rascunho {
  id: string;
  titulo: string;
  artista: string;
  localId: LocalId | '';
  data: string;
  horaInicio: string;
  /** Texto digitado, em reais. Vazio = 0800. */
  preco: string;
  tipo: TipoEvento;
  estilo: Estilo | '';
  ambiente: Ambiente[];
  descricao: string;
  plano: Plano;
}

export type CampoComErro = 'titulo' | 'artista' | 'localId' | 'horaInicio' | 'preco' | 'estilo';
export type Erros = Partial<Record<CampoComErro, string>>;

/** Ordem em que os campos aparecem, pra focar o primeiro com erro. */
export const ORDEM_DOS_CAMPOS: readonly CampoComErro[] = ['titulo', 'artista', 'localId', 'horaInicio', 'preco', 'estilo'];

export function novoId(): string {
  return `novo-${Date.now().toString(36)}${Math.floor(Math.random() * 1296).toString(36)}`;
}

export function rascunhoVazio(data: string): Rascunho {
  return {
    id: novoId(),
    titulo: '',
    artista: '',
    localId: '',
    data,
    horaInicio: '21:00',
    preco: '',
    tipo: 'show',
    estilo: '',
    ambiente: [],
    descricao: '',
    plano: 'mural',
  };
}

/** Reais digitados → centavos. null se não for um preço válido. */
export function precoEmCentavos(texto: string): number | null {
  const limpo = texto.trim().replace(',', '.');
  if (limpo === '') return 0;
  if (!/^\d+(\.\d{1,2})?$/.test(limpo)) return null;
  const centavos = Math.round(Number(limpo) * 100);
  return centavos <= 100000 ? centavos : null;
}

export function validar(rascunho: Rascunho): Erros {
  const erros: Erros = {};
  if (rascunho.titulo.trim().length < 3) erros.titulo = 'Dá um nome pro rolê (pelo menos 3 letras).';
  if (rascunho.artista.trim() === '') erros.artista = 'Quem toca ou quem faz? Pode ser "DJ da casa".';
  if (rascunho.localId === '') erros.localId = 'Escolhe onde vai ser.';
  if (!/^\d{2}:\d{2}$/.test(rascunho.horaInicio)) erros.horaInicio = 'Coloca a hora que começa.';
  if (precoEmCentavos(rascunho.preco) === null) erros.preco = 'Preço só com número, tipo 15 ou 12,50.';
  if (rascunho.estilo === '') erros.estilo = 'Escolhe o estilo (ou "Sem música").';
  return erros;
}

/** Converte um rascunho já validado. null se ainda faltar algo. */
export function paraEvento(rascunho: Rascunho): Evento | null {
  const preco = precoEmCentavos(rascunho.preco);
  if (rascunho.localId === '' || rascunho.estilo === '' || preco === null) return null;
  return {
    id: rascunho.id,
    titulo: rascunho.titulo.trim(),
    artista: rascunho.artista.trim(),
    localId: rascunho.localId,
    data: rascunho.data,
    horaInicio: rascunho.horaInicio,
    preco,
    tipo: rascunho.tipo,
    estilo: rascunho.estilo,
    ambiente: rascunho.ambiente,
    descricao: rascunho.descricao.trim(),
    destaque: rascunho.plano,
    vouCount: 0,
    novo: true,
  };
}
