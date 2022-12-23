import { PasswordErrorType } from 'interfaces/Password'

const enforceUnique = (password: string, min: number): boolean => {
  const unique: string[] = []
  for (let i = 0; i < password.length; i++) {
    const char: string = password.charAt(i)
    if (unique.indexOf(char) === -1) unique.push(char)
    if (unique.length === min) return true
  }
  return false
}

/**
 * Ensures that at least 5 unique characters are included in the password
 * @param password
 * @returns
 */
export const validatePasswordUnqiue = (password: string) => {
  const isValid: boolean = enforceUnique(password, 5)
  return {
    valid: isValid,
    message: PasswordErrorType.UNIQUE,
  }
}
