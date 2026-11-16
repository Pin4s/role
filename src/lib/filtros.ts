import { localPorId } from '../dados/locais';
import {
  ROTULO_AMBIENTE,
  ROTULO_DISTANCIA,
  ROTULO_ESTILO,
  ROTULO_PRECO,
  ROTULO_TIPO,
  ehAmbiente,
  ehEstilo,
  ehFaixaDistancia,
  ehFaixaPreco,
  ehTipo,
  type Ambiente,
  type Estilo,
  type Evento,
  type FaixaDistancia,
  type FaixaPreco,
  type TipoEvento,
} from '../dominio/tipos';

// Os 5 filtros do feed. Dentro de um grupo vale "qualquer um" (OU);
// entre grupos, todos precisam bater (E). Distância é escolha única.
// O estado mora na URL, então voltar da página do evento mantém os filtros.

export interface Filtros {
  tipos: TipoEvento[];
  precos: FaixaPreco[];
  distancia: FaixaDistancia;
  estilos: Estilo[];
  ambientes: Ambiente[];
}

export const FILTROS_VAZIOS: Filtros = {
  tipos: [],
  precos: [],
  distancia: 'qualquer',
  estilos: [],
  ambientes: [],
};

const PARAM = {
  tipos: 'tipo',
  precos: 'preco',
  distancia: 'dist',
  estilos: 'estilo',
  ambientes: 'amb',
} as const;

function lista(params: URLSearchParams, nome: string): string[] {
  return (params.get(nome) ?? '').split(',').filter(Boolean);
}

export function lerFiltros(params: URLSearchParams): Filtros {
  const distancia = params.get(PARAM.distancia) ?? '';
  return {
    tipos: lista(params, PARAM.tipos).filter(ehTipo),
    precos: lista(params, PARAM.precos).filter(ehFaixaPreco),
    distancia: ehFaixaDistancia(distancia) ? distancia : 'qualquer',
    estilos: lista(params, PARAM.estilos).filter(ehEstilo),
    ambientes: lista(params, PARAM.ambientes).filter(ehAmbiente),
  };
}

/** Devolve novos parâmetros com os filtros, preservando os outros (ex.: dia). */
export function escreverFiltros(atuais: URLSearchParams, filtros: Filtros): URLSearchParams {
  const params = new URLSearchParams(atuais);
  const definir = (nome: string, valores: readonly string[]) => {
    if (valores.length > 0) params.set(nome, valores.join(','));
    else params.delete(nome);
  };
  definir(PARAM.tipos, filtros.tipos);
  definir(PARAM.precos, filtros.precos);
  definir(PARAM.distancia, filtros.distancia === 'qualquer' ? [] : [filtros.distancia]);
  definir(PARAM.estilos, filtros.estilos);
  definir(PARAM.ambientes, filtros.ambientes);
  return params;
}

export function faixaDoPreco(centavos: number): FaixaPreco {
  if (centavos <= 0) return 'gratis';
  if (centavos <= 2000) return 'ate20';
  if (centavos < 5000) return '20a50';
  return '50mais';
}

function cabeNaDistancia(km: number, faixa: FaixaDistancia): boolean {
  if (faixa === 'a-pe') return km <= 1.5;
  if (faixa === 'ate5') return km <= 5;
  return true;
}

export function passaNoFiltro(evento: Evento, filtros: Filtros): boolean {
  const { tipos, precos, distancia, estilos, ambientes } = filtros;
  if (tipos.length > 0 && !tipos.includes(evento.tipo)) return false;
  if (precos.length > 0 && !precos.includes(faixaDoPreco(evento.preco))) return false;
  if (!cabeNaDistancia(localPorId(evento.localId).kmDoCentro, distancia)) return false;
  if (estilos.length > 0 && !estilos.includes(evento.estilo)) return false;
  if (ambientes.length > 0 && !ambientes.some((a) => evento.ambiente.includes(a))) return false;
  return true;
}

export type ChipAtivo =
  | { grupo: 'tipos'; valor: TipoEvento }
  | { grupo: 'precos'; valor: FaixaPreco }
  | { grupo: 'distancia'; valor: FaixaDistancia }
  | { grupo: 'estilos'; valor: Estilo }
  | { grupo: 'ambientes'; valor: Ambiente };

export function chipsAtivos(filtros: Filtros): ChipAtivo[] {
  const chips: ChipAtivo[] = [
    ...filtros.tipos.map((valor): ChipAtivo => ({ grupo: 'tipos', valor })),
    ...filtros.precos.map((valor): ChipAtivo => ({ grupo: 'precos', valor })),
    ...filtros.estilos.map((valor): ChipAtivo => ({ grupo: 'estilos', valor })),
    ...filtros.ambientes.map((valor): ChipAtivo => ({ grupo: 'ambientes', valor })),
  ];
  if (filtros.distancia !== 'qualquer') chips.push({ grupo: 'distancia', valor: filtros.distancia });
  return chips;
}

export function rotuloDoChip(chip: ChipAtivo): string {
  switch (chip.grupo) {
    case 'tipos':
      return ROTULO_TIPO[chip.valor];
    case 'precos':
      return ROTULO_PRECO[chip.valor];
    case 'distancia':
      return ROTULO_DISTANCIA[chip.valor];
    case 'estilos':
      return ROTULO_ESTILO[chip.valor];
    case 'ambientes':
      return ROTULO_AMBIENTE[chip.valor];
  }
}

export function removerChip(filtros: Filtros, chip: ChipAtivo): Filtros {
  switch (chip.grupo) {
    case 'tipos':
      return { ...filtros, tipos: filtros.tipos.filter((v) => v !== chip.valor) };
    case 'precos':
      return { ...filtros, precos: filtros.precos.filter((v) => v !== chip.valor) };
    case 'distancia':
      return { ...filtros, distancia: 'qualquer' };
    case 'estilos':
      return { ...filtros, estilos: filtros.estilos.filter((v) => v !== chip.valor) };
    case 'ambientes':
      return { ...filtros, ambientes: filtros.ambientes.filter((v) => v !== chip.valor) };
  }
}

export function alternar<T>(lista: readonly T[], valor: T): T[] {
  return lista.includes(valor) ? lista.filter((item) => item !== valor) : [...lista, valor];
}
