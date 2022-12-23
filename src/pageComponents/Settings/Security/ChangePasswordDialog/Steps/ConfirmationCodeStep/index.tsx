import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { ConfirmationCodeInput } from 'components/ConfirmationCodeInput'
import { TwoFactorAuthMethod } from 'interfaces/User'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { CircularArrowIcon } from 'icons/CircularArrow'
import { Button } from 'components/Button'
import {
  ConfirmationSection,
  ResendCodeSection,
  StepDescription,
  StepMobileTitle,
} from 'pageComponents/Settings/Security/ChangePasswordDialog/Steps/ConfirmationCodeStep/styles'

interface ConfirmationCodeStepProps {
  method: TwoFactorAuthMethod | null
  value: string
  onChange: (code: string) => unknown
  onButtonClick: () => unknown
  isMobile: boolean
}

export const ConfirmationCodeStep: FC<ConfirmationCodeStepProps> = ({
  method,
  value,
  onChange,
  onButtonClick,
  isMobile,
}) => {
  const { t } = useTranslation(LocaleNamespace.ChangePasswordDialog)
  const stepDescriptionKey =
    method === TwoFactorAuthMethod.Authenticator
      ? 'confirmationStepDescriptionAuth'
      : 'confirmationStepDescriptionSMS'
  return (
    <>
      <ConfirmationSection>
        {isMobile && (
          <StepMobileTitle variant="h4">{t('twoFactorCode')}</StepMobileTitle>
        )}
        <StepDescription>{t(stepDescriptionKey)}</StepDescription>
        <ConfirmationCodeInput value={value} onChange={onChange} />
        {method === TwoFactorAuthMethod.SMS && (
          <ResendCodeSection>
            <CircularArrowIcon />
            <Button variant="text" onClick={onButtonClick}>
              {t('resendCode')}
            </Button>
          </ResendCodeSection>
        )}
      </ConfirmationSection>
    </>
  )
}
