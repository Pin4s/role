import { useSyncExternalStore } from 'react';

// Avisa quando a Anton terminou de carregar, pra os títulos dos cartazes
// serem medidos com a fonte certa (antes disso usamos uma estimativa).

let pronta = false;
const ouvintes = new Set<() => void>();

function marcarPronta(): void {
  pronta = true;
  ouvintes.forEach((avisar) => avisar());
}

export function carregarFonteDisplay(): void {
  try {
    document.fonts.load('400 100px Anton').then(marcarPronta, marcarPronta);
  } catch {
    marcarPronta();
  }
}

function inscrever(avisar: () => void): () => void {
  ouvintes.add(avisar);
  return () => {
    ouvintes.delete(avisar);
  };
}

export function useFonteDisplayPronta(): boolean {
  return useSyncExternalStore(inscrever, () => pronta, () => pronta);
}
