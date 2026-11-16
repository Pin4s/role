import type { DadosCartaz } from './dados';
import { TituloCartaz } from './TituloCartaz';
import s from './LayoutGrade.module.css';

const CAIXA = { largura: 80, alturaMax: 40, teto: 22, maxLinhas: 3 };

/** Grade de linhas grossas, cada informação na sua casa. */
export function LayoutGrade({ dados, numero }: { dados: DadosCartaz; numero: string }) {
  return (
    <div className={s.raiz}>
      <p className={`${s.casa} ${s.tipo}`}>{dados.tipo}</p>
      <p className={`${s.casa} ${s.numero}`}>Nº {numero}</p>
      <div className={`${s.casa} ${s.principal}`}>
        <TituloCartaz texto={dados.titulo} modo="uniforme" caixa={CAIXA} className={s.titulo} />
        <p className={s.artista}>{dados.artista}</p>
      </div>
      <p className={`${s.casa} ${s.dia}`}>
        {dados.dia}
        <span>{dados.data}</span>
      </p>
      <p className={`${s.casa} ${s.hora}`}>{dados.hora}</p>
      <p className={`${s.casa} ${s.local}`}>
        {dados.local}
        <span>{dados.bairro}</span>
      </p>
      <p className={`${s.casa} ${s.preco}`}>{dados.preco}</p>
    </div>
  );
}
