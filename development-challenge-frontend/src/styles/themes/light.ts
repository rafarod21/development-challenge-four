import { createTheme } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: blue,
    error: red,
    background: {
      default: grey[100],
    },
  },
});
