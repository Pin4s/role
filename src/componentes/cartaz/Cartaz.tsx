import type { Plano } from '../../dominio/tipos';
import { cx } from '../../lib/cx';
import { visualDoCartaz } from '../../lib/visualCartaz';
import type { DadosCartaz } from './dados';
import { LayoutEmpilhado } from './LayoutEmpilhado';
import { LayoutGirado } from './LayoutGirado';
import { LayoutGrade } from './LayoutGrade';
import { LayoutReticula } from './LayoutReticula';
import { LayoutSelo } from './LayoutSelo';
import cores from './cores.module.css';
import s from './Cartaz.module.css';

export type Carimbo = 'nenhum' | 'parado' | 'batendo';

interface Props {
  dados: DadosCartaz;
  plano?: Plano;
  novo?: boolean;
  /** Carimbo "VOU": parado (já marcado) ou batendo (acabou de marcar). */
  carimbo?: Carimbo;
  /** Gira levemente, como colado na parede. */
  inclinar?: boolean;
  className?: string;
}

/**
 * O cartaz gerado só com tipografia e formas. Layout, cor, inclinação e fita
 * saem do id. É decorativo para leitores de tela: quem usa o cartaz sempre
 * oferece a mesma informação em texto.
 */
export function Cartaz({ dados, plano = 'mural', novo = false, carimbo = 'nenhum', inclinar = false, className }: Props) {
  const visual = visualDoCartaz(dados.id);
  const estilo = {
    '--dx': `${visual.desregX}px`,
    '--dy': `${visual.desregY}px`,
    '--giro': inclinar ? `${visual.rotacao}deg` : '0deg',
  };

  return (
    <div className={cx(s.cartaz, cores[visual.cor], className)} style={estilo} aria-hidden="true">
      <div className={cx(s.folha, carimbo === 'batendo' && s.tremendo)}>
        {visual.layout === 'empilhado' && <LayoutEmpilhado dados={dados} />}
        {visual.layout === 'girado' && <LayoutGirado dados={dados} />}
        {visual.layout === 'selo' && <LayoutSelo dados={dados} />}
        {visual.layout === 'grade' && <LayoutGrade dados={dados} numero={visual.numero} />}
        {visual.layout === 'reticula' && <LayoutReticula dados={dados} />}
      </div>

      {visual.fita && <span className={s.fita} />}

      {plano === 'lambe' && <span className={cx(s.carimbo, s.destaque)}>Destaque</span>}
      {plano === 'outdoor' && (
        <span className={cx(s.carimbo, s.capa)}>
          Capa da
          <br />
          semana
        </span>
      )}
      {novo && <span className={s.novo}>Novo</span>}
      {carimbo !== 'nenhum' && (
        <span className={cx(s.vou, carimbo === 'batendo' && s.batendo)}>
          Vou
          <small>tô dentro</small>
        </span>
      )}
    </div>
  );
}
