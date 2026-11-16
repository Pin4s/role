import { cx } from '../../lib/cx';
import { diaBarraMes, rotuloRelativo } from '../../lib/datas';
import { SEMANA } from './semana';
import s from './FaixaDias.module.css';

interface Props {
  hoje: string;
  dias: readonly string[];
  selecionado: string;
  /** Quantos eventos (já filtrados) cada dia tem. */
  contagem: (dia: string) => number;
  total: number;
  aoEscolher: (dia: string) => void;
}

/** Faixa rolável: a semana toda e cada um dos 7 dias, com contagem. */
export function FaixaDias({ hoje, dias, selecionado, contagem, total, aoEscolher }: Props) {
  const opcoes = [
    { valor: SEMANA, rotulo: 'Semana', sub: 'toda', n: total },
    ...dias.map((dia) => ({ valor: dia, rotulo: rotuloRelativo(dia, hoje), sub: diaBarraMes(dia), n: contagem(dia) })),
  ];

  return (
    <div className={s.faixa} role="group" aria-label="Escolha o dia">
      {opcoes.map((opcao) => (
        <button
          key={opcao.valor}
          type="button"
          className={cx(s.dia, opcao.valor === selecionado && s.ativo, opcao.n === 0 && s.vazio)}
          aria-pressed={opcao.valor === selecionado}
          onClick={() => aoEscolher(opcao.valor)}
        >
          <span className={s.rotulo}>{opcao.rotulo}</span>
          <span className={s.sub}>{opcao.sub}</span>
          <span className={s.contagem}>
            {opcao.n}
            <span className="sr-only">{opcao.n === 1 ? ' rolê' : ' rolês'}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
