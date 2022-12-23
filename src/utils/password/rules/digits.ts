import { PasswordErrorType } from 'interfaces/Password'

/**
 * Checks to make sure there is at least one digit in the password
 * @param password
 * @returns
 */
export const validatePasswordDigits = (password: string) => {
  const isValid = !!password.match(/(?=.*?[0-9])/)
  return {
    valid: isValid,
    message: PasswordErrorType.DIGIT,
  }
}
