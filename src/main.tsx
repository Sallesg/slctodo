import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import ResetStyles from './views/styles/reset.ts';
import theme from './views/styles/theme.ts';

import { BrowserRouter } from 'react-router-dom';
import { Router } from '@app/Router/Router.tsx';
import { AuthProvider } from '@app/contexts/AuthProvider/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ResetStyles />
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
