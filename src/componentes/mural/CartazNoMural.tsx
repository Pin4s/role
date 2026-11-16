import { Link } from 'react-router';
import { localPorId } from '../../dados/locais';
import { ROTULO_PLANO, type Evento } from '../../dominio/tipos';
import { useRole } from '../../estado/useRole';
import { cx } from '../../lib/cx';
import { dataExtensa, rotuloRelativo } from '../../lib/datas';
import { horaCartaz, horaTexto, precoCurto } from '../../lib/formato';
import { Cartaz } from '../cartaz/Cartaz';
import { dadosDoCartaz } from '../cartaz/dados';
import s from './Mural.module.css';

function descrever(evento: Evento, vou: boolean): string {
  const local = localPorId(evento.localId);
  const partes = [
    `${evento.titulo}, com ${evento.artista}`,
    `${dataExtensa(evento.data)}, ${horaTexto(evento.horaInicio)}`,
    `${local.nome}, ${local.bairro}`,
    evento.preco === 0 ? 'grátis' : precoCurto(evento.preco),
  ];
  if (evento.destaque !== 'mural') partes.push(`plano ${ROTULO_PLANO[evento.destaque]}`);
  if (evento.novo) partes.push('novo');
  if (vou) partes.push('você marcou que vai');
  return partes.join('. ');
}

/** Um cartaz colado no mural, com a etiqueta de dia, hora e preço embaixo. */
export function CartazNoMural({ evento }: { evento: Evento }) {
  const { hoje, vou } = useRole();
  const marcado = vou.includes(evento.id);
  const local = localPorId(evento.localId);

  return (
    <Link to={`/evento/${evento.id}`} className={s.link} aria-label={descrever(evento, marcado)}>
      <Cartaz
        dados={dadosDoCartaz(evento)}
        plano={evento.destaque}
        novo={evento.novo}
        carimbo={marcado ? 'parado' : 'nenhum'}
        inclinar
        className={s.cartaz}
      />
      <span className={s.etiqueta} aria-hidden="true">
        <span className={s.quando}>
          {rotuloRelativo(evento.data, hoje)} {horaCartaz(evento.horaInicio)}
          <span className={cx(s.preco, evento.preco === 0 && s.gratis)}>{precoCurto(evento.preco)}</span>
        </span>
        <span className={s.onde}>
          {local.curto} · {local.bairro}
        </span>
      </span>
    </Link>
  );
}
