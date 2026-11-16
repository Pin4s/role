import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { Cartaz } from '../componentes/cartaz/Cartaz';
import { dadosDoCartaz, type DadosCartaz } from '../componentes/cartaz/dados';
import { FormularioEvento } from '../componentes/form/FormularioEvento';
import { Icone } from '../componentes/Icone';
import type { Evento } from '../dominio/tipos';
import { useRole } from '../estado/useRole';
import {
  novoId,
  ORDEM_DOS_CAMPOS,
  paraEvento,
  precoEmCentavos,
  rascunhoVazio,
  validar,
  type Rascunho,
} from '../lib/rascunho';
import s from './NovoEvento.module.css';

/** Dados do cartaz enquanto o produtor digita, com textos de exemplo no lugar do vazio. */
function dadosDoRascunho(rascunho: Rascunho): DadosCartaz {
  const dados = dadosDoCartaz({
    id: rascunho.id,
    titulo: rascunho.titulo.trim() || 'Seu rolê aqui',
    artista: rascunho.artista.trim() || 'Quem toca',
    data: rascunho.data,
    horaInicio: /^\d{2}:\d{2}$/.test(rascunho.horaInicio) ? rascunho.horaInicio : '21:00',
    preco: precoEmCentavos(rascunho.preco) ?? 0,
    tipo: rascunho.tipo,
    localId: rascunho.localId || 'praca-tiradentes',
  });
  return rascunho.localId ? dados : { ...dados, local: 'ONDE?', bairro: 'TEÓFILO OTONI' };
}

function Publicado({ evento, hoje, aoMontarOutro }: { evento: Evento; hoje: string; aoMontarOutro: () => void }) {
  const titulo = useRef<HTMLHeadingElement>(null);
  useEffect(() => titulo.current?.focus(), []);
  const linkMural = evento.data === hoje ? '/' : `/?dia=${evento.data}`;

  return (
    <div className={s.publicado}>
      <title>Cartaz publicado — Rolê</title>
      <p className={s.sobretitulo}>Pronto</p>
      <h1 ref={titulo} tabIndex={-1} className={s.tituloPublicado}>
        Seu cartaz tá no mural.
      </h1>
      <div className={s.cartazPublicado}>
        <Cartaz dados={dadosDoCartaz(evento)} plano={evento.destaque} novo inclinar />
      </div>
      <div className={s.acoesPublicado}>
        <Link to={linkMural} className={s.botaoEscuro}>
          Ver no mural
          <Icone nome="seta" />
        </Link>
        <Link to={`/evento/${evento.id}`} className={s.botaoClaro}>
          Abrir a página do rolê
        </Link>
        <button type="button" className={s.botaoTexto} onClick={aoMontarOutro}>
          Montar outro cartaz
        </button>
      </div>
    </div>
  );
}

export function NovoEvento() {
  const { hoje, dias, publicar } = useRole();
  const [rascunho, setRascunho] = useState<Rascunho>(() => rascunhoVazio(hoje));
  const [tentou, setTentou] = useState(false);
  const [publicado, setPublicado] = useState<Evento | null>(null);

  const erros = tentou ? validar(rascunho) : {};

  function aoMudar(parcial: Partial<Rascunho>) {
    setRascunho((atual) => ({ ...atual, ...parcial }));
  }

  function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setTentou(true);
    const errosAgora = validar(rascunho);
    const primeiro = ORDEM_DOS_CAMPOS.find((campo) => errosAgora[campo]);
    if (primeiro) {
      document.getElementById(`campo-${primeiro}`)?.querySelector<HTMLElement>('input, select, textarea')?.focus();
      return;
    }
    const pronto = paraEvento(rascunho);
    if (!pronto) return;
    publicar(pronto);
    setPublicado(pronto);
    window.scrollTo({ top: 0 });
  }

  function montarOutro() {
    setRascunho(rascunhoVazio(hoje));
    setTentou(false);
    setPublicado(null);
  }

  if (publicado) {
    return (
      <div className={s.pagina}>
        <Publicado evento={publicado} hoje={hoje} aoMontarOutro={montarOutro} />
      </div>
    );
  }

  const totalErros = Object.keys(erros).length;

  return (
    <div className={s.pagina}>
      <title>Montar cartaz — Rolê</title>
      <Link to="/divulgar" className={s.voltar}>
        <Icone nome="voltar" tamanho={20} />
        Planos e preços
      </Link>
      <header className={s.cabecalho}>
        <h1 className={s.titulo}>Monta teu cartaz</h1>
        <p className={s.texto}>Vai preenchendo que o cartaz nasce sozinho. Leva um minuto.</p>
      </header>

      <form className={s.grade} onSubmit={aoEnviar} noValidate>
        <div className={s.campos}>
          <FormularioEvento rascunho={rascunho} erros={erros} hoje={hoje} dias={dias} aoMudar={aoMudar} />
        </div>

        <div className={s.colunaPreview}>
          <div className={s.preview}>
            <p className={s.legendaPreview} id="legenda-preview">
              Assim vai ficar no mural
            </p>
            <div className={s.cartazPreview} role="img" aria-labelledby="legenda-preview">
              <Cartaz dados={dadosDoRascunho(rascunho)} plano={rascunho.plano} novo inclinar />
            </div>
            <button type="button" className={s.sortear} onClick={() => aoMudar({ id: novoId() })}>
              Sortear outro cartaz
            </button>
            {totalErros > 0 && (
              <p className={s.avisoErros} role="alert">
                Falta {totalErros === 1 ? 'um detalhe' : `${totalErros} detalhes`} ali no formulário.
              </p>
            )}
            <button type="submit" className={s.publicar}>
              Bota no mural
              <Icone nome="seta" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
