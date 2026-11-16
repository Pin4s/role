import { localPorId } from '../../dados/locais';
import { ROTULO_AMBIENTE, ROTULO_ESTILO, ROTULO_TIPO, type Evento } from '../../dominio/tipos';
import { cx } from '../../lib/cx';
import { dataExtensa, diaPontoMes, siglaDia } from '../../lib/datas';
import { distanciaAproximada, horaTexto, precoCurto } from '../../lib/formato';
import { visualDoCartaz } from '../../lib/visualCartaz';
import cores from '../cartaz/cores.module.css';
import s from './Ingresso.module.css';

/** Informações do evento num ingresso com picote e canhoto. */
export function Ingresso({ evento }: { evento: Evento }) {
  const local = localPorId(evento.localId);
  const visual = visualDoCartaz(evento.id);
  const ambientes = evento.ambiente.map((a) => ROTULO_AMBIENTE[a]).join(', ');

  return (
    <div className={s.sombra}>
      <section className={cx(s.ingresso, cores[visual.cor])} aria-labelledby="titulo-evento">
        <div className={s.principal}>
          <p className={s.admite}>Rolê · admite 1 · {ROTULO_TIPO[evento.tipo]}</p>
          <h1 id="titulo-evento" className={s.titulo}>
            {evento.titulo}
          </h1>
          <p className={s.artista}>{evento.artista}</p>
          <dl className={s.campos}>
            <div>
              <dt>Data</dt>
              <dd>{dataExtensa(evento.data)}</dd>
            </div>
            <div>
              <dt>Hora</dt>
              <dd>{horaTexto(evento.horaInicio)}</dd>
            </div>
            <div className={s.largo}>
              <dt>Local</dt>
              <dd>{local.nome}</dd>
            </div>
            <div className={s.largo}>
              <dt>Bairro</dt>
              <dd>
                {local.bairro} <span className={s.aprox}>({distanciaAproximada(local.kmDoCentro)})</span>
              </dd>
            </div>
            <div>
              <dt>Preço</dt>
              <dd>{evento.preco === 0 ? '0800, de graça' : precoCurto(evento.preco)}</dd>
            </div>
            <div>
              <dt>Estilo</dt>
              <dd>{ROTULO_ESTILO[evento.estilo]}</dd>
            </div>
            {ambientes && (
              <div className={s.largo}>
                <dt>Ambiente</dt>
                <dd>{ambientes}</dd>
              </div>
            )}
          </dl>
        </div>
        <div className={s.canhoto} aria-hidden="true">
          <span className={s.numero}>Nº {visual.numero}</span>
          <span className={s.vertical}>
            {siglaDia(evento.data)} {diaPontoMes(evento.data)}
          </span>
          <span className={s.precoCanhoto}>{precoCurto(evento.preco)}</span>
        </div>
      </section>
    </div>
  );
}
