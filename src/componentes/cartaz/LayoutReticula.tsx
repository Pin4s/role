import type { DadosCartaz } from './dados';
import { TituloCartaz } from './TituloCartaz';
import s from './LayoutReticula.module.css';

const CAIXA = { largura: 78, alturaMax: 58, teto: 26, maxLinhas: 4 };

/** Retícula de pontos na cor spot, título recortado em tiras de papel. */
export function LayoutReticula({ dados }: { dados: DadosCartaz }) {
  return (
    <div className={s.raiz}>
      <div className={s.pontos} />
      <p className={s.topo}>
        <span>{dados.tipo}</span>
        <span>
          {dados.dia} {dados.data} · {dados.hora}
        </span>
      </p>
      <TituloCartaz texto={dados.titulo} modo="preencher" caixa={CAIXA} className={s.titulo} />
      <div className={s.barra}>
        <p className={s.artista}>{dados.artista}</p>
        <p className={s.rodape}>
          <span className={s.local}>{dados.local}</span>
          <span>{dados.preco}</span>
        </p>
      </div>
    </div>
  );
}
