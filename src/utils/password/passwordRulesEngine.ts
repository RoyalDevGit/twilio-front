import { validatePasswordDigits } from './rules/digits'
import { validatePasswordLength } from './rules/length'
import { validatePasswordLowercase } from './rules/lowercase'
import { validatePasswordSpaces } from './rules/noSpaces'
import { validatePasswordUnqiue } from './rules/unique'
import { validateUppercase } from './rules/uppercase'
import { validatePasswordSpecialCharacters } from './rules/specialCharacters'

import { PasswordErrorType } from 'interfaces/Password'

export interface PasswordValidationResults {
  errors: PasswordErrorType[]
  score: number
}

/**
 * Easily stack password rules into this array
 */
const rules = [
  validatePasswordDigits,
  validatePasswordLength,
  validatePasswordUnqiue,
  validatePasswordLowercase,
  validateUppercase,
  validatePasswordSpaces,
  validatePasswordSpecialCharacters,
]

/**
 * Utility method that will take a password string
 * and run through each of the provided rules
 * @param password
 * @returns
 */
export const validatePassword = (
  password: string
): PasswordValidationResults => {
  const errors: PasswordErrorType[] = []
  const maxScore: number = rules.length
  for (const validateRule of rules) {
    const { valid, message } = validateRule(password)
    if (!valid) {
      errors.push(message)
    }
  }
  return {
    errors,
    score: (maxScore - errors.length) / maxScore,
  }
}
