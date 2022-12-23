import { PhoneNumber } from 'interfaces/PhoneNumber'

export const joinPhoneNumber = (phoneNumber: PhoneNumber) =>
  `+${phoneNumber.countryCode}${phoneNumber.number}`
