import type { Evento } from '../../dominio/tipos';
import { ordenarPorDestaque } from '../../lib/ordem';
import { CartazNoMural } from '../mural/CartazNoMural';
import s from './MaisRole.module.css';

/** Até 3 cartazes do mesmo dia; se faltar, completa com os próximos da semana. */
export function MaisRole({ evento, eventos }: { evento: Evento; eventos: readonly Evento[] }) {
  const outros = eventos.filter((e) => e.id !== evento.id);
  const mesmoDia = ordenarPorDestaque(outros.filter((e) => e.data === evento.data));
  const depois = outros.filter((e) => e.data > evento.data);
  const escolhidos = [...mesmoDia, ...depois].slice(0, 3);
  if (escolhidos.length === 0) return null;

  const soDoDia = escolhidos.every((e) => e.data === evento.data);

  return (
    <section className={s.secao} aria-labelledby="mais-role">
      <h2 id="mais-role" className={s.titulo}>
        {soDoDia ? 'Mais rolê nesse dia' : 'Mais rolê essa semana'}
      </h2>
      <ul className={s.lista}>
        {escolhidos.map((e) => (
          <li key={e.id} className={s.item}>
            <CartazNoMural evento={e} />
          </li>
        ))}
      </ul>
    </section>
  );
}
