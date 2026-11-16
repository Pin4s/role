import type { Plano } from '../dominio/tipos';

export interface InfoPlano {
  id: Plano;
  nome: string;
  preco: string;
  periodo: string;
  resumo: string;
  itens: string[];
}

export const PLANOS_INFO: readonly InfoPlano[] = [
  {
    id: 'mural',
    nome: 'Mural',
    preco: '0800',
    periodo: 'de graça',
    resumo: 'Seu evento na agenda da semana.',
    itens: ['Cartaz gerado na hora, sem designer', 'Aparece no dia certo e nos filtros', 'Botão de mandar no zap e de como chegar'],
  },
  {
    id: 'lambe',
    nome: 'Lambe',
    preco: 'R$ 29',
    periodo: 'por semana',
    resumo: 'Destaque no topo do dia.',
    itens: ['Tudo do Mural', 'Primeiro da fila no dia do evento', 'Selo DESTAQUE carimbado no cartaz'],
  },
  {
    id: 'outdoor',
    nome: 'Outdoor',
    preco: 'R$ 79',
    periodo: 'por semana',
    resumo: 'Capa da semana.',
    itens: ['Tudo do Lambe', 'Cartaz em tamanho dobrado, abrindo a semana', 'Aviso pra quem salvou o seu local'],
  },
];
