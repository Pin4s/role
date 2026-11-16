import type { NomeIcone } from '../Icone';

export interface ItemNav {
  para: string;
  rotulo: string;
  icone: NomeIcone;
  /** Só fica ativo na rota exata (a agenda, que é "/"). */
  exato: boolean;
}

export const ITENS_NAV: readonly ItemNav[] = [
  { para: '/', rotulo: 'Agenda', icone: 'agenda', exato: true },
  { para: '/salvos', rotulo: 'Salvos', icone: 'salvos', exato: false },
  { para: '/divulgar', rotulo: 'Divulgar', icone: 'divulgar', exato: false },
  { para: '/sobre', rotulo: 'Sobre', icone: 'sobre', exato: false },
];
