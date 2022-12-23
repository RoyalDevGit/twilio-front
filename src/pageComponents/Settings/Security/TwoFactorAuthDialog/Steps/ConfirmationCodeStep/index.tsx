import Divider from '@mui/material/Divider'
import { useTranslation } from 'next-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { FC } from 'react'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  UserInstructions1,
  UserInstructions2,
} from 'pageComponents/Settings/Security/TwoFactorAuthDialog/Steps/ConfirmationCodeStep/styles'
import { ConfirmationCodeInput } from 'components/ConfirmationCodeInput'
import { TwoFactorAuthMethod } from 'interfaces/User'
import { joinPhoneNumber } from 'utils/string/joinPhoneNumber'
import { PhoneNumber } from 'interfaces/PhoneNumber'

export interface ConfirmationCodeStepProps {
  method?: TwoFactorAuthMethod
  phoneNumber?: PhoneNumber | null
  value: string
  onChange: (code: string) => void
  error?: string
  isLogin?: boolean
}

export const ConfirmationCodeStep: FC<ConfirmationCodeStepProps> = ({
  method,
  phoneNumber,
  value,
  onChange,
}) => {
  const { t } = useTranslation(LocaleNamespace.TwoFactorAuthenticationDialog)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  const phone = phoneNumber ? joinPhoneNumber(phoneNumber) : ''

  const lastFourOfPhone = phone.slice(-4)
  const fullPhone = `** (***) *** - ${lastFourOfPhone}`

  return (
    <>
      <UserInstructions1 variant="h6">{t('enterCodeHeader')}</UserInstructions1>
      <UserInstructions2 variant="body1">
        {method === TwoFactorAuthMethod.SMS
          ? t('enterCodeSmsLabel', {
              phoneNumber: phoneNumber ? fullPhone : '',
            })
          : t('enterCodeAuthenticatorLabel')}
      </UserInstructions2>
      {!isMobile && <Divider />}

      <ConfirmationCodeInput
        placeholder={t('enterCodePlaceholder')}
        value={value}
        onChange={onChange}
      />
    </>
  )
}
