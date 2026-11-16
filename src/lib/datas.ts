// Datas sempre no fuso de Teófilo Otoni (America/Sao_Paulo).
// Internamente um dia é uma string AAAA-MM-DD; as contas são feitas em UTC
// pra não sofrer com horário de verão nem com o fuso do aparelho.

const FUSO = 'America/Sao_Paulo';

const SIGLAS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
const CURTOS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const NOMES = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

const FORMATO_DIA = new Intl.DateTimeFormat('en-CA', {
  timeZone: FUSO,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function hojeEmTO(agora: Date = new Date()): string {
  const partes = FORMATO_DIA.formatToParts(agora);
  const pegar = (tipo: Intl.DateTimeFormatPartTypes): string =>
    partes.find((parte) => parte.type === tipo)?.value ?? '';
  return `${pegar('year')}-${pegar('month')}-${pegar('day')}`;
}

export function ehDataISO(valor: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(valor);
}

function paraUTC(iso: string): Date {
  const [ano = 1970, mes = 1, dia = 1] = iso.split('-').map(Number);
  return new Date(Date.UTC(ano, mes - 1, dia));
}

export function somarDias(iso: string, dias: number): string {
  const data = paraUTC(iso);
  data.setUTCDate(data.getUTCDate() + dias);
  return data.toISOString().slice(0, 10);
}

export function proximosDias(hoje: string, quantidade = 7): string[] {
  return Array.from({ length: quantidade }, (_, i) => somarDias(hoje, i));
}

export function diaDaSemana(iso: string): number {
  return paraUTC(iso).getUTCDay();
}

/** "SEX" */
export function siglaDia(iso: string): string {
  return SIGLAS[diaDaSemana(iso)] ?? '';
}

/** "sexta" */
export function nomeDia(iso: string): string {
  return NOMES[diaDaSemana(iso)] ?? '';
}

/** "21.11" */
export function diaPontoMes(iso: string): string {
  const [, mes = '', dia = ''] = iso.split('-');
  return `${dia}.${mes}`;
}

/** "21/11" */
export function diaBarraMes(iso: string): string {
  const [, mes = '', dia = ''] = iso.split('-');
  return `${dia}/${mes}`;
}

/** "sexta, 21 de novembro" */
export function dataExtensa(iso: string): string {
  const data = paraUTC(iso);
  const mes = MESES[data.getUTCMonth()] ?? '';
  return `${nomeDia(iso)}, ${data.getUTCDate()} de ${mes}`;
}

/** "Hoje", "Amanhã" ou "Qua". */
export function rotuloRelativo(iso: string, hoje: string): string {
  if (iso === hoje) return 'Hoje';
  if (iso === somarDias(hoje, 1)) return 'Amanhã';
  return CURTOS[diaDaSemana(iso)] ?? '';
}
