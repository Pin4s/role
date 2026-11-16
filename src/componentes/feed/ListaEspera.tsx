import { WAITLIST_URL } from '../../config';
import { Icone } from '../Icone';
import s from './ListaEspera.module.css';

/** Faixa da lista de espera: é por aqui que a validação é medida. */
export function ListaEspera() {
  return (
    <aside className={s.faixa} aria-labelledby="lista-espera-titulo">
      <span className={s.fita} aria-hidden="true" />
      <h2 id="lista-espera-titulo" className={s.titulo}>
        O Rolê tá em teste.
      </h2>
      <p className={s.texto}>Quer ser avisado quando lançar? Deixa o contato que a gente chama.</p>
      <a className={s.botao} href={WAITLIST_URL} target="_blank" rel="noopener noreferrer">
        Quero ser avisado
        <Icone nome="seta" tamanho={20} />
        <span className="sr-only">(abre o formulário em outra aba)</span>
      </a>
    </aside>
  );
}
