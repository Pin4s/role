import { createBrowserRouter } from 'react-router';
import { Moldura } from './componentes/moldura/Moldura';
import { Divulgar } from './paginas/Divulgar';
import { RotaEvento } from './paginas/Evento';
import { Feed } from './paginas/Feed';
import { NaoEncontrado } from './paginas/NaoEncontrado';
import { NovoEvento } from './paginas/NovoEvento';
import { Salvos } from './paginas/Salvos';
import { Sobre } from './paginas/Sobre';

export const roteador = createBrowserRouter([
  {
    element: <Moldura />,
    children: [
      { path: '/', element: <Feed /> },
      { path: '/evento/:id', element: <RotaEvento /> },
      { path: '/salvos', element: <Salvos /> },
      { path: '/divulgar', element: <Divulgar /> },
      { path: '/divulgar/novo', element: <NovoEvento /> },
      { path: '/sobre', element: <Sobre /> },
      { path: '*', element: <NaoEncontrado /> },
    ],
  },
]);
