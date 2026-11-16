import { useId } from 'react';
import type { DadosCartaz } from './dados';
import { TituloCartaz } from './TituloCartaz';
import s from './LayoutSelo.module.css';

const CAIXA = { largura: 88, alturaMax: 50, teto: 24, maxLinhas: 3 };

/** Selo circular com o preço, texto correndo em volta. */
export function LayoutSelo({ dados }: { dados: DadosCartaz }) {
  const idCaminho = useId();
  const anel = `${dados.dia} ${dados.data} · ${dados.hora} · ${dados.local} · `;

  return (
    <div className={s.raiz}>
      <div className={s.selo}>
        <svg className={s.anel} viewBox="0 0 100 100" aria-hidden="true">
          <path id={idCaminho} d="M50 50 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" fill="none" />
          <text className={s.anelTexto}>
            <textPath href={`#${idCaminho}`} textLength="248" lengthAdjust="spacing">
              {anel}
            </textPath>
          </text>
        </svg>
        <span className={s.valor}>{dados.preco}</span>
      </div>
      <p className={s.tipo}>{dados.tipo}</p>
      <div className={s.corpo}>
        <TituloCartaz texto={dados.titulo} modo="uniforme" caixa={CAIXA} className={s.titulo} />
        <p className={s.artista}>{dados.artista}</p>
        <p className={s.rodape}>
          <span>
            {dados.dia} {dados.hora}
          </span>
          <span className={s.local}>{dados.local}</span>
        </p>
      </div>
    </div>
  );
}
