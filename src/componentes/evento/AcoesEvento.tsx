import { localPorId } from '../../dados/locais';
import type { Evento } from '../../dominio/tipos';
import { cx } from '../../lib/cx';
import { dataExtensa } from '../../lib/datas';
import { horaTexto, plural, precoCurto } from '../../lib/formato';
import { Icone } from '../Icone';
import s from './AcoesEvento.module.css';

interface Props {
  evento: Evento;
  vou: boolean;
  salvo: boolean;
  acabouDeMarcar: boolean;
  aoVou: () => void;
  aoSalvar: () => void;
}

function linkZap(evento: Evento): string {
  const local = localPorId(evento.localId);
  const url = `${window.location.origin}/evento/${evento.id}`;
  const preco = evento.preco === 0 ? '0800' : precoCurto(evento.preco);
  const texto = [
    `Bora? ${evento.titulo.toLocaleUpperCase('pt-BR')} — ${evento.artista}`,
    `${dataExtensa(evento.data)}, ${horaTexto(evento.horaInicio)} · ${local.nome}`,
    preco,
    `Vi no Rolê: ${url}`,
  ].join('\n');
  return `https://wa.me/?text=${encodeURIComponent(texto)}`;
}

function linkMapa(evento: Evento): string {
  const local = localPorId(evento.localId);
  const busca = `${local.nome}, Teófilo Otoni MG`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(busca)}`;
}

export function AcoesEvento({ evento, vou, salvo, acabouDeMarcar, aoVou, aoSalvar }: Props) {
  const total = evento.vouCount + (vou ? 1 : 0);

  return (
    <div className={s.acoes}>
      <button type="button" className={cx(s.vou, vou && s.vouMarcado)} aria-pressed={vou} onClick={aoVou}>
        <span className={s.vouTexto}>{vou ? 'Tô dentro' : 'Vou'}</span>
        <span className={s.vouConta}>{plural(total, 'vai', 'vão')}</span>
      </button>
      <p className={s.confirmacao} aria-live="polite">
        {vou && acabouDeMarcar ? 'Fechou. Te vejo lá.' : ''}
        {vou && !acabouDeMarcar ? 'Você marcou que vai. Toca de novo se desistir.' : ''}
      </p>

      <div className={s.secundarias}>
        <button type="button" className={cx(s.secundaria, salvo && s.salvo)} aria-pressed={salvo} onClick={aoSalvar}>
          <Icone nome="salvos" />
          {salvo ? 'Salvo' : 'Salvar'}
        </button>
        <a className={s.secundaria} href={linkZap(evento)} target="_blank" rel="noopener noreferrer">
          <Icone nome="zap" />
          Mandar no zap
          <span className="sr-only">(abre o WhatsApp)</span>
        </a>
        <a className={s.secundaria} href={linkMapa(evento)} target="_blank" rel="noopener noreferrer">
          <Icone nome="mapa" />
          Como chegar
          <span className="sr-only">(abre o Google Maps)</span>
        </a>
      </div>
    </div>
  );
}
