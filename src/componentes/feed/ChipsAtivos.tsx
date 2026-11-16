import { chipsAtivos, removerChip, rotuloDoChip, FILTROS_VAZIOS, type Filtros } from '../../lib/filtros';
import { Icone } from '../Icone';
import s from './ChipsAtivos.module.css';

interface Props {
  filtros: Filtros;
  aoMudar: (filtros: Filtros) => void;
}

/** Filtros ligados, cada um removível com um toque. */
export function ChipsAtivos({ filtros, aoMudar }: Props) {
  const chips = chipsAtivos(filtros);
  if (chips.length === 0) return null;

  return (
    <div className={s.chipsAtivos}>
      <p className="sr-only">Filtros ativos:</p>
      <ul className={s.lista}>
        {chips.map((chip) => {
          const rotulo = rotuloDoChip(chip);
          return (
            <li key={`${chip.grupo}-${chip.valor}`}>
              <button
                type="button"
                className={s.chip}
                aria-label={`Remover filtro ${rotulo}`}
                onClick={() => aoMudar(removerChip(filtros, chip))}
              >
                {rotulo}
                <Icone nome="fechar" tamanho={16} />
              </button>
            </li>
          );
        })}
        {chips.length > 1 && (
          <li>
            <button type="button" className={s.limpar} onClick={() => aoMudar(FILTROS_VAZIOS)}>
              Limpar tudo
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
