import { NavLink } from 'react-router';
import { useRole } from '../../estado/useRole';
import { cx } from '../../lib/cx';
import { Icone } from '../Icone';
import { ITENS_NAV } from './itensNav';
import s from './NavInferior.module.css';

/** Barra fixa no rodapé do celular. Some no desktop, onde o topo tem os links. */
export function NavInferior() {
  const { salvos, eventos } = useRole();
  const totalSalvos = eventos.filter((evento) => salvos.includes(evento.id)).length;

  return (
    <nav className={s.nav} aria-label="Principal">
      <ul className={s.lista}>
        {ITENS_NAV.map((item) => (
          <li key={item.para}>
            <NavLink
              to={item.para}
              end={item.exato}
              className={({ isActive }) => cx(s.link, isActive && s.ativo)}
            >
              <span className={s.icone}>
                <Icone nome={item.icone} tamanho={22} />
                {item.para === '/salvos' && totalSalvos > 0 && (
                  <span className={s.contador}>
                    {totalSalvos}
                    <span className="sr-only"> salvos</span>
                  </span>
                )}
              </span>
              {item.rotulo}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
