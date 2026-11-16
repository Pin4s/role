import { Link } from 'react-router';
import { Icone } from '../componentes/Icone';
import { localPorId } from '../dados/locais';
import { PLANOS_INFO } from '../dados/planos';
import { ROTULO_PLANO } from '../dominio/tipos';
import { useRole } from '../estado/useRole';
import { cx } from '../lib/cx';
import { diaBarraMes, siglaDia } from '../lib/datas';
import s from './Divulgar.module.css';

const MOTIVOS = [
  { titulo: 'Fica a semana toda.', texto: 'Story some em 24 horas. No mural, seu cartaz fica colado até o dia do evento.' },
  { titulo: 'Chega em quem quer sair.', texto: 'Não só em quem já te segue: aparece pra quem tá filtrando rolê por bolso, distância e vibe.' },
  { titulo: 'Cartaz pronto em um minuto.', texto: 'Digita nome, dia e preço. O Rolê monta o cartaz no estilo do mural, sem precisar de designer.' },
];

export function Divulgar() {
  const { criados, despregar, dias } = useRole();

  return (
    <div className={s.pagina}>
      <title>Divulgar no Rolê — pra bar e produtor</title>

      <header className={s.cabecalho}>
        <p className={s.sobretitulo}>Pra dono de bar e produtor de TO</p>
        <h1 className={s.titulo}>
          Tem um rolê?
          <span className={s.linha2}>Bota no mural.</span>
        </h1>
        <p className={s.texto}>
          Hoje seu evento vive num story de 24 horas e só chega em quem já segue o perfil. No Rolê ele entra na
          agenda da cidade, na frente de quem tá decidindo onde sair hoje.
        </p>
        <Link to="/divulgar/novo" className={s.cta}>
          Montar meu cartaz
          <Icone nome="seta" />
        </Link>
      </header>

      <ol className={s.motivos}>
        {MOTIVOS.map((motivo, i) => (
          <li key={motivo.titulo} className={s.motivo}>
            <span className={s.numero} aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <h2 className={s.motivoTitulo}>{motivo.titulo}</h2>
              <p className={s.motivoTexto}>{motivo.texto}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className={s.secaoPlanos} aria-labelledby="titulo-planos">
        <h2 id="titulo-planos" className={s.tituloSecao}>
          Os planos
        </h2>
        <ul className={s.planos}>
          {PLANOS_INFO.map((plano) => (
            <li key={plano.id} className={cx(s.plano, s[plano.id])}>
              {plano.id === 'lambe' && (
                <span className={s.carimbo} aria-hidden="true">
                  Destaque
                </span>
              )}
              <h3 className={s.nomePlano}>{plano.nome}</h3>
              <p className={s.preco}>
                <span className={s.valor}>{plano.preco}</span> <span className={s.periodo}>{plano.periodo}</span>
              </p>
              <p className={s.resumo}>{plano.resumo}</p>
              <ul className={s.itens}>
                {plano.itens.map((item) => (
                  <li key={item}>
                    <Icone nome="check" tamanho={18} className={s.check} />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className={s.comissao}>
          <strong>Depois, quando tiver venda de ingresso pelo app:</strong> 8% sobre cada ingresso vendido. Sem venda,
          sem cobrança.
        </p>
        <p className={s.nota}>
          Isso aqui é um protótipo: ninguém paga nada agora e o aviso do Outdoor ainda não dispara. A gente só quer
          saber se você pagaria.
        </p>
      </section>

      {criados.length > 0 && (
        <section className={s.meus} aria-labelledby="titulo-meus">
          <h2 id="titulo-meus" className={s.tituloSecao}>
            Seus cartazes nesse aparelho
          </h2>
          <ul className={s.listaMeus}>
            {criados.map((evento) => {
              const noAr = dias.includes(evento.data);
              return (
                <li key={evento.id} className={s.meu}>
                  <div className={s.meuInfo}>
                    <p className={s.meuTitulo}>{evento.titulo}</p>
                    <p className={s.meuDetalhe}>
                      {siglaDia(evento.data)} {diaBarraMes(evento.data)} · {localPorId(evento.localId).curto} · plano{' '}
                      {ROTULO_PLANO[evento.destaque]}
                      {!noAr && ' · já passou'}
                    </p>
                  </div>
                  <div className={s.meuAcoes}>
                    {noAr && (
                      <Link to={`/evento/${evento.id}`} className={s.meuBotao}>
                        Ver
                      </Link>
                    )}
                    <button type="button" className={s.meuBotao} onClick={() => despregar(evento.id)}>
                      Despregar
                      <span className="sr-only"> {evento.titulo}</span>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <div className={s.fim}>
        <Link to="/divulgar/novo" className={s.cta}>
          Montar meu cartaz
          <Icone nome="seta" />
        </Link>
      </div>
    </div>
  );
}
