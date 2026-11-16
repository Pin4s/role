import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { Cartaz } from '../componentes/cartaz/Cartaz';
import { dadosDoCartaz } from '../componentes/cartaz/dados';
import { AcoesEvento } from '../componentes/evento/AcoesEvento';
import { Ingresso } from '../componentes/evento/Ingresso';
import { MaisRole } from '../componentes/evento/MaisRole';
import { Icone } from '../componentes/Icone';
import { useRole } from '../estado/useRole';
import { NaoEncontrado } from './NaoEncontrado';
import s from './Evento.module.css';

/** Remonta a página ao trocar de evento (zera o estado do carimbo). */
export function RotaEvento() {
  const { id = '' } = useParams();
  return <PaginaEvento key={id} id={id} />;
}

function PaginaEvento({ id }: { id: string }) {
  const { eventos, salvos, vou, alternarSalvo, alternarVou } = useRole();
  const [acabouDeMarcar, setAcabouDeMarcar] = useState(false);
  const navegar = useNavigate();
  const localizacao = useLocation();

  const evento = eventos.find((e) => e.id === id);
  if (!evento) return <NaoEncontrado />;

  const marcado = vou.includes(evento.id);
  // Chegou por link direto? Não tem histórico pra voltar, então vai pra agenda.
  const podeVoltar = localizacao.key !== 'default';

  const aoVou = () => {
    setAcabouDeMarcar(!marcado);
    alternarVou(evento.id);
  };

  return (
    <article className={s.pagina}>
      <title>{`${evento.titulo} — Rolê`}</title>

      <Link
        to="/"
        className={s.voltar}
        onClick={(clique) => {
          if (!podeVoltar) return;
          clique.preventDefault();
          navegar(-1);
        }}
      >
        <Icone nome="voltar" tamanho={20} />
        Voltar pro mural
      </Link>

      <div className={s.grade}>
        <div className={s.colunaCartaz}>
          <Cartaz
            dados={dadosDoCartaz(evento)}
            plano={evento.destaque}
            novo={evento.novo}
            carimbo={marcado ? (acabouDeMarcar ? 'batendo' : 'parado') : 'nenhum'}
            inclinar
            className={s.cartaz}
          />
        </div>

        <div className={s.colunaInfo}>
          <Ingresso evento={evento} />
          {evento.descricao && <p className={s.descricao}>{evento.descricao}</p>}
          <AcoesEvento
            evento={evento}
            vou={marcado}
            salvo={salvos.includes(evento.id)}
            acabouDeMarcar={acabouDeMarcar}
            aoVou={aoVou}
            aoSalvar={() => alternarSalvo(evento.id)}
          />
        </div>
      </div>

      <MaisRole evento={evento} eventos={eventos} />
    </article>
  );
}
