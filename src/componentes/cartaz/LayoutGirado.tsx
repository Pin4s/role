import type { DadosCartaz } from './dados';
import { TituloCartaz } from './TituloCartaz';
import s from './LayoutGirado.module.css';

// Na faixa vertical, "largura" é o comprimento ao longo da altura do cartaz
// e "alturaMax" é a grossura da faixa.
const CAIXA = { largura: 122, alturaMax: 30, teto: 30, maxLinhas: 2 };

/** Título girado 90° numa faixa de cor, informação de ingresso ao lado. */
export function LayoutGirado({ dados }: { dados: DadosCartaz }) {
  return (
    <div className={s.raiz}>
      <div className={s.banda}>
        <TituloCartaz texto={dados.titulo} modo="uniforme" caixa={CAIXA} className={s.titulo} />
      </div>
      <div className={s.lado}>
        <p className={s.tipo}>{dados.tipo}</p>
        <p className={s.dia}>{dados.dia}</p>
        <p className={s.data}>{dados.data}</p>
        <p className={s.hora}>{dados.hora}</p>
        <p className={s.artista}>{dados.artista}</p>
        <div className={s.base}>
          <p className={s.local}>
            {dados.local}
            <span>{dados.bairro}</span>
          </p>
          <p className={s.preco}>{dados.preco}</p>
        </div>
      </div>
    </div>
  );
}
