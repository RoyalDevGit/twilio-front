import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  InstructionsSection,
  TwoFAEnabledIconSection,
} from 'pageComponents/Settings/Security/TwoFactorAuthDialog/Steps/SuccessStep/styles'
import { TwoFAEnabledIcon } from 'icons/TwoFAEnabled'

export const SuccessStep = () => {
  const { t } = useTranslation(LocaleNamespace.CodeVerificationDialog)

  return (
    <>
      <TwoFAEnabledIconSection>
        <TwoFAEnabledIcon />
      </TwoFAEnabledIconSection>
      <InstructionsSection>
        <Typography variant="h6">{t('enabledHeader')}</Typography>
        <Typography variant="body1">{t('enabledMessage')}</Typography>
      </InstructionsSection>
    </>
  )
}
