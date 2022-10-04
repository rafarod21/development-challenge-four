import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

export interface Address {
  cep: string;
  street: string;
  number: number;
  complement?: string;
  district: string;
  city: string;
  uf: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  address: Address;
  image?: string;
}

// Listar pacientes
app.get('/patients', async (request, response) => {
  const patients = await prisma.patient.findMany();

  const patientsFormat = patients.map((patient) => {
    return {
      id: patient.id,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      birthDate: patient.birthDate,
      address: {
        cep: patient.cep,
        street: patient.street,
        number: patient.number,
        complement: patient.complement,
        district: patient.district,
        city: patient.city,
        uf: patient.uf,
      },
      image: patient.image,
    };
  });

  return response.json(patientsFormat);
});

// Cadastrar novo paciente
app.post('/patients', async (request, response) => {
  const body = request.body;

  const newPatient = await prisma.patient.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      birthDate: body.birthDate,
      cep: body.address.cep,
      street: body.address.street,
      number: body.address.number,
      complement: body.address.complement,
      district: body.address.district,
      city: body.address.city,
      uf: body.address.uf,
    },
  });

  return response.status(201).json(newPatient);
});

// Alterar dados de um paciente
app.put('/patients/:id', async (request, response) => {
  const patientId = request.params.id;

  const body = request.body;
  const patient = await prisma.patient.update({
    where: { id: patientId },
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      birthDate: body.birthDate,
      cep: body.address.cep,
      street: body.address.street,
      number: body.address.number,
      complement: body.address.complement,
      district: body.address.district,
      city: body.address.city,
      uf: body.address.uf,
    },
  });

  return response.status(200).json(patient);
});

// Deletar um paciente
app.delete('/patients/:id', async (request, response) => {
  const patientId: string = request.params.id;

  const patient = await prisma.patient.delete({
    where: { id: patientId },
  });

  return response.status(200).send();
});

app.listen(3333);
