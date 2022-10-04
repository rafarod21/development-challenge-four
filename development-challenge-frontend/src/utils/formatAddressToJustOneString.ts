import { Address } from '../@types/contact';

export function formatAddressToJustOneString({
  cep,
  street,
  number,
  district,
  complement,
  city,
  uf,
}: Address) {
  if (complement)
    return (
      street +
      ', ' +
      number +
      ', ' +
      complement +
      ', ' +
      district +
      ', ' +
      city +
      '-' +
      uf
    );
  else {
    return street + ', ' + number + ', ' + district + ', ' + city + '-' + uf;
  }
}
