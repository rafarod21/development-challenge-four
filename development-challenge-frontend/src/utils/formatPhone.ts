export function formatPhone(phone: string) {
  const ddd = `(${phone[0]}${phone[1]})`;
  const phoneNumber = `${ddd} ${phone.substring(2, 7)}-${phone.substring(7)}`;

  return phoneNumber;
}
