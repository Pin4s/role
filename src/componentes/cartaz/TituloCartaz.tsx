import { useFonteDisplayPronta } from '../../lib/fontes';
import { linhasPreenchidas, linhasUniformes, type Caixa } from '../../lib/titulo';

interface Props {
  texto: string;
  modo: 'preencher' | 'uniforme';
  caixa: Caixa;
  className?: string;
}

/**
 * Título do cartaz: cada linha recebe o tamanho calculado. Usa cqw (largura
 * física do cartaz) e não cqi, porque no título girado o eixo "inline" vira
 * a altura.
 */
export function TituloCartaz({ texto, modo, caixa, className }: Props) {
  const fontePronta = useFonteDisplayPronta();
  const calcular = modo === 'preencher' ? linhasPreenchidas : linhasUniformes;
  const linhas = calcular(texto, caixa, fontePronta);

  return (
    <p className={className}>
      {linhas.map((linha, i) => (
        <span key={`${i}-${linha.texto}`} style={{ fontSize: `${linha.tamanho.toFixed(2)}cqw` }}>
          {linha.texto}
        </span>
      ))}
    </p>
  );
}
