import type { DadosCartaz } from './dados';
import { TituloCartaz } from './TituloCartaz';
import s from './LayoutEmpilhado.module.css';

const CAIXA = { largura: 88, alturaMax: 64, teto: 34, maxLinhas: 4 };

/** Título empilhado gigante, cada linha encostando nas bordas. */
export function LayoutEmpilhado({ dados }: { dados: DadosCartaz }) {
  return (
    <div className={s.raiz}>
      <p className={s.topo}>
        <span>{dados.tipo}</span>
        <span>
          {dados.dia} {dados.data}
        </span>
      </p>
      <TituloCartaz texto={dados.titulo} modo="preencher" caixa={CAIXA} className={s.titulo} />
      <div className={s.faixa}>
        <p className={s.artista}>{dados.artista}</p>
        <p className={s.rodape}>
          <span>{dados.hora}</span>
          <span className={s.local}>{dados.local}</span>
          <span>{dados.preco}</span>
        </p>
      </div>
    </div>
  );
}
