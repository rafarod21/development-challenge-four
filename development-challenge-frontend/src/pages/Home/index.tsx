import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { format } from 'date-fns';
import { Plus, Trash } from 'phosphor-react';

import { DialogPatient } from '../../components/DialogPatient';

import { formatAddressToJustOneString } from '../../utils/formatAddressToJustOneString';
import { formatPhone } from '../../utils/formatPhone';

import { Patient } from '../../@types/Patient';

import userDefaultImg from '../../assets/user-icon.png';

import { ButtonNewPatientContaier, CustomTable, HomeContainer } from './styles';

import { fakePatients } from '../../data';
import { apiBackend } from '../../services/apiBackend';

export function Home() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [patientsList, setPatientsList] = useState<Patient[]>([]);
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [currentPatient, setCurrentPatient] = useState({} as Patient);

  function handleShowPatient(patient: Patient) {
    setIsNewPatient(false);
    setCurrentPatient(patient);
    setIsOpenModal(true);
  }

  function handleNewPatient() {
    setIsNewPatient(true);
    setCurrentPatient({} as Patient);
    setIsOpenModal(true);
  }

  function getPatients() {
    apiBackend.get('/patients').then((response) => {
      const patients = response.data.map((patient: Patient) => {
        return {
          ...patient,
          birthDate: new Date(patient.birthDate),
        };
      });

      setPatientsList(patients);
    });
  }

  async function handleDeletePatient(patientId: string, patientName: string) {
    if (
      window.confirm(
        `Tem certeza que deseja excluir ${patientName} da lista de pacientes?`
      )
    ) {
      // console.log(`${patientId}`);
      const { status } = await apiBackend.delete(`/patients/${patientId}`);

      if (status === 200) {
        alert('Paciente excluído com sucesso!');
        getPatients();
      } else {
        alert('Erro ao excluir o paciente...');
      }
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  useEffect(() => {
    getPatients();
  }, [isOpenModal]);

  return (
    <HomeContainer>
      <h1>Registro de pacientes</h1>
      <ButtonNewPatientContaier>
        <Button
          variant='contained'
          startIcon={<Plus />}
          onClick={handleNewPatient}
        >
          Novo paciente
        </Button>
      </ButtonNewPatientContaier>

      <TableContainer component={Box}>
        <CustomTable size='medium' aria-label='Lista de pacientes'>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell align='center'>Data de nascimento</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody sx={{ gap: 20 }}>
            {patientsList.map((patient) => (
              <Paper
                component='tr'
                key={patient.id}
                sx={{ '&:hover': { bgcolor: 'primary.main' } }}
              >
                <TableCell onClick={() => handleShowPatient(patient)}>
                  <Avatar alt={patient.name} src={userDefaultImg} />{' '}
                  {patient.name}
                </TableCell>
                <TableCell onClick={() => handleShowPatient(patient)}>
                  {patient.email}
                </TableCell>
                <TableCell onClick={() => handleShowPatient(patient)}>
                  {formatPhone(patient.phone)}
                </TableCell>
                <TableCell
                  onClick={() => handleShowPatient(patient)}
                  align='center'
                >
                  {format(patient.birthDate, 'dd/MM/yyyy')}
                </TableCell>
                <TableCell onClick={() => handleShowPatient(patient)}>
                  {formatAddressToJustOneString(patient.address)}
                </TableCell>
                <TableCell align='right'>
                  <IconButton
                    aria-label='delete'
                    color='error'
                    onClick={() =>
                      handleDeletePatient(patient.id, patient.name)
                    }
                  >
                    <Trash />
                  </IconButton>
                </TableCell>
              </Paper>
            ))}
          </TableBody>
        </CustomTable>
      </TableContainer>

      <DialogPatient
        patient={currentPatient}
        isNewPatient={isNewPatient}
        isOpen={isOpenModal}
        closeModal={handleCloseModal}
      />
    </HomeContainer>
  );
}

// https://dribbble.com/shots/3141791/attachments/3141791-Agile-CRM-Contacts?mode=media
