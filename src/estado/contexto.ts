import { createContext } from 'react';
import type { Evento } from '../dominio/tipos';

export interface EstadoRole {
  /** Hoje em Teófilo Otoni, AAAA-MM-DD. */
  hoje: string;
  /** Hoje e os 6 dias seguintes. */
  dias: string[];
  /** Eventos da semana (exemplo + criados pelo produtor), por data e hora. */
  eventos: Evento[];
  /** Todos os eventos criados nesse aparelho, inclusive os que já passaram. */
  criados: Evento[];
  salvos: string[];
  vou: string[];
  alternarSalvo: (id: string) => void;
  alternarVou: (id: string) => void;
  publicar: (evento: Evento) => void;
  despregar: (id: string) => void;
}

export const ContextoRole = createContext<EstadoRole | null>(null);
