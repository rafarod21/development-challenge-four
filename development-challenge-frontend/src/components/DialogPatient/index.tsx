import { FormEvent, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  LinearProgress,
  MenuItem,
  TextField,
} from '@mui/material';

import { apiBackend } from '../../services/apiBackend';
import { viaCep } from '../../services/apiViaCep';

import userDefaultImg from '../../assets/user-icon.png';

import { Patient } from '../../@types/Patient';

import {
  InputName,
  InputEmail,
  InputPhoneNumber,
  InputBirthDate,
  InputCep,
  InputStreet,
  InputNumber,
  InputComplement,
  InputDistrict,
  InputCity,
  InputUf,
  HeaderDialog,
  InputsContainer,
} from './styles';

const UF_STATES = [
  'RO',
  'AC',
  'AM',
  'RR',
  'PA',
  'AP',
  'TO',
  'MA',
  'PI',
  'CE',
  'RN',
  'PB',
  'PE',
  'AL',
  'SE',
  'BA',
  'MG',
  'ES',
  'RJ',
  'SP',
  'PR',
  'SC',
  'RS',
  'MS',
  'MT',
  'GO',
  'DF',
] as const;

type viaCepProps = {
  data: {
    bairro: string;
    cep: string;
    complemento: string;
    // ddd: string;
    // gia: string;
    // ibge: string;
    localidade: string;
    logradouro: string;
    // siafi: string;
    uf: typeof UF_STATES[number];
  };
};

interface InputString {
  value: string;
  error: boolean;
}

interface DialogPatientProps {
  patient: Patient;
  isNewPatient: boolean;
  isOpen: boolean;
  closeModal: () => void;
}

