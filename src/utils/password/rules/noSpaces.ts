import { PasswordErrorType } from 'interfaces/Password'

/**
 * Ensures that there is no white space in the password
 * @param password
 * @returns
 */
export const validatePasswordSpaces = (password: string) => {
  const isValid = !password.match('([\\s].*)')
  return {
    valid: isValid,
    message: PasswordErrorType.NO_SPACES,
  }
}
