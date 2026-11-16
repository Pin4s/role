import {
  ehAmbiente,
  ehEstilo,
  ehLocalId,
  ehPlano,
  ehTipo,
  type Ambiente,
  type Evento,
} from '../dominio/tipos';
import { ehDataISO } from './datas';

// localStorage com try/catch em tudo: em aba anônima ou com armazenamento
// bloqueado o app continua funcionando, só não lembra de nada.

const CHAVES = {
  salvos: 'role.salvos.v1',
  vou: 'role.vou.v1',
  criados: 'role.criados.v1',
} as const;

function ler(chave: string): unknown {
  try {
    const bruto = window.localStorage.getItem(chave);
    return bruto === null ? null : JSON.parse(bruto);
  } catch {
    return null;
  }
}

function gravar(chave: string, valor: unknown): void {
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // Sem armazenamento: segue só na memória.
  }
}

function listaDeTextos(valor: unknown): string[] {
  if (!Array.isArray(valor)) return [];
  return valor.filter((item): item is string => typeof item === 'string');
}

function textoOu(valor: unknown, padrao: string): string {
  return typeof valor === 'string' ? valor : padrao;
}

function numeroOu(valor: unknown, padrao: number): number {
  return typeof valor === 'number' && Number.isFinite(valor) ? valor : padrao;
}

/** Valida campo a campo um evento vindo do armazenamento. */
function paraEvento(valor: unknown): Evento | null {
  if (typeof valor !== 'object' || valor === null) return null;
  if (!('id' in valor) || typeof valor.id !== 'string') return null;
  if (!('localId' in valor) || typeof valor.localId !== 'string' || !ehLocalId(valor.localId)) return null;
  if (!('data' in valor) || typeof valor.data !== 'string' || !ehDataISO(valor.data)) return null;
  if (!('tipo' in valor) || typeof valor.tipo !== 'string' || !ehTipo(valor.tipo)) return null;
  if (!('estilo' in valor) || typeof valor.estilo !== 'string' || !ehEstilo(valor.estilo)) return null;
  if (!('destaque' in valor) || typeof valor.destaque !== 'string' || !ehPlano(valor.destaque)) return null;

  const ambiente: Ambiente[] =
    'ambiente' in valor ? listaDeTextos(valor.ambiente).filter(ehAmbiente) : [];

  return {
    id: valor.id,
    titulo: textoOu('titulo' in valor ? valor.titulo : null, 'Sem título'),
    artista: textoOu('artista' in valor ? valor.artista : null, ''),
    localId: valor.localId,
    data: valor.data,
    horaInicio: textoOu('horaInicio' in valor ? valor.horaInicio : null, '21:00'),
    preco: numeroOu('preco' in valor ? valor.preco : null, 0),
    tipo: valor.tipo,
    estilo: valor.estilo,
    ambiente,
    descricao: textoOu('descricao' in valor ? valor.descricao : null, ''),
    destaque: valor.destaque,
    vouCount: numeroOu('vouCount' in valor ? valor.vouCount : null, 0),
    novo: true,
  };
}

export function lerSalvos(): string[] {
  return listaDeTextos(ler(CHAVES.salvos));
}

export function gravarSalvos(ids: string[]): void {
  gravar(CHAVES.salvos, ids);
}

export function lerVou(): string[] {
  return listaDeTextos(ler(CHAVES.vou));
}

export function gravarVou(ids: string[]): void {
  gravar(CHAVES.vou, ids);
}

export function lerCriados(): Evento[] {
  const bruto = ler(CHAVES.criados);
  if (!Array.isArray(bruto)) return [];
  return bruto.map(paraEvento).filter((evento): evento is Evento => evento !== null);
}

export function gravarCriados(eventos: Evento[]): void {
  gravar(CHAVES.criados, eventos);
}
