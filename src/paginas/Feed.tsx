import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { ChipsAtivos } from '../componentes/feed/ChipsAtivos';
import { FaixaDias } from '../componentes/feed/FaixaDias';
import { ListaEspera } from '../componentes/feed/ListaEspera';
import { PainelFiltros } from '../componentes/feed/PainelFiltros';
import { SEMANA } from '../componentes/feed/semana';
import { VazioFiltros } from '../componentes/feed/VazioFiltros';
import { Icone } from '../componentes/Icone';
import { Mural } from '../componentes/mural/Mural';
import { FRASES_DO_DIA } from '../dados/frases';
import { useRole } from '../estado/useRole';
import { dataExtensa, diaBarraMes, diaDaSemana, nomeDia, rotuloRelativo } from '../lib/datas';
import {
  chipsAtivos,
  escreverFiltros,
  FILTROS_VAZIOS,
  lerFiltros,
  passaNoFiltro,
  type Filtros,
} from '../lib/filtros';
import { plural } from '../lib/formato';
import { ordenarPorDestaque } from '../lib/ordem';
import s from './Feed.module.css';

export function Feed() {
  const { hoje, dias, eventos, salvos } = useRole();
  const [params, setParams] = useSearchParams();
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);

  const filtros = lerFiltros(params);
  const pedido = params.get('dia') ?? '';
  const dia = pedido === SEMANA || dias.includes(pedido) ? pedido : hoje;

  const filtrados = eventos.filter((evento) => passaNoFiltro(evento, filtros));
  const doDia = dia === SEMANA ? filtrados : filtrados.filter((evento) => evento.data === dia);
  const visiveis = ordenarPorDestaque(doDia);
  const totalFiltros = chipsAtivos(filtros).length;
  const totalSalvos = eventos.filter((evento) => salvos.includes(evento.id)).length;
  const totalLocais = new Set(eventos.map((evento) => evento.localId)).size;

  function mudarFiltros(novos: Filtros) {
    setParams((atuais) => escreverFiltros(atuais, novos), { replace: true });
  }

  function escolherDia(novo: string) {
    setParams(
      (atuais) => {
        const proximos = new URLSearchParams(atuais);
        if (novo === hoje) proximos.delete('dia');
        else proximos.set('dia', novo);
        return proximos;
      },
      { replace: true },
    );
  }

  const relativo = dia === SEMANA ? '' : rotuloRelativo(dia, hoje);
  const diaCurto = `${nomeDia(dia)}, ${diaBarraMes(dia)}`;
  const tituloDoMural =
    dia === SEMANA
      ? 'A semana toda'
      : relativo === 'Hoje' || relativo === 'Amanhã'
        ? `${relativo} · ${diaCurto}`
        : diaCurto;

  return (
    <div className={s.pagina}>
      <title>Rolê — o que tá rolando em Teófilo Otoni</title>

      <header className={s.cabecalho}>
        <p className={s.data}>{dataExtensa(hoje)} · Teófilo Otoni</p>
        <h1 className={s.titulo}>
          Tem rolê <span className={s.marcaTexto}>hoje?</span>
        </h1>
        <p className={s.frase}>{FRASES_DO_DIA[diaDaSemana(hoje)]}</p>
        <p className={s.resumo}>
          O que tá rolando em TO essa semana: {plural(eventos.length, 'rolê', 'rolês')} em{' '}
          {plural(totalLocais, 'lugar', 'lugares')}.
        </p>
      </header>

      <FaixaDias
        hoje={hoje}
        dias={dias}
        selecionado={dia}
        contagem={(d) => filtrados.filter((evento) => evento.data === d).length}
        total={filtrados.length}
        aoEscolher={escolherDia}
      />

      <div className={s.barra}>
        <button
          type="button"
          className={s.botaoFiltros}
          aria-haspopup="dialog"
          onClick={() => setFiltrosAbertos(true)}
        >
          <Icone nome="filtro" />
          Filtros
          {totalFiltros > 0 && (
            <span className={s.numero}>
              {totalFiltros}
              <span className="sr-only"> ativos</span>
            </span>
          )}
        </button>
        <Link to="/salvos" className={s.botaoSalvos}>
          <Icone nome="salvos" />
          Salvos
          <span className={s.numero}>{totalSalvos}</span>
        </Link>
      </div>

      <ChipsAtivos filtros={filtros} aoMudar={mudarFiltros} />

      <section className={s.secao} aria-labelledby="titulo-mural">
        <div className={s.cabecalhoMural}>
          <h2 id="titulo-mural" className={s.tituloMural}>
            {tituloDoMural}
          </h2>
          <p className={s.contagem} aria-live="polite">
            {plural(visiveis.length, 'rolê', 'rolês')}
          </p>
        </div>

        {visiveis.length > 0 ? (
          <Mural eventos={visiveis} rotulo={`Cartazes: ${tituloDoMural}`} />
        ) : (
          <VazioFiltros
            temFiltro={totalFiltros > 0}
            naSemana={dia === SEMANA ? null : filtrados.length}
            aoLimpar={() => mudarFiltros(FILTROS_VAZIOS)}
            aoVerSemana={() => escolherDia(SEMANA)}
          />
        )}
      </section>

      <ListaEspera />

      <PainelFiltros
        aberto={filtrosAbertos}
        aoFechar={() => setFiltrosAbertos(false)}
        filtros={filtros}
        aoMudar={mudarFiltros}
        resultados={visiveis.length}
      />
    </div>
  );
}
