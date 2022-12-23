import { PasswordErrorType } from 'interfaces/Password'

/**
 * Checks to make sure at least one lowercase
 * character is included in the password
 * @param password
 * @returns
 */
export const validatePasswordLowercase = (password: string) => {
  const isValid = !!password.match(/^(?=.*?[a-z])/)
  return {
    valid: isValid,
    message: PasswordErrorType.LOWERCASE,
  }
}
