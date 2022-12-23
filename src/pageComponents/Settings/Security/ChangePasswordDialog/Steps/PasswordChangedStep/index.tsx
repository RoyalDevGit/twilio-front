import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { TwoFAEnabledIcon } from 'icons/TwoFAEnabled'
import { TwoFAEnabledIconSection } from 'pageComponents/Settings/Security/TwoFactorAuthDialog/Steps/SuccessStep/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  StepContainer,
  SuccessMessage,
} from 'pageComponents/Settings/Security/ChangePasswordDialog/Steps/PasswordChangedStep/styles'

export const PasswordChangedStep: FC = () => {
  const { t } = useTranslation(LocaleNamespace.ChangePasswordDialog)

  return (
    <StepContainer>
      <TwoFAEnabledIconSection>
        <TwoFAEnabledIcon />
      </TwoFAEnabledIconSection>
      <SuccessMessage data-testid="password-success-message" variant="h6">
        {t('changedPassword')}
      </SuccessMessage>
    </StepContainer>
  )
}
