import { plural } from '../../lib/formato';
import s from './VazioFiltros.module.css';

interface Props {
  temFiltro: boolean;
  /** Quantos aparecem se olhar a semana toda com os mesmos filtros (null = já está na semana). */
  naSemana: number | null;
  aoLimpar: () => void;
  aoVerSemana: () => void;
}

export function VazioFiltros({ temFiltro, naSemana, aoLimpar, aoVerSemana }: Props) {
  return (
    <div className={s.vazio} role="status">
      <p className={s.grito}>Nada.</p>
      <p className={s.texto}>
        {temFiltro
          ? 'Nada com esses filtros. TO não é SP, afrouxa um pouco aí.'
          : 'Esse dia tá parado. Bora olhar outro?'}
      </p>
      <div className={s.acoes}>
        {naSemana !== null && naSemana > 0 && (
          <button type="button" className={s.botao} onClick={aoVerSemana}>
            Ver a semana toda ({plural(naSemana, 'rolê', 'rolês')})
          </button>
        )}
        {temFiltro && (
          <button type="button" className={s.botaoClaro} onClick={aoLimpar}>
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}
