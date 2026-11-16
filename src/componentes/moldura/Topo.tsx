import { Link, NavLink } from 'react-router';
import { cx } from '../../lib/cx';
import { Logo } from './Logo';
import { ITENS_NAV } from './itensNav';
import s from './Topo.module.css';

export function Topo() {
  return (
    <header className={s.topo}>
      <div className={s.miolo}>
        <Link to="/" className={s.marca} aria-label="Rolê, voltar pra agenda">
          <Logo />
        </Link>
        <p className={s.cidade}>
          Teófilo Otoni
          <span> · MG</span>
        </p>
        <nav className={s.nav} aria-label="Principal">
          <ul>
            {ITENS_NAV.map((item) => (
              <li key={item.para}>
                <NavLink
                  to={item.para}
                  end={item.exato}
                  className={({ isActive }) => cx(s.link, isActive && s.ativo)}
                >
                  {item.rotulo}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
