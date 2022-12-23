import { PasswordErrorType } from 'interfaces/Password'

/**
 * Checks to make sure the password is a certain length
 * @param password
 * @returns
 */
export const validatePasswordLength = (password: string) => {
  const isValid = !!password.match(/^.{10,100}$/)
  return {
    valid: isValid,
    message: PasswordErrorType.LENGTH,
  }
}
