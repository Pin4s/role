import { localPorId } from '../../dados/locais';
import { ROTULO_TIPO, type Evento, type TipoEvento } from '../../dominio/tipos';
import { diaPontoMes, siglaDia } from '../../lib/datas';
import { horaCartaz, precoCurto } from '../../lib/formato';

/** Tudo que um cartaz precisa saber, já no formato de impressão. */
export interface DadosCartaz {
  id: string;
  titulo: string;
  artista: string;
  /** "SEX" */
  dia: string;
  /** "21.11" */
  data: string;
  /** "21H" */
  hora: string;
  /** "R$ 20" ou "0800" */
  preco: string;
  /** "SHOW" */
  tipo: string;
  /** "GREEN BAR" */
  local: string;
  /** "CENTRO" */
  bairro: string;
}

interface Campos {
  id: string;
  titulo: string;
  artista: string;
  data: string;
  horaInicio: string;
  preco: number;
  tipo: TipoEvento;
  localId: Evento['localId'];
}

export function dadosDoCartaz(campos: Campos): DadosCartaz {
  const local = localPorId(campos.localId);
  const maiusculo = (texto: string) => texto.toLocaleUpperCase('pt-BR');
  return {
    id: campos.id,
    titulo: campos.titulo,
    artista: campos.artista,
    dia: siglaDia(campos.data),
    data: diaPontoMes(campos.data),
    hora: horaCartaz(campos.horaInicio),
    preco: precoCurto(campos.preco),
    tipo: maiusculo(ROTULO_TIPO[campos.tipo]),
    local: maiusculo(local.curto),
    bairro: maiusculo(local.bairro),
  };
}
