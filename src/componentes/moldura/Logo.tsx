import { cx } from '../../lib/cx';
import s from './Logo.module.css';

/** "ROLÊ" como carimbo: Anton, borda de tinta e cor fora de registro. */
export function Logo({ grande = false, className }: { grande?: boolean; className?: string }) {
  return <span className={cx(s.logo, grande && s.grande, className)}>Rolê</span>;
}
