import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import s from './Chip.module.css';

interface Props {
  ativo: boolean;
  aoClicar: () => void;
  children: ReactNode;
}

/** Botão de alternar com cara de etiqueta; ativo vira marca-texto. */
export function Chip({ ativo, aoClicar, children }: Props) {
  return (
    <button type="button" className={cx(s.chip, ativo && s.ativo)} aria-pressed={ativo} onClick={aoClicar}>
      {children}
    </button>
  );
}
