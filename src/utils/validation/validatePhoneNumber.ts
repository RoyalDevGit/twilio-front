import isMobilePhone from 'validator/lib/isMobilePhone'

import { PhoneNumber } from 'interfaces/PhoneNumber'
import { joinPhoneNumber } from 'utils/string/joinPhoneNumber'

export const validatePhoneNumber = (phoneNumber: PhoneNumber) =>
  isMobilePhone(joinPhoneNumber(phoneNumber), 'any', {
    strictMode: true,
  })
