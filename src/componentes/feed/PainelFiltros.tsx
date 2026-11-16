import { useEffect, useId, useRef, type ReactNode } from 'react';
import {
  AMBIENTES,
  ESTILOS,
  FAIXAS_DISTANCIA,
  FAIXAS_PRECO,
  ROTULO_AMBIENTE,
  ROTULO_DISTANCIA,
  ROTULO_ESTILO,
  ROTULO_PRECO,
  ROTULO_TIPO,
  TIPOS,
} from '../../dominio/tipos';
import { alternar, FILTROS_VAZIOS, type Filtros } from '../../lib/filtros';
import { plural } from '../../lib/formato';
import { Chip } from '../Chip';
import { Icone } from '../Icone';
import s from './PainelFiltros.module.css';

interface Props {
  aberto: boolean;
  aoFechar: () => void;
  filtros: Filtros;
  aoMudar: (filtros: Filtros) => void;
  resultados: number;
}

function Grupo({ titulo, nota, children }: { titulo: string; nota?: string; children: ReactNode }) {
  return (
    <fieldset className={s.grupo}>
      <legend className={s.legenda}>
        {titulo}
        {nota && <span className={s.nota}> {nota}</span>}
      </legend>
      <div className={s.chips}>{children}</div>
    </fieldset>
  );
}

/** Bottom sheet no celular, painel lateral no desktop. Filtra ao vivo. */
export function PainelFiltros({ aberto, aoFechar, filtros, aoMudar, resultados }: Props) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const idTitulo = useId();

  useEffect(() => {
    const elemento = dialogo.current;
    if (!elemento) return;
    if (aberto && !elemento.open) elemento.showModal();
    if (!aberto && elemento.open) elemento.close();
  }, [aberto]);

  return (
    <dialog
      ref={dialogo}
      className={s.dialogo}
      aria-labelledby={idTitulo}
      onClose={aoFechar}
      onClick={(evento) => {
        // Clique no fundo escuro (fora da folha) fecha.
        if (evento.target === evento.currentTarget) aoFechar();
      }}
    >
      <div className={s.folha}>
        <div className={s.topo}>
          <h2 id={idTitulo} className={s.titulo}>
            Filtros
          </h2>
          <button type="button" className={s.fechar} onClick={aoFechar}>
            <Icone nome="fechar" />
            <span className="sr-only">Fechar filtros</span>
          </button>
        </div>

        <div className={s.corpo}>
          <Grupo titulo="Tipo">
            {TIPOS.map((tipo) => (
              <Chip
                key={tipo}
                ativo={filtros.tipos.includes(tipo)}
                aoClicar={() => aoMudar({ ...filtros, tipos: alternar(filtros.tipos, tipo) })}
              >
                {ROTULO_TIPO[tipo]}
              </Chip>
            ))}
          </Grupo>

          <Grupo titulo="Bolso">
            {FAIXAS_PRECO.map((faixa) => (
              <Chip
                key={faixa}
                ativo={filtros.precos.includes(faixa)}
                aoClicar={() => aoMudar({ ...filtros, precos: alternar(filtros.precos, faixa) })}
              >
                {ROTULO_PRECO[faixa]}
              </Chip>
            ))}
          </Grupo>

          <Grupo titulo="Distância" nota="(contando do centro)">
            {FAIXAS_DISTANCIA.map((faixa) => (
              <Chip
                key={faixa}
                ativo={filtros.distancia === faixa}
                aoClicar={() => aoMudar({ ...filtros, distancia: faixa })}
              >
                {ROTULO_DISTANCIA[faixa]}
                {faixa === 'a-pe' && <span className={s.detalhe}> até 1,5 km</span>}
              </Chip>
            ))}
          </Grupo>

          <Grupo titulo="Estilo musical">
            {ESTILOS.map((estilo) => (
              <Chip
                key={estilo}
                ativo={filtros.estilos.includes(estilo)}
                aoClicar={() => aoMudar({ ...filtros, estilos: alternar(filtros.estilos, estilo) })}
              >
                {ROTULO_ESTILO[estilo]}
              </Chip>
            ))}
          </Grupo>

          <Grupo titulo="Vibe">
            {AMBIENTES.map((ambiente) => (
              <Chip
                key={ambiente}
                ativo={filtros.ambientes.includes(ambiente)}
                aoClicar={() => aoMudar({ ...filtros, ambientes: alternar(filtros.ambientes, ambiente) })}
              >
                {ROTULO_AMBIENTE[ambiente]}
              </Chip>
            ))}
          </Grupo>
        </div>

        <div className={s.base}>
          <button type="button" className={s.limpar} onClick={() => aoMudar(FILTROS_VAZIOS)}>
            Limpar
          </button>
          <button type="button" className={s.ver} onClick={aoFechar}>
            {resultados === 0 ? 'Nada ainda' : `Ver ${plural(resultados, 'rolê', 'rolês')}`}
          </button>
        </div>
      </div>
    </dialog>
  );
}
