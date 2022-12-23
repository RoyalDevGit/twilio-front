import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

import {
  PasswordValidationResultsText,
  PasswordValidatorStrengthBarContainer,
  PasswordValidatorWrapper,
  PasswordValidatorStrengthBarInner,
} from 'components/Password/styles'
import { PasswordErrorType } from 'interfaces/Password'
import {
  validatePassword,
  PasswordValidationResults,
} from 'utils/password/passwordRulesEngine'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

interface ThresholdSetting {
  min: number
  max: number
  color: string
}
const DEFAULT_COLOR = '#ddd'
const thresholdSettings: ThresholdSetting[] = [
  {
    min: 0,
    max: 49,
    color: '#F04936',
  },
  {
    min: 50,
    max: 74,
    color: '#F7B44E',
  },
  {
    min: 75,
    max: 99,
    color: '#2B90EF',
  },
  {
    min: 100,
    max: 101,
    color: '#25C281',
  },
]

interface PasswordValidatorProps {
  password: string
  onChangeScore: (score: number, feedback: PasswordErrorType[]) => void
}

/**
 * Simple utility component that provides visual feedback to the end-user
 * in regards to their password strength
 * @param param0
 * @returns
 */
export const PasswordValidator: FC<PasswordValidatorProps> = ({
  password,
  onChangeScore,
}) => {
  const [validationResults, setValidationResults] =
    useState<PasswordValidationResults>({ score: 0, errors: [] })
  const { t } = useTranslation([LocaleNamespace.Password])

  useEffect(() => {
    const results = validatePassword(password)
    onChangeScore(results.score, results.errors)
    setValidationResults(results)
  }, [password])

  /**
   * Provide color hints for the user
   * @param score
   * @returns
   */
  const getFeedbackColor = (score: number) => {
    const threshold = thresholdSettings.find((setting) => {
      if (score >= setting.min && score < setting.max) {
        return true
      }
      return false
    })
    if (threshold) {
      return threshold.color
    }
    return DEFAULT_COLOR
  }

  /**
   * Provide translated text back to the end-user
   * @param errors
   * @returns
   */
  const getFeedbackText = (errors: PasswordErrorType[]) => {
    if (errors.length) {
      const feedbackArray: string[] = errors.map((e: PasswordErrorType) => t(e))
      return `${t('validatePasswordBaseline')} ${feedbackArray.join(', ')}`
    }
    return ''
  }

  const normalizedScore = validationResults.score * 100
  const passwordFeedback = getFeedbackText(validationResults.errors)

  return (
    <PasswordValidatorWrapper data-testid="password-validator">
      {password && (
        <>
          <PasswordValidatorStrengthBarContainer>
            <PasswordValidatorStrengthBarInner
              style={{
                width: `${normalizedScore}%`,
                background: getFeedbackColor(normalizedScore),
              }}
            />
          </PasswordValidatorStrengthBarContainer>
          {passwordFeedback && (
            <PasswordValidationResultsText data-testid="password-validator-text">
              {passwordFeedback}
            </PasswordValidationResultsText>
          )}
        </>
      )}
    </PasswordValidatorWrapper>
  )
}
