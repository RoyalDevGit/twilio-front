import { FC, ReactNode, useEffect, useState } from 'react'
import { DialogProps } from '@mui/material/Dialog'
import { useTranslation } from 'next-i18next'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Breakpoint, useTheme } from '@mui/material/styles'
import { useUpdateEffect } from 'react-use'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  ActionsSection,
  ContentSection,
  DialogTitleMobile,
  ErrorSection,
  NavigateBack,
  ResendCodeSection,
  TitleSection,
} from 'pageComponents/Settings/Security/TwoFactorAuthDialog/styles'
import { Button } from 'components/Button'
import { ResponsiveDialog } from 'components/ResponsiveDialog'
import { CloseButton } from 'components/CloseButton'
import { BackArrowIcon } from 'icons/Arrow/Back'
import { QRCodeStep } from 'pageComponents/Settings/Security/TwoFactorAuthDialog/Steps/QRCodeStep'
import { ConfirmationCodeStep } from 'pageComponents/Settings/Security/TwoFactorAuthDialog/Steps/ConfirmationCodeStep'
import { SuccessStep } from 'pageComponents/Settings/Security/TwoFactorAuthDialog/Steps/SuccessStep'
import { PhoneNumberStep } from 'pageComponents/Settings/Security/TwoFactorAuthDialog/Steps/PhoneNumberStep'
import { TwoFactorAuthMethod } from 'interfaces/User'
import { UserApi } from 'apis/UserApi'
import { AuthApi } from 'apis/AuthApi'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { FormError } from 'components/Form/Error'
import { useRefreshUserState } from 'hooks/useRefreshUserState'
import { PhoneNumber } from 'interfaces/PhoneNumber'
import { CircularArrowIcon } from 'icons/CircularArrow'

export interface TwoFactorAuthDialogProps extends DialogProps {
  method?: TwoFactorAuthMethod
  onContinue?: () => void
}

type TwoFactorAuthStepKey =
  | 'QRCode'
  | 'textMessaging'
  | 'confirmationCode'
  | 'success'
interface TwoFactorAuthStep {
  key: TwoFactorAuthStepKey
  component: JSX.Element
  componentWidth: Breakpoint
  previous?: TwoFactorAuthStepKey
  next?: TwoFactorAuthStepKey
  onContinue?: () => Promise<boolean>
}

