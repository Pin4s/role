import { Outlet, ScrollRestoration } from 'react-router';
import { NavInferior } from './NavInferior';
import { Rodape } from './Rodape';
import { Topo } from './Topo';
import s from './Moldura.module.css';

/** Esqueleto de todas as páginas. */
export function Moldura() {
  return (
    <div className={s.moldura}>
      <a href="#conteudo" className={s.pular}>
        Pular pro conteúdo
      </a>
      <Topo />
      <main id="conteudo" className={s.conteudo}>
        <Outlet />
      </main>
      <Rodape />
      <NavInferior />
      <ScrollRestoration />
    </div>
  );
}
