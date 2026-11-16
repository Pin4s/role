# Rolê

> Tem rolê, sim. Você que não tava sabendo.

MVP navegável do **Rolê**, a agenda de tudo que acontece em Teófilo Otoni (MG) na semana: shows, bar, festa, feira, stand-up, calourada e futebol no telão, filtrada por bolso, distância e vibe. Trabalho da disciplina "Do Problema ao MVP".

**Produção:** _(link da Vercel aqui depois do deploy)_

Equipe: João Pedro L. Pinas & Simão Pedro A. Vilela.

## Rotas

| Rota | O que é |
|---|---|
| `/` | Agenda da semana: faixa de dias, 5 filtros e mural de cartazes |
| `/evento/:id` | Cartaz grande, ingresso com as informações, Vou, Salvar, Mandar no zap e Como chegar |
| `/salvos` | Cartazes salvos nesse aparelho |
| `/divulgar` | Pitch e planos pro dono de bar/produtor |
| `/divulgar/novo` | Formulário com preview do cartaz em tempo real |
| `/sobre` | Pitch em formato de zine (usado na apresentação) |

## Como rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build
```

## O que é mockado

- **Eventos:** fictícios, em `src/dados/eventos.ts`. Cada um diz o dia da semana em que acontece e a data é calculada a partir de hoje (fuso de São Paulo), então o app nunca mostra evento passado.
- **Locais:** reais, em `src/dados/locais.ts`. Bairros e distâncias são aproximados.
- **Salvos, "Vou" e eventos criados pelo produtor:** ficam só no `localStorage` do aparelho.
- **Lista de espera:** link externo pra um Google Forms. Troque `WAITLIST_URL` em `src/config.ts`.
- **Métrica no `/sobre`:** `CADASTROS_NA_LISTA` e `PRODUTORES_QUE_PAGARIAM` em `src/config.ts`, atualizados à mão.

## Stack

Vite + React + TypeScript + React Router. CSS próprio com design tokens (`src/estilos/tokens.css`) e CSS Modules. Fontes via `@fontsource` (Anton, Archivo, IBM Plex Mono). Sem backend e sem UI kit.

Os cartazes não usam foto: são montados com tipografia e formas a partir dos dados do evento (`src/componentes/cartaz/`). Layout (5 opções), cor spot (4), inclinação e fita saem de um hash do `id`.
