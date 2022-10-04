import { Box, DialogContent, DialogTitle, TextField } from '@mui/material';
import { NumberFormatBaseProps, PatternFormat } from 'react-number-format';
import { DatePicker } from '@mui/x-date-pickers';
import styled from '@emotion/styled';

export const HeaderDialog = styled(DialogTitle)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-transform: uppercase;

  div {
    height: 10rem;
    width: 10rem;
  }
`;

export const InputsContainer = styled(DialogContent)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    'name name name name'
    'email email email email'
    'phone phone birthDate birthDate'
    'cep . . .'
    'street street street number'
    'complement complement district district'
    'city city uf .';
  gap: 1.5rem;

  @media (max-width: 650px) {
    grid-template-areas:
      'name name name name'
      'email email email email'
      'phone phone birthDate birthDate'
      'cep cep . .'
      'street street number number'
      'complement complement district district'
      'city city uf uf';
  }
`;

export const InputName = styled(TextField)`
  grid-area: name;
  margin-top: 0.5rem;
`;

export const InputEmail = styled(TextField)`
  grid-area: email;
`;

export const InputPhoneNumber = styled(PatternFormat)`
  grid-area: phone;
`;

export const InputBirthDate = styled(DatePicker)`
  grid-area: birthDate;
`;

export const InputCep = styled(PatternFormat)`
  grid-area: cep;
`;

export const InputStreet = styled(TextField)`
  grid-area: street;
`;

export const InputNumber = styled(TextField)`
  grid-area: number;
`;

export const InputComplement = styled(TextField)`
  grid-area: complement;
`;

export const InputDistrict = styled(TextField)`
  grid-area: district;
`;

export const InputCity = styled(TextField)`
  grid-area: city;
`;

export const InputUf = styled(TextField)`
  grid-area: uf;
`;
