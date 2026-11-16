import { useContext } from 'react';
import { ContextoRole, type EstadoRole } from './contexto';

export function useRole(): EstadoRole {
  const estado = useContext(ContextoRole);
  if (!estado) throw new Error('useRole precisa estar dentro de <RoleProvider>');
  return estado;
}
