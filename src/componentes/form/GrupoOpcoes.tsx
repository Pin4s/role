import { useId } from 'react';
import { cx } from '../../lib/cx';
import s from './Form.module.css';

interface Opcao<T extends string> {
  valor: T;
  rotulo: string;
  detalhe?: string;
}

interface PropsBase<T extends string> {
  legenda: string;
  opcoes: readonly Opcao<T>[];
  erro?: string;
  dica?: string;
}

interface PropsUnica<T extends string> extends PropsBase<T> {
  multipla?: false;
  valor: T | '';
  aoMudar: (valor: T) => void;
}

interface PropsMultipla<T extends string> extends PropsBase<T> {
  multipla: true;
  valor: readonly T[];
  aoMudar: (valor: T) => void;
}

/** Rádios ou checkboxes de verdade, com cara de etiqueta. */
export function GrupoOpcoes<T extends string>(props: PropsUnica<T> | PropsMultipla<T>) {
  const nome = useId();
  const idErro = `${nome}-erro`;
  const marcado = (valor: T) => (props.multipla ? props.valor.includes(valor) : props.valor === valor);

  return (
    <fieldset className={s.grupo} aria-describedby={props.erro ? idErro : undefined}>
      <legend className={s.rotulo}>
        {props.legenda}
        {props.dica && <span className={s.dicaInline}> {props.dica}</span>}
      </legend>
      <div className={s.opcoes}>
        {props.opcoes.map((opcao) => (
          <label key={opcao.valor} className={cx(s.opcao, marcado(opcao.valor) && s.opcaoMarcada)}>
            <input
              type={props.multipla ? 'checkbox' : 'radio'}
              name={nome}
              value={opcao.valor}
              checked={marcado(opcao.valor)}
              onChange={() => props.aoMudar(opcao.valor)}
              className={s.entradaEscondida}
            />
            {opcao.rotulo}
            {opcao.detalhe && <span className={s.detalhe}>{opcao.detalhe}</span>}
          </label>
        ))}
      </div>
      {props.erro && (
        <p id={idErro} className={s.erro}>
          {props.erro}
        </p>
      )}
    </fieldset>
  );
}
