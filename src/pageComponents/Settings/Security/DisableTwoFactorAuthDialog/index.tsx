import Divider from '@mui/material/Divider'
import { useTranslation } from 'next-i18next'
import DialogTitle from '@mui/material/DialogTitle'
import { DialogProps } from '@mui/material/Dialog'
import { FC, useEffect, useState } from 'react'
import { useUpdateEffect } from 'react-use'

import { ConfirmationCodeInput } from 'components/ConfirmationCodeInput'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  ActionsSection,
  DisableMessage,
  FormErrorContainer,
  UserInstructions1,
  UserInstructions2,
} from 'pageComponents/Settings/Security/DisableTwoFactorAuthDialog/styles'
import { Button } from 'components/Button'
import { ResponsiveDialog } from 'components/ResponsiveDialog'
import { TwoFactorAuthMethod } from 'interfaces/User'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { useRefreshUserState } from 'hooks/useRefreshUserState'
import { UserApi } from 'apis/UserApi'
import { FormError } from 'components/Form/Error'
import { joinPhoneNumber } from 'utils/string/joinPhoneNumber'
import { AuthApi } from 'apis/AuthApi'

export interface DisableTwoFactorAuthDialogProps extends DialogProps {
  method?: TwoFactorAuthMethod
  onClose?: () => void
}

export const DisableTwoFactorAuthDialog: FC<
  DisableTwoFactorAuthDialogProps
> = ({ open, onClose, method, ...props }) => {
  const { t } = useTranslation(LocaleNamespace.TwoFactorAuthenticationDialog)
  const user = useCurrentUserAsserted()
  const refreshUserState = useRefreshUserState()
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState('')

  const phoneNumber = user.mobilePhoneNumber
    ? joinPhoneNumber(user.mobilePhoneNumber)
    : ''

  const lastFourOfPhone = phoneNumber.slice(-4)
  const fullPhone = `** (***) *** - ${lastFourOfPhone}`

  const reset = () => {
    setConfirmationCode('')
    setError(null)
  }

  useEffect(() => {
    if (open) {
      reset()
    }
  }, [open])

  useEffect(() => {
    const sendSMS = async () => {
      if (
        open &&
        method === TwoFactorAuthMethod.SMS &&
        user.mobilePhoneNumber
      ) {
        await AuthApi.sendSmsAuthCode(user.mobilePhoneNumber)
      }
    }
    sendSMS()
  }, [open, method])

  useUpdateEffect(() => {
    if (confirmationCode && confirmationCode.length === 6) {
      disable2FAMethod()
    }
  }, [confirmationCode])

  const closeHandler = () => {
    if (!onClose) {
      return
    }
    onClose()
  }

  const disable2FAMethod = async () => {
    try {
      setError(null)
      setUpdating(true)
      const result = await UserApi.update(user.id, {
        userData: {
          twoFactorAuthSettings: {
            methods:
              user.twoFactorAuthSettings?.methods?.filter(
                (m) => m !== method
              ) || [],
          },
        },
        otp: confirmationCode,
      })
      if (!result.ok()) {
        const error = await result.getError()
        setError(error.message)
        return false
      }
      await refreshUserState()
      closeHandler()
    } finally {
      setUpdating(false)
    }
  }

  return (
    <ResponsiveDialog
      open={open}
      {...props}
      onClose={onClose}
      maxWidth="tablet"
    >
      <>
        <DialogTitle>{t('disableTitle')}</DialogTitle>
        <Divider />
        <DisableMessage variant="body1">{t('disableMessage')}</DisableMessage>
        <UserInstructions1 variant="h6">
          {t('enterCodeHeader')}
        </UserInstructions1>
        <UserInstructions2 variant="body1">
          {method === TwoFactorAuthMethod.SMS
            ? t('enterCodeSmsLabel', {
                phoneNumber: user.mobilePhoneNumber ? fullPhone : '',
              })
            : t('enterCodeAuthenticatorLabel')}
        </UserInstructions2>
        <ConfirmationCodeInput
          placeholder={t('enterCodePlaceholder')}
          value={confirmationCode}
          onChange={(code) => setConfirmationCode(code)}
        />
        {!!error && (
          <FormErrorContainer>
            <FormError>{error}</FormError>
          </FormErrorContainer>
        )}
        <Divider />
        <ActionsSection>
          <Button variant="outlined" color="primary" onClick={closeHandler}>
            {t('cancelDisableButton')}
          </Button>
          <Button
            variant="contained"
            state={updating ? 'loading' : 'normal'}
            onClick={disable2FAMethod}
          >
            {t('disableButton')}
          </Button>
        </ActionsSection>
      </>
    </ResponsiveDialog>
  )
}
