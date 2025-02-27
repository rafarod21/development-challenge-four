import { css, Global } from '@emotion/react';
import { CssBaseline } from '@mui/material';

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body,
  input,
  textarea,
  button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }
`;

export function GlobalStyles() {
  return (
    <>
      <CssBaseline />
      <Global styles={globalStyles} />
    </>
  );
}
