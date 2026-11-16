import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import '@fontsource/anton/latin-400.css';
import '@fontsource/archivo/latin-400.css';
import '@fontsource/archivo/latin-500.css';
import '@fontsource/archivo/latin-600.css';
import '@fontsource/archivo/latin-800.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-600.css';
import './estilos/tokens.css';
import './estilos/global.css';
import { RoleProvider } from './estado/RoleProvider';
import { carregarFonteDisplay } from './lib/fontes';
import { roteador } from './rotas';

carregarFonteDisplay();

const raiz = document.getElementById('root');
if (!raiz) throw new Error('Elemento #root não encontrado');

createRoot(raiz).render(
  <StrictMode>
    <RoleProvider>
      <RouterProvider router={roteador} />
    </RoleProvider>
  </StrictMode>,
);
