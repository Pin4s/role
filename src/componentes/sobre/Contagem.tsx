import { cx } from '../../lib/cx';
import s from './Contagem.module.css';

interface Props {
  rotulo: string;
  atual: number;
  meta: number;
}

/** Progresso como risquinhos na parede: uma casa por cadastro. */
export function Contagem({ rotulo, atual, meta }: Props) {
  const feito = Math.min(atual, meta);
  return (
    <div className={s.contagem}>
      <p className={s.numeros}>
        <span className={s.atual}>{atual}</span> de {meta} {rotulo}
      </p>
      <div
        className={s.casas}
        role="progressbar"
        aria-label={rotulo}
        aria-valuemin={0}
        aria-valuemax={meta}
        aria-valuenow={feito}
        aria-valuetext={`${atual} de ${meta} ${rotulo}`}
      >
        {Array.from({ length: meta }, (_, i) => (
          <span key={i} className={cx(s.casa, i < feito && s.cheia)} />
        ))}
      </div>
    </div>
  );
}
