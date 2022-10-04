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