export function DialogPatient({
  patient,
  isNewPatient,
  isOpen,
  closeModal,
}: DialogPatientProps) {
  const [loading, setLoading] = useState(false);
  const [changeData, setChangeData] = useState(false);
  const [name, setName] = useState<InputString>({ value: '', error: false });
  const [email, setEmail] = useState<InputString>({ value: '', error: false });
  const [phoneNumber, setPhoneNumber] = useState<InputString>({
    value: '',
    error: false,
  });
  const [cep, setCep] = useState<InputString>({ value: '', error: false });
  const [street, setStreet] = useState<InputString>({
    value: '',
    error: false,
  });
  const [number, setNumber] = useState<InputString>({
    value: '',
    error: false,
  });
  const [complement, setComplement] = useState<InputString>({
    value: '',
    error: false,
  });
  const [district, setDistrict] = useState<InputString>({
    value: '',
    error: false,
  });
  const [city, setCity] = useState<InputString>({ value: '', error: false });
  const [uf, setUf] = useState<InputString>({ value: '', error: false });
  const [birthDate, setBirthDate] = useState<Date | unknown>(
    new Date('2000-01-01')
  );

  function validateInputs() {
    let allValid = true;

    if (name.value.length < 3) {
      setName((state) => {
        return {
          ...state,
          error: true,
        };
      });
      allValid = false;
    }
    if (email.value.length < 5) {
      setEmail((state) => {
        return {
          ...state,
          error: true,
        };
      });
      allValid = false;
    }
    if (phoneNumber.value.length !== 11) {
      setPhoneNumber((state) => {
        return {
          ...state,
          error: true,
        };
      });
      allValid = false;
    }
    if (cep.value.length !== 8) {
      setCep((state) => {
        return {
          ...state,
          error: true,
        };
      });
      allValid = false;
    }
    if (street.value.length < 3) {
      setStreet((state) => {
        return {
          ...state,
          error: true,
        };
      });
      allValid = false;
    }
    const regexOnlyIntegers = /^[0-9]*$/;
    if (number.value.length === 0 || !regexOnlyIntegers.test(number.value)) {
      setNumber((state) => {
        return {
          ...state,
          error: true,
        };
      });
      allValid = false;
    }
    // complement not required
    if (district.value.length < 1) {
      setDistrict((state) => {
        return {
          ...state,
          error: true,
        };
      });
      allValid = false;
    }
    if (city.value.length < 1) {
      setCity((state) => {
        return {
          ...state,
          error: true,
        };
      });
      allValid = false;
    }
    if (uf.value.length !== 2) {
      setUf((state) => {
        return {
          ...state,
          error: true,
        };
      });
      allValid = false;
    }

    return allValid;
  }

  async function handleCreateNewPatient(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    if (!validateInputs()) {
      return;
    }

    try {
      await apiBackend.post(`/patients`, {
        name: name.value,
        email: email.value,
        phone: phoneNumber.value,
        birthDate: birthDate as Date,
        address: {
          cep: cep.value,
          street: street.value,
          number: Number(number.value),
          complement: complement.value,
          district: district.value,
          city: city.value,
          uf: uf.value,
        },
      });

      alert('Paciente cadastrado com sucesso!');
      closeModal();
    } catch (error) {
      console.log(error);
      alert('Erro ao cadastrar o paciente');
    }

    setLoading(false);
  }

  async function handleChangeDataPatient(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    if (!validateInputs()) {
      return;
    }

    try {
      await apiBackend.put(`/patients/${patient.id}`, {
        name: name.value,
        email: email.value,
        phone: phoneNumber.value,
        birthDate: birthDate as Date,
        address: {
          cep: cep.value,
          street: street.value,
          number: Number(number.value),
          complement: complement.value,
          district: district.value,
          city: city.value,
          uf: uf.value,
        },
      });

      alert('Dados do paciente alterados com sucesso!');
      closeModal();
    } catch (error) {
      console.log(error);
      alert('Erro ao alterar os dados do paciente...');
    }

    setLoading(false);
  }

  async function handleGetDataCep() {
    if (cep.value.length === 8) {
      const { data }: viaCepProps = await viaCep.get(`/${cep.value}/json`);

      if ('erro' in data) {
        setCep((state) => {
          return {
            ...state,
            error: true,
          };
        });

        return;
      }

      setCep((state) => {
        return {
          ...state,
          error: false,
        };
      });
      setStreet({
        ...street,
        value: data.logradouro,
      });
      setDistrict({
        ...district,
        value: data.bairro,
      });
      setCity({
        ...city,
        value: data.localidade,
      });
      setUf({
        ...uf,
        value: data.uf,
      });
    } else {
      setCep((state) => {
        return {
          ...state,
          error: true,
        };
      });
    }
  }

  function resetForm() {
    setName({ value: '', error: false });
    setEmail({ value: '', error: false });
    setPhoneNumber({ value: '', error: false });
    setCep({ value: '', error: false });
    setStreet({ value: '', error: false });
    setNumber({ value: '', error: false });
    setComplement({ value: '', error: false });
    setDistrict({ value: '', error: false });
    setCity({ value: '', error: false });
    setUf({ value: '', error: false });
    setBirthDate(new Date('2000-01-01'));
  }

  useEffect(() => {
    if (isOpen) {
      if (isNewPatient) resetForm();
      else {
        setChangeData(false);
        setName({ value: patient.name, error: false });
        setEmail({ value: patient.email, error: false });
        setPhoneNumber({ value: patient.phone, error: false });
        setBirthDate(patient.birthDate);
        if (patient.address) {
          setCep({ value: patient.address.cep, error: false });
          setStreet({ value: patient.address.street, error: false });
          setNumber({ value: String(patient.address.number), error: false });
          setComplement({
            value: patient.address.complement || '',
            error: false,
          });
          setDistrict({ value: patient.address.district, error: false });
          setCity({ value: patient.address.city, error: false });
          setUf({ value: patient.address.uf, error: false });
        }
      }
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={closeModal} maxWidth='md'>
      <Box
        component='form'
        onSubmit={
          isNewPatient ? handleCreateNewPatient : handleChangeDataPatient
        }
      >
        {loading && <LinearProgress />}
        <HeaderDialog>
          {isNewPatient ? (
            'Novo paciente'
          ) : (
            <>
              <Avatar alt='aaaa' src={userDefaultImg} />
              {!changeData && patient.name}
            </>
          )}
        </HeaderDialog>
        <InputsContainer>
          <InputName
            required
            id='name-input'
            label='Nome completo'
            disabled={(!changeData && !isNewPatient) || loading}
            value={name.value}
            error={name.error}
            onFocus={() =>
              setName((state) => {
                return {
                  ...state,
                  error: false,
                };
              })
            }
            onChange={(event) =>
              setName((state) => {
                return {
                  ...state,
                  value: event.target.value,
                };
              })
            }
            onBlur={() =>
              setName((state) => {
                return {
                  ...state,
                  value: state.value.trim(),
                };
              })
            }
          />
          <InputEmail
            required
            id='email-input'
            label='E-mail'
            type='email'
            disabled={(!changeData && !isNewPatient) || loading}
            value={email.value}
            error={email.error}
            onFocus={() =>
              setEmail((state) => {
                return {
                  ...state,
                  error: false,
                };
              })
            }
            onChange={(event) =>
              setEmail((state) => {
                return {
                  ...state,
                  value: event.target.value.trim(),
                };
              })
            }
          />
          <InputPhoneNumber
            required
            id='phone-input'
            label='Telefone'
            format='(##) #####-####'
            valueIsNumericString
            disabled={(!changeData && !isNewPatient) || loading}
            value={phoneNumber.value}
            error={phoneNumber.error}
            onFocus={() =>
              setPhoneNumber((state) => {
                return {
                  ...state,
                  error: false,
                };
              })
            }
            onValueChange={(values) =>
              setPhoneNumber((state) => {
                return {
                  ...state,
                  value: values.value,
                };
              })
            }
            // @ts-ignore: Unreachable code error
            customInput={TextField}
            inputProps={{ inputMode: 'numeric' }}
          />
          <InputBirthDate
            label='Data de nascimento'
            disabled={(!changeData && !isNewPatient) || loading}
            value={birthDate}
            onChange={(newDate) => {
              setBirthDate(newDate);
            }}
            disableFuture
            closeOnSelect
            showToolbar={false}
            renderInput={(params) => <TextField {...params} />}
          />
          <InputCep
            required
            id='cep-input'
            label='CEP'
            format='#####-###'
            valueIsNumericString
            disabled={(!changeData && !isNewPatient) || loading}
            value={cep.value}
            error={cep.error}
            onFocus={() =>
              setCep((state) => {
                return {
                  ...state,
                  error: false,
                };
              })
            }
            onValueChange={(values) =>
              setCep((state) => {
                return {
                  ...state,
                  value: values.value,
                };
              })
            }
            // @ts-ignore: Unreachable code error
            customInput={TextField}
            inputProps={{ inputMode: 'numeric', onBlur: handleGetDataCep }}
          />
          <InputStreet
            required
            id='street-input'
            label='Logradouro'
            disabled={(!changeData && !isNewPatient) || loading}
            value={street.value}
            error={street.error}
            onFocus={() =>
              setStreet((state) => {
                return {
                  ...state,
                  error: false,
                };
              })
            }
            onChange={(event) =>
              setStreet((state) => {
                return {
                  ...state,
                  value: event.target.value,
                };
              })
            }
            onBlur={() => {
              setStreet((state) => {
                return {
                  ...state,
                  value: state.value.trim(),
                };
              });
            }}
          />
          <InputNumber
            required
            id='number-input'
            label='Número'
            // type='number'
            // inputProps={{ inputMode: 'numeric' }}
            disabled={(!changeData && !isNewPatient) || loading}
            value={number.value}
            error={number.error}
            onFocus={() =>
              setNumber((state) => {
                return {
                  ...state,
                  error: false,
                };
              })
            }
            onChange={(event) =>
              setNumber((state) => {
                return {
                  ...state,
                  value: event.target.value.trim(),
                };
              })
            }
          />
          <InputComplement
            id='complement-input'
            label='Complemento'
            disabled={(!changeData && !isNewPatient) || loading}
            value={complement.value}
            error={complement.error}
            onFocus={() =>
              setComplement((state) => {
                return {
                  ...state,
                  error: false,
                };
              })
            }
            onChange={(event) =>
              setComplement((state) => {
                return {
                  ...state,
                  value: event.target.value,
                };
              })
            }
            onBlur={() =>
              setComplement((state) => {
                return {
                  ...state,
                  value: state.value.trim(),
                };
              })
            }
          />
          <InputDistrict
            required
            id='district-input'
            label='Bairro'
            disabled={(!changeData && !isNewPatient) || loading}
            value={district.value}
            error={district.error}
            onFocus={() =>
              setDistrict((state) => {
                return {
                  ...state,
                  error: false,
                };
              })
            }
            onChange={(event) =>
              setDistrict((state) => {
                return {
                  ...state,
                  value: event.target.value,
                };
              })
            }
            onBlur={() =>
              setDistrict((state) => {
                return {
                  ...state,
                  value: state.value.trim(),
                };
              })
            }
          />
          <InputCity
            required
            id='city-input'
            label='Cidade'
            disabled={(!changeData && !isNewPatient) || loading}
            value={city.value}
            error={city.error}
            onFocus={() =>
              setCity((state) => {
                return {
                  ...state,
                  error: false,
                };
              })
            }
            onChange={(event) =>
              setCity((state) => {
                return {
                  ...state,
                  value: event.target.value,
                };
              })
            }
            onBlur={() =>
              setCity((state) => {
                return {
                  ...state,
                  value: state.value.trim(),
                };
              })
            }
          />
          <InputUf
            required
            id='uf-input-select'
            select
            label='Estado (UF)'
            disabled={(!changeData && !isNewPatient) || loading}
            value={uf.value}
            error={uf.error}
            onFocus={() =>
              setUf((state) => {
                return {
                  ...state,
                  error: false,
                };
              })
            }
            onChange={(event) =>
              setUf((state) => {
                return {
                  ...state,
                  value: event.target.value,
                };
              })
            }
          >
            {UF_STATES.map((ufItem) => (
              <MenuItem key={ufItem} value={ufItem}>
                {ufItem}
              </MenuItem>
            ))}
          </InputUf>
        </InputsContainer>

        <DialogActions>
          {isNewPatient ? (
            <>
              <Button type='button' onClick={closeModal} disabled={loading}>
                Cancelar
              </Button>
              <Button type='submit' disabled={loading}>
                Cadastrar novo paciente
              </Button>
            </>
          ) : changeData ? (
            <>
              <Button onClick={() => setChangeData(false)} disabled={loading}>
                Cancelar
              </Button>
              <Button type='submit' disabled={loading}>
                Concluir alterações
              </Button>
            </>
          ) : (
            <Button onClick={() => setChangeData(true)}>
              Alterar dados do paciente
            </Button>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
}
