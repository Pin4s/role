import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Icone } from '../componentes/Icone';
import { Logo } from '../componentes/moldura/Logo';
import { Contagem } from '../componentes/sobre/Contagem';
import {
  CADASTROS_NA_LISTA,
  META_CADASTROS,
  META_PRODUTORES,
  PRODUTORES_QUE_PAGARIAM,
  WAITLIST_URL,
} from '../config';
import { cx } from '../lib/cx';
import s from './Sobre.module.css';

interface PropsPagina {
  numero: string;
  titulo: string;
  tom: 'papel' | 'tinta' | 'amarelo';
  children: ReactNode;
}

/** Uma página do zine, numerada como as etapas do trabalho. */
function PaginaZine({ numero, titulo, tom, children }: PropsPagina) {
  const id = `etapa-${numero}`;
  return (
    <section className={cx(s.paginaZine, s[tom])} aria-labelledby={id}>
      <p className={s.numero} aria-hidden="true">
        {numero}
      </p>
      <h2 id={id} className={s.tituloEtapa}>
        <span className="sr-only">{numero}. </span>
        {titulo}
      </h2>
      <div className={s.blocos}>{children}</div>
    </section>
  );
}

function Bloco({ rotulo, largo = false, children }: { rotulo: string; largo?: boolean; children: ReactNode }) {
  return (
    <div className={cx(s.bloco, largo && s.blocoLargo)}>
      <h3 className={s.rotulo}>{rotulo}</h3>
      <div className={s.textoBloco}>{children}</div>
    </div>
  );
}

export function Sobre() {
  return (
    <div className={s.pagina}>
      <title>Sobre o Rolê — do problema ao MVP</title>

      <header className={s.capa}>
        <p className={s.sobretitulo}>Do Problema ao MVP · Teófilo Otoni, MG</p>
        <h1 className={s.marca}>
          <Logo grande />
        </h1>
        <p className={s.slogan}>
          Tem rolê, sim. <mark className={s.marcaTexto}>Você que não tava sabendo.</mark>
        </p>
      </header>

      <PaginaZine numero="01" titulo="O problema" tom="papel">
        <Bloco rotulo="A dor">
          <p>
            Em TO quem quer sair não sabe o que tá rolando. A programação fica espalhada em stories de 15 perfis de
            bar, grupo de WhatsApp e boca a boca. A pessoa descobre o rolê <strong>no dia seguinte</strong>, pelo
            story de alguém que foi.
          </p>
        </Bloco>
        <Bloco rotulo="Quem sofre">
          <p>
            Universitários de 18 a 26 anos de Teófilo Otoni (AlfaUnipac, UFVJM campus Mucuri, Doctum e outras), com
            orçamento curto, que decidem o rolê no próprio dia, pelo celular.
          </p>
        </Bloco>
        <Bloco rotulo="Como resolvem hoje">
          <p>
            Caçam story por story no Instagram, perguntam no grupo da turma ou vão no bar de sempre por falta de
            opção. Sympla e parecidos só mostram evento grande.
          </p>
        </Bloco>
      </PaginaZine>

      <PaginaZine numero="02" titulo="A solução" tom="tinta">
        <Bloco rotulo="Nome & slogan" largo>
          <p className={s.destaqueTexto}>Rolê. “Tem rolê, sim. Você que não tava sabendo.”</p>
        </Bloco>
        <Bloco rotulo="Proposta de valor">
          <p>
            A semana inteira da cidade numa tela, filtrável por bolso, distância e vibe.{' '}
            <mark className={s.marcaTexto}>10 segundos no Rolê contra 20 minutos caçando story.</mark>
          </p>
          <p>Pro produtor: o anúncio chega em quem quer sair, não só em quem já segue o perfil.</p>
        </Bloco>
        <Bloco rotulo="Modelo de receita">
          <p>Grátis pro usuário. O produtor paga destaque semanal:</p>
          <ul className={s.lista}>
            <li>
              <strong>Lambe, R$ 29/semana</strong>: topo do dia + selo.
            </li>
            <li>
              <strong>Outdoor, R$ 79/semana</strong>: capa da semana + aviso pra quem salvou o local.
            </li>
            <li>
              <strong>Depois</strong>: 8% de comissão sobre ingresso vendido pelo app.
            </li>
          </ul>
        </Bloco>
      </PaginaZine>

      <PaginaZine numero="03" titulo="O MVP" tom="papel">
        <Bloco rotulo="Formato">
          <p>Protótipo navegável: esse site que você tá vendo, feito pra abrir no celular.</p>
        </Bloco>
        <Bloco rotulo="Custo">
          <p>
            <span className={s.numeroGrande}>R$ 0</span> Vercel pra hospedar e Google Forms pra lista de espera.
          </p>
        </Bloco>
        <Bloco rotulo="Escopo">
          <p>
            Agenda semanal filtrável com 5 filtros (tipo, bolso, distância, estilo e vibe), página do evento com Vou,
            Salvar, Mandar no zap e Como chegar, e o lado do produtor, que monta o cartaz na hora.
          </p>
        </Bloco>
        <Bloco rotulo="O que é de mentira">
          <p>
            Os eventos são fictícios; os 10 locais são reais. Salvos, “vou” e cartazes criados ficam guardados só no
            seu celular.
          </p>
        </Bloco>
      </PaginaZine>

      <PaginaZine numero="04" titulo="Validação" tom="amarelo">
        <Bloco rotulo="Hipótese" largo>
          <blockquote className={s.citacao}>
            Acreditamos que universitários de Teófilo Otoni vão usar o Rolê pra decidir onde sair porque hoje só
            descobrem os eventos depois que eles acontecem.
          </blockquote>
        </Bloco>
        <Bloco rotulo="Canal">
          <p>Grupos de WhatsApp das turmas, Instagram e conversa direta com 5 bares e produtores da cidade.</p>
        </Bloco>
        <Bloco rotulo="Métrica (7 dias)">
          <Contagem rotulo="cadastros na lista de espera" atual={CADASTROS_NA_LISTA} meta={META_CADASTROS} />
          <Contagem rotulo="produtores que pagariam o destaque" atual={PRODUTORES_QUE_PAGARIAM} meta={META_PRODUTORES} />
          <a className={s.linkLista} href={WAITLIST_URL} target="_blank" rel="noopener noreferrer">
            Entrar na lista de espera
            <span className="sr-only"> (abre o formulário em outra aba)</span>
          </a>
        </Bloco>
      </PaginaZine>

      <footer className={s.equipe}>
        <p className={s.rotulo}>Equipe</p>
        <p className={s.nomes}>João Pedro L. Pinas &amp; Simão Pedro A. Vilela</p>
        <Link to="/" className={s.verApp}>
          Ver o app
          <Icone nome="seta" tamanho={28} />
        </Link>
      </footer>
    </div>
  );
}
