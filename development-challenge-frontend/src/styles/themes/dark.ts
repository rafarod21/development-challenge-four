import { createTheme } from '@mui/material';
import { blue, grey, orange, red } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: blue,
    secondary: orange,
    error: red,
    background: {
      default: grey[900],
    },
  },
});
