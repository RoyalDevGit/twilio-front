import { PasswordErrorType } from 'interfaces/Password'

/**
 * Checks to make sure at least one uppercase
 * character is included in the password
 * @param password
 * @returns
 */
export const validateUppercase = (password: string) => {
  const isValid = !!password.match(/^(?=.*?[A-Z])/)
  return {
    valid: isValid,
    message: PasswordErrorType.UPPERCASE,
  }
}
