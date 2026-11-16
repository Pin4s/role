import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { gerarEventosDaSemana } from '../dados/eventos';
import type { Evento } from '../dominio/tipos';
import {
  gravarCriados,
  gravarSalvos,
  gravarVou,
  lerCriados,
  lerSalvos,
  lerVou,
} from '../lib/armazenamento';
import { hojeEmTO, proximosDias } from '../lib/datas';
import { alternar } from '../lib/filtros';
import { ContextoRole, type EstadoRole } from './contexto';

function porDataEHora(a: Evento, b: Evento): number {
  return a.data.localeCompare(b.data) || a.horaInicio.localeCompare(b.horaInicio);
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [hoje] = useState(() => hojeEmTO());
  const dias = useMemo(() => proximosDias(hoje), [hoje]);

  const [salvos, setSalvos] = useState(lerSalvos);
  const [vou, setVou] = useState(lerVou);
  const [criados, setCriados] = useState(lerCriados);

  useEffect(() => gravarSalvos(salvos), [salvos]);
  useEffect(() => gravarVou(vou), [vou]);
  useEffect(() => gravarCriados(criados), [criados]);

  const eventos = useMemo(() => {
    const daSemana = criados.filter((evento) => dias.includes(evento.data));
    return [...gerarEventosDaSemana(dias), ...daSemana].sort(porDataEHora);
  }, [dias, criados]);

  const alternarSalvo = useCallback((id: string) => setSalvos((atual) => alternar(atual, id)), []);
  const alternarVou = useCallback((id: string) => setVou((atual) => alternar(atual, id)), []);
  const publicar = useCallback(
    (evento: Evento) => setCriados((atual) => [...atual.filter((e) => e.id !== evento.id), evento]),
    [],
  );
  const despregar = useCallback((id: string) => setCriados((atual) => atual.filter((e) => e.id !== id)), []);

  const valor = useMemo<EstadoRole>(
    () => ({ hoje, dias, eventos, criados, salvos, vou, alternarSalvo, alternarVou, publicar, despregar }),
    [hoje, dias, eventos, criados, salvos, vou, alternarSalvo, alternarVou, publicar, despregar],
  );

  return <ContextoRole.Provider value={valor}>{children}</ContextoRole.Provider>;
}
