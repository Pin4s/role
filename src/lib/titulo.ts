// Quebra e dimensiona o título do cartaz pra caber na largura, como um
// cartaz de tipografia montado à mão. Todas as medidas são em % da largura
// do cartaz, então o mesmo cálculo serve pro mural, pra página e pro preview.

export interface Linha {
  texto: string;
  /** Tamanho da fonte em % da largura do cartaz. */
  tamanho: number;
}

export interface Caixa {
  /** Largura disponível, em % da largura do cartaz. */
  largura: number;
  /** Altura máxima do bloco de título, em % da largura do cartaz. */
  alturaMax: number;
  /** Maior tamanho permitido pra uma linha. */
  teto: number;
  maxLinhas: number;
}

const ENTRELINHA = 0.94;

const CONECTORES = new Set([
  'A', 'O', 'AS', 'OS', 'E', 'DE', 'DA', 'DO', 'DAS', 'DOS', 'NA', 'NO', 'NAS', 'NOS',
  'EM', 'À', 'AO', 'COM', 'SEM', 'PRA', 'PRO', 'UM', 'UMA', '&', '+', 'B2B',
]);

// Larguras médias da Anton em "em", usadas até a fonte carregar.
const ESTREITAS = new Set(['I', 'J', '1', '.', ',', ':', ';', '!', "'", ' ', '-']);
const LARGAS = new Set(['M', 'W', 'Ã', 'Â', 'Á', '&']);

function estimar(texto: string): number {
  let total = 0;
  for (const letra of texto) {
    total += ESTREITAS.has(letra) ? 0.24 : LARGAS.has(letra) ? 0.6 : 0.46;
  }
  return total;
}

let contexto: CanvasRenderingContext2D | null = null;
const cache = new Map<string, number>();

/** Largura do texto em "em" na Anton. */
function medir(texto: string, fontePronta: boolean): number {
  if (!fontePronta) return estimar(texto);
  const salvo = cache.get(texto);
  if (salvo !== undefined) return salvo;
  try {
    contexto ??= document.createElement('canvas').getContext('2d');
    if (!contexto) return estimar(texto);
    contexto.font = '400 100px Anton';
    const largura = contexto.measureText(texto).width / 100;
    cache.set(texto, largura);
    return largura;
  } catch {
    return estimar(texto);
  }
}

/** Junta conectores e palavras curtas com a palavra seguinte ("DO SAMBA"). */
function blocos(titulo: string): string[] {
  const palavras = titulo.toLocaleUpperCase('pt-BR').split(/\s+/).filter(Boolean);
  const resultado: string[] = [];
  let pendente: string[] = [];
  for (const palavra of palavras) {
    if (CONECTORES.has(palavra) || palavra.length <= 2) {
      pendente.push(palavra);
      continue;
    }
    resultado.push([...pendente, palavra].join(' '));
    pendente = [];
  }
  if (pendente.length > 0) {
    const ultima = resultado.pop();
    resultado.push([ultima, ...pendente].filter(Boolean).join(' '));
  }
  return resultado;
}

/** Divide os blocos em n linhas minimizando a linha mais larga. */
function particionar(itens: string[], n: number, largura: (s: string) => number): string[] {
  if (n <= 1 || itens.length <= 1) return [itens.join(' ')];
  if (n >= itens.length) return itens.slice();
  let melhor: string[] = [itens.join(' ')];
  let melhorMax = Number.POSITIVE_INFINITY;
  for (let corte = 1; corte <= itens.length - (n - 1); corte++) {
    const primeira = itens.slice(0, corte).join(' ');
    const resto = particionar(itens.slice(corte), n - 1, largura);
    const maior = Math.max(largura(primeira), ...resto.map(largura));
    if (maior < melhorMax) {
      melhorMax = maior;
      melhor = [primeira, ...resto];
    }
  }
  return melhor;
}

function encaixarAltura(linhas: Linha[], alturaMax: number): Linha[] {
  const altura = linhas.reduce((soma, linha) => soma + linha.tamanho * ENTRELINHA, 0);
  if (altura <= alturaMax) return linhas;
  const fator = alturaMax / altura;
  return linhas.map((linha) => ({ ...linha, tamanho: linha.tamanho * fator }));
}

/** Cada linha cresce até encostar nas bordas (título empilhado). */
export function linhasPreenchidas(titulo: string, caixa: Caixa, fontePronta: boolean): Linha[] {
  const largura = (s: string) => medir(s, fontePronta);
  const itens = blocos(titulo);
  if (itens.length === 0) return [];
  const textos = particionar(itens, Math.min(caixa.maxLinhas, itens.length), largura);
  const linhas = textos.map((texto) => ({
    texto,
    tamanho: Math.min(caixa.teto, caixa.largura / Math.max(largura(texto), 0.1)),
  }));
  return encaixarAltura(linhas, caixa.alturaMax);
}

/** Todas as linhas com o mesmo tamanho, escolhendo a quebra que deixa a letra maior. */
export function linhasUniformes(titulo: string, caixa: Caixa, fontePronta: boolean): Linha[] {
  const largura = (s: string) => medir(s, fontePronta);
  const itens = blocos(titulo);
  if (itens.length === 0) return [];
  let melhor: Linha[] = [];
  let melhorTamanho = 0;
  const limite = Math.min(caixa.maxLinhas, itens.length);
  for (let n = 1; n <= limite; n++) {
    const textos = particionar(itens, n, largura);
    const maisLarga = Math.max(...textos.map(largura), 0.1);
    const tamanho = Math.min(
      caixa.teto,
      caixa.largura / maisLarga,
      caixa.alturaMax / (textos.length * ENTRELINHA),
    );
    if (tamanho > melhorTamanho + 0.01) {
      melhorTamanho = tamanho;
      melhor = textos.map((texto) => ({ texto, tamanho }));
    }
  }
  return melhor;
}
