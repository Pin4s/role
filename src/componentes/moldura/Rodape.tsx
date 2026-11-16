import s from './Rodape.module.css';

export function Rodape() {
  return (
    <footer className={s.rodape}>
      <p className={s.aviso}>Protótipo acadêmico — eventos fictícios para demonstração.</p>
      <p className={s.credito}>
        Os locais são reais; bairros e distâncias são aproximados. Rolê · Teófilo Otoni, MG.
      </p>
    </footer>
  );
}
