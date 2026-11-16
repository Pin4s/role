import { Link } from 'react-router';
import { Mural } from '../componentes/mural/Mural';
import { useRole } from '../estado/useRole';
import { plural } from '../lib/formato';
import s from './Salvos.module.css';

export function Salvos() {
  const { eventos, salvos, vou } = useRole();
  const lista = eventos.filter((evento) => salvos.includes(evento.id));
  const vaiEm = eventos.filter((evento) => vou.includes(evento.id)).length;

  return (
    <div className={s.pagina}>
      <title>Salvos — Rolê</title>
      <header className={s.cabecalho}>
        <h1 className={s.titulo}>Salvos</h1>
        <p className={s.texto}>
          {lista.length > 0
            ? `${plural(lista.length, 'cartaz guardado', 'cartazes guardados')} pra essa semana.`
            : 'Os cartazes que você salvar ficam aqui.'}
          {vaiEm > 0 && ` Você marcou que vai em ${plural(vaiEm, 'rolê', 'rolês')}.`}
        </p>
      </header>

      {lista.length > 0 ? (
        <Mural eventos={lista} rotulo="Cartazes salvos" />
      ) : (
        <div className={s.vazio}>
          <p className={s.vazioTitulo}>Nada salvo ainda.</p>
          <p className={s.vazioTexto}>Viu um cartaz bom? Abre ele e toca em Salvar pra não esquecer.</p>
          <Link to="/" className={s.botao}>
            Ir pro mural
          </Link>
        </div>
      )}
    </div>
  );
}
