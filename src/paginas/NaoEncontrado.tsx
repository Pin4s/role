import { Link } from 'react-router';
import s from './NaoEncontrado.module.css';

export function NaoEncontrado() {
  return (
    <div className={s.pagina}>
      <title>Esse rolê não existe — Rolê</title>
      <p className={s.codigo} aria-hidden="true">
        404
      </p>
      <h1 className={s.titulo}>Esse rolê não existe. Ou já acabou.</h1>
      <p className={s.texto}>Se alguém te mandou esse link, o cartaz já foi arrancado do muro.</p>
      <Link to="/" className={s.botao}>
        Ver o que tá rolando
      </Link>
    </div>
  );
}
