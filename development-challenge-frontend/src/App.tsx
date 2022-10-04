import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Router } from './Router';

import { darkTheme } from './styles/themes/dark';
import { lightTheme } from './styles/themes/light';
import { GlobalStyles } from './styles/global';

export function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Router />
          <GlobalStyles />
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
