import type { ReactNode } from 'react';
import { LOCAIS } from '../../dados/locais';
import {
  AMBIENTES,
  ESTILOS,
  PLANOS,
  ROTULO_AMBIENTE,
  ROTULO_ESTILO,
  ROTULO_PLANO,
  ROTULO_TIPO,
  TIPOS,
  ehLocalId,
  type Ambiente,
} from '../../dominio/tipos';
import { diaBarraMes, rotuloRelativo } from '../../lib/datas';
import { alternar } from '../../lib/filtros';
import type { Erros, Rascunho } from '../../lib/rascunho';
import { GrupoOpcoes } from './GrupoOpcoes';
import s from './Form.module.css';

const PRECO_PLANO = { mural: '0800', lambe: 'R$ 29/sem', outdoor: 'R$ 79/sem' } as const;

interface Props {
  rascunho: Rascunho;
  erros: Erros;
  hoje: string;
  dias: readonly string[];
  aoMudar: (parcial: Partial<Rascunho>) => void;
}

function Campo({ id, rotulo, erro, dica, children }: { id: string; rotulo: string; erro?: string; dica?: string; children: ReactNode }) {
  return (
    <div className={s.campo} id={`campo-${id}`}>
      <label className={s.rotulo} htmlFor={`entrada-${id}`}>
        {rotulo}
      </label>
      {children}
      {dica && !erro && <p className={s.dica}>{dica}</p>}
      {erro && (
        <p id={`erro-${id}`} className={s.erro}>
          {erro}
        </p>
      )}
    </div>
  );
}

/** Campos do cadastro de evento. Cada mudança atualiza o cartaz ao lado. */
export function FormularioEvento({ rascunho, erros, hoje, dias, aoMudar }: Props) {
  const descreverErro = (id: string, erro?: string) => (erro ? `erro-${id}` : undefined);

  return (
    <div className={s.pilha}>
      <Campo id="titulo" rotulo="Nome do rolê" erro={erros.titulo}>
        <input
          id="entrada-titulo"
          className={s.entrada}
          value={rascunho.titulo}
          maxLength={40}
          placeholder="Ex.: Pagode da Laje"
          autoComplete="off"
          aria-invalid={Boolean(erros.titulo)}
          aria-describedby={descreverErro('titulo', erros.titulo)}
          onChange={(e) => aoMudar({ titulo: e.target.value })}
        />
      </Campo>

      <Campo id="artista" rotulo="Quem toca ou quem faz" erro={erros.artista}>
        <input
          id="entrada-artista"
          className={s.entrada}
          value={rascunho.artista}
          maxLength={50}
          placeholder="Ex.: Grupo Lá Vem Ela"
          autoComplete="off"
          aria-invalid={Boolean(erros.artista)}
          aria-describedby={descreverErro('artista', erros.artista)}
          onChange={(e) => aoMudar({ artista: e.target.value })}
        />
      </Campo>

      <Campo id="localId" rotulo="Onde" erro={erros.localId}>
        <select
          id="entrada-localId"
          className={s.selecao}
          value={rascunho.localId}
          aria-invalid={Boolean(erros.localId)}
          aria-describedby={descreverErro('localId', erros.localId)}
          onChange={(e) => {
            const valor = e.target.value;
            aoMudar({ localId: ehLocalId(valor) ? valor : '' });
          }}
        >
          <option value="">Escolhe o local</option>
          {LOCAIS.map((local) => (
            <option key={local.id} value={local.id}>
              {local.nome} — {local.bairro}
            </option>
          ))}
        </select>
      </Campo>

      <GrupoOpcoes
        legenda="Dia"
        valor={rascunho.data}
        opcoes={dias.map((dia) => ({ valor: dia, rotulo: rotuloRelativo(dia, hoje), detalhe: diaBarraMes(dia) }))}
        aoMudar={(data) => aoMudar({ data })}
      />

      <Campo id="horaInicio" rotulo="Começa que horas" erro={erros.horaInicio}>
        <input
          id="entrada-horaInicio"
          type="time"
          className={s.entrada}
          value={rascunho.horaInicio}
          aria-invalid={Boolean(erros.horaInicio)}
          aria-describedby={descreverErro('horaInicio', erros.horaInicio)}
          onChange={(e) => aoMudar({ horaInicio: e.target.value })}
        />
      </Campo>

      <Campo id="preco" rotulo="Entrada ou couvert" erro={erros.preco} dica="Deixa vazio ou 0 se for 0800.">
        <div className={s.comPrefixo}>
          <span className={s.prefixo} aria-hidden="true">
            R$
          </span>
          <input
            id="entrada-preco"
            className={s.entrada}
            value={rascunho.preco}
            inputMode="decimal"
            placeholder="0"
            maxLength={7}
            autoComplete="off"
            aria-invalid={Boolean(erros.preco)}
            aria-describedby={descreverErro('preco', erros.preco)}
            onChange={(e) => aoMudar({ preco: e.target.value })}
          />
        </div>
      </Campo>

      <GrupoOpcoes
        legenda="Tipo"
        valor={rascunho.tipo}
        opcoes={TIPOS.map((tipo) => ({ valor: tipo, rotulo: ROTULO_TIPO[tipo] }))}
        aoMudar={(tipo) => aoMudar({ tipo })}
      />

      <div id="campo-estilo">
        <GrupoOpcoes
          legenda="Estilo musical"
          valor={rascunho.estilo}
          erro={erros.estilo}
          opcoes={ESTILOS.map((estilo) => ({ valor: estilo, rotulo: ROTULO_ESTILO[estilo] }))}
          aoMudar={(estilo) => aoMudar({ estilo })}
        />
      </div>

      <GrupoOpcoes<Ambiente>
        legenda="Ambiente"
        dica="(pode marcar mais de um)"
        multipla
        valor={rascunho.ambiente}
        opcoes={AMBIENTES.map((ambiente) => ({ valor: ambiente, rotulo: ROTULO_AMBIENTE[ambiente] }))}
        aoMudar={(ambiente) => aoMudar({ ambiente: alternar(rascunho.ambiente, ambiente) })}
      />

      <Campo id="descricao" rotulo="Recado pro povo (opcional)" dica={`${rascunho.descricao.length}/160`}>
        <textarea
          id="entrada-descricao"
          className={s.area}
          value={rascunho.descricao}
          maxLength={160}
          placeholder="Ex.: Chega cedo que a mesa some."
          onChange={(e) => aoMudar({ descricao: e.target.value })}
        />
      </Campo>

      <GrupoOpcoes
        legenda="Plano"
        valor={rascunho.plano}
        opcoes={PLANOS.map((plano) => ({ valor: plano, rotulo: ROTULO_PLANO[plano], detalhe: PRECO_PLANO[plano] }))}
        aoMudar={(plano) => aoMudar({ plano })}
      />
    </div>
  );
}
