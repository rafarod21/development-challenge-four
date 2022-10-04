import { Box, Paper, Table } from '@mui/material';
import styled from '@emotion/styled';

export const HomeContainer = styled(Box)`
  width: 100vw;
  height: 100vh;
  padding: 2rem;

  text-align: center;
`;

export const ButtonNewPatientContaier = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin: 2rem 0;

  > button {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
`;

export const CustomTable = styled(Table)`
  border-collapse: separate;
  border-spacing: 0 1rem;

  td,
  th {
    border: 0;
  }

  tbody {
    td:first-of-type {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }

  @media (max-width: 900px) {
    thead {
      th:nth-of-type(5) {
        display: none;
      }
    }
    tbody {
      td:nth-of-type(5) {
        display: none;
      }
    }
  }

  @media (max-width: 650px) {
    thead {
      th:nth-of-type(4) {
        display: none;
      }
    }
    tbody {
      td:nth-of-type(4) {
        display: none;
      }
    }
  }

  @media (max-width: 550px) {
    thead {
      th:nth-of-type(2) {
        display: none;
      }
    }
    tbody {
      td:nth-of-type(2) {
        display: none;
      }
    }
  }
`;
