import { PasswordErrorType } from 'interfaces/Password'

/**
 * Ensures that there is at least one special character in the password
 * @param password
 * @returns
 */
export const validatePasswordSpecialCharacters = (password: string) => {
  const isValid = !!password.match(
    '([`~\\!@#\\$%\\^\\&\\*\\(\\)\\-_\\=\\+\\[\\{\\}\\]\\\\|;:\\\'",<.>\\/\\?€£¥₹§±].*)'
  )
  return {
    valid: isValid,
    message: PasswordErrorType.SPECIAL_CHARACTER,
  }
}
