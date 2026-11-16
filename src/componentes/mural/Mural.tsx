import type { Evento } from '../../dominio/tipos';
import { cx } from '../../lib/cx';
import { CartazNoMural } from './CartazNoMural';
import s from './Mural.module.css';

/** Grade estilo muro de lambe-lambe. Outdoor ocupa o espaço de quatro. */
export function Mural({ eventos, rotulo }: { eventos: readonly Evento[]; rotulo: string }) {
  return (
    <ul className={s.mural} aria-label={rotulo}>
      {eventos.map((evento) => (
        <li key={evento.id} className={cx(s.item, evento.destaque === 'outdoor' && s.outdoor)}>
          <CartazNoMural evento={evento} />
        </li>
      ))}
    </ul>
  );
}