export const TwoFactorAuthDialog: FC<TwoFactorAuthDialogProps> = ({
  open,
  onClose,
  method,
  ...props
}) => {
  const user = useCurrentUserAsserted()
  const refreshUserState = useRefreshUserState()
  const { t } = useTranslation(LocaleNamespace.TwoFactorAuthenticationDialog)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  const initialStepKey: TwoFactorAuthStepKey =
    method === TwoFactorAuthMethod.Authenticator ? 'QRCode' : 'textMessaging'

  const [activeStepKey, setActiveStepKey] =
    useState<TwoFactorAuthStepKey>(initialStepKey)
  const [confirmationCode, setConfirmationCode] = useState('')
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState<
    PhoneNumber | null | undefined
  >(user.mobilePhoneNumber)

  const reset = () => {
    setActiveStepKey(initialStepKey)
    setConfirmationCode('')
    setError(null)
  }

  useEffect(() => {
    if (open) {
      reset()
    }
  }, [open])

  useUpdateEffect(() => {
    if (confirmationCode && confirmationCode.length === 6) {
      goForward()
    }
  }, [confirmationCode])

  const resendVerificationSms = async () => {
    setConfirmationCode('')
    setError(null)
    if (!mobilePhoneNumber) {
      return
    }
    await AuthApi.sendSmsAuthCode(mobilePhoneNumber)
  }

  const steps: TwoFactorAuthStep[] = [
    {
      key: 'QRCode',
      component: <QRCodeStep />,
      componentWidth: 'tablet',
      next: 'confirmationCode',
    },
    {
      key: 'textMessaging',
      component: (
        <PhoneNumberStep
          phoneNumber={mobilePhoneNumber}
          onChange={(phoneNumber) => setMobilePhoneNumber(phoneNumber)}
        />
      ),
      componentWidth: 'tablet',
      next: 'confirmationCode',
      onContinue: async () => {
        if (!mobilePhoneNumber) {
          return false
        }
        await AuthApi.sendSmsAuthCode(mobilePhoneNumber)
        return true
      },
    },
    {
      key: 'confirmationCode',
      component: (
        <ConfirmationCodeStep
          method={method}
          phoneNumber={mobilePhoneNumber}
          value={confirmationCode}
          onChange={(code) => setConfirmationCode(code)}
        />
      ),
      componentWidth: 'tablet',
      next: 'success',
      previous: initialStepKey,
      onContinue: async () => {
        try {
          setError(null)
          setUpdating(true)
          const newMethod = method as TwoFactorAuthMethod
          const userAuthMethods = [
            ...(user.twoFactorAuthSettings?.methods || []),
          ]
          if (!userAuthMethods.includes(newMethod)) {
            userAuthMethods.push(newMethod)
          }
          const result = await UserApi.update(user.id, {
            userData: {
              mobilePhoneNumber: mobilePhoneNumber || undefined,
              twoFactorAuthSettings: {
                methods: userAuthMethods,
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
          return true
        } finally {
          setUpdating(false)
        }
      },
    },
    {
      key: 'success',
      componentWidth: 'mobileL',
      component: <SuccessStep />,
      previous: 'confirmationCode',
    },
  ]

  const activeStep = steps.find(
    (s) => s.key === activeStepKey
  ) as TwoFactorAuthStep

  const goForward = async () => {
    setError(null)
    const { next, onContinue } = activeStep
    if (onContinue) {
      const shouldContinue = await onContinue()
      if (!shouldContinue) {
        return
      }
    }
    if (next) {
      setActiveStepKey(next)
    }
  }

  const goBack = () => {
    setError(null)
    const { previous } = activeStep
    if (previous) {
      setActiveStepKey(previous)
    }
  }

  let activeStepComponent: ReactNode = null
  let componentMaxWidth: Breakpoint | undefined
  if (activeStep) {
    activeStepComponent = activeStep.component
    componentMaxWidth = activeStep.componentWidth
  }

  const closeHandler = () => {
    if (!onClose) {
      return
    }
    onClose({}, 'escapeKeyDown')
  }

  return (
    <ResponsiveDialog
      open={open}
      {...props}
      onClose={onClose}
      maxWidth={componentMaxWidth}
    >
      <TitleSection>
        {!isMobile && <DialogTitle>{t('dialogTitle')}</DialogTitle>}

        {isMobile && (
          <>
            <NavigateBack
              onClick={goBack}
              style={{ visibility: activeStep.next ? 'visible' : 'hidden' }}
            >
              <BackArrowIcon />
            </NavigateBack>
            <DialogTitleMobile>{t('dialogTitleMobile')}</DialogTitleMobile>
          </>
        )}
        <CloseButton onClickClose={closeHandler} />
      </TitleSection>

      {!isMobile && <Divider />}

      <ContentSection>
        {activeStepComponent}
        {!!error && (
          <ErrorSection>
            {activeStep.key === 'confirmationCode' &&
              initialStepKey === 'textMessaging' && (
                <ResendCodeSection>
                  <CircularArrowIcon />
                  <Button variant="text" onClick={resendVerificationSms}>
                    Resend Code
                  </Button>
                </ResendCodeSection>
              )}
            <FormError>{error}</FormError>
          </ErrorSection>
        )}
      </ContentSection>

      {!isMobile && <Divider />}
      <ActionsSection>
        {!isMobile && activeStep.next && (
          <Button variant="outlined" color="primary" onClick={closeHandler}>
            {t('cancelEnableButton')}
          </Button>
        )}
        {activeStep.next ? (
          <Button
            state={updating ? 'loading' : 'normal'}
            fullWidth={isMobile}
            variant="contained"
            onClick={goForward}
            disabled={
              activeStep.key === 'textMessaging' &&
              (!mobilePhoneNumber?.countryCode || !mobilePhoneNumber?.number)
            }
          >
            {t('continueButton')}
          </Button>
        ) : (
          <Button
            fullWidth={isMobile}
            variant="contained"
            onClick={closeHandler}
          >
            {t('doneButton')}
          </Button>
        )}
      </ActionsSection>
    </ResponsiveDialog>
  )
}
