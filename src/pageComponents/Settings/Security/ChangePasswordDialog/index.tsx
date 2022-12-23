import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Breakpoint, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Divider from '@mui/material/Divider'
import { DialogProps } from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { useUpdateEffect } from 'react-use'

import { Button } from 'components/Button'
import {
  ButtonsSection,
  CloseDialogButton,
  Dialog,
  DialogTitleMobile,
  MainContainer,
  MobileTitleContainer,
  NavigateBack,
  StepContentSection,
  TitleSection,
  VerificationErrorSection,
} from 'pageComponents/Settings/Security/ChangePasswordDialog/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { AuthApi, ChangePasswordRequest } from 'apis/AuthApi'
import { ChangePasswordFormStep } from 'pageComponents/Settings/Security/ChangePasswordDialog/Steps/ChangePasswordFormStep'
import { TwoFactorAuthMethod } from 'interfaces/User'
import { ConfirmationCodeStep } from 'pageComponents/Settings/Security/ChangePasswordDialog/Steps/ConfirmationCodeStep'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { PasswordChangedStep } from 'pageComponents/Settings/Security/ChangePasswordDialog/Steps/PasswordChangedStep'
import { FormError } from 'components/Form/Error'
import { BackArrowIcon } from 'icons/Arrow/Back'

interface ChangePasswordDialogProps extends DialogProps {
  method?: TwoFactorAuthMethod
}

type ChangePasswordStepKey =
  | 'passwordForm'
  | 'confirmationCode'
  | 'passwordChanged'

interface ChangePasswordStep {
  key: ChangePasswordStepKey
  component: JSX.Element
  componentWidth: Breakpoint
  previous?: ChangePasswordStepKey
  next?: ChangePasswordStepKey
  onContinue?: () => Promise<boolean>
}

export const MOBILE_CHANGE_PASSWORD_BREAKPOINT = 'tablet'

export const ChangePasswordDialog: FC<ChangePasswordDialogProps> = ({
  open,
  onClose,
  method = null,
  ...props
}) => {
  const { t } = useTranslation(LocaleNamespace.ChangePasswordDialog)
  const theme = useTheme()
  const isMobile = useMediaQuery(
    theme.breakpoints.down(MOBILE_CHANGE_PASSWORD_BREAKPOINT)
  )
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [passwordScore, setPasswordScore] = useState(0)
  const [confirmationCode, setConfirmationCode] = useState('')
  const [currentStep, setCurrentStep] =
    useState<ChangePasswordStepKey>('passwordForm')

  const [updating, setUpdating] = useState(false)
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  )

  const user = useCurrentUserAsserted()
  const hasAuthMethod = method !== null

  const closeHandler = () => {
    if (!onClose) {
      return
    }
    setPassword('')
    setNewPassword('')
    setConfirmedPassword('')
    setPasswordScore(0)
    setConfirmationCode('')
    setCurrentStep('passwordForm')
    setUpdating(false)
    setIsButtonEnabled(false)
    setVerificationError(null)
    onClose({}, 'escapeKeyDown')
  }
  const checkPasswordValues = () => {
    if (!newPassword) {
      return false
    }
    if (!password) {
      return false
    }
    if (!confirmedPassword) {
      return false
    }

    return confirmedPassword === newPassword && passwordScore >= 1
  }

  const resetPreviousStepData = (previous: ChangePasswordStepKey) => {
    if (previous === 'passwordForm') {
      setPassword('')
      setNewPassword('')
      setConfirmedPassword('')
      setPasswordScore(0)
    }
    if (previous === 'confirmationCode') {
      setConfirmationCode('')
    }
  }

  const resendVerificationSms = async () => {
    setConfirmationCode('')
    if (user.mobilePhoneNumber) {
      setVerificationError(null)
      const authCodeRequest = await AuthApi.sendSmsAuthCode(
        user.mobilePhoneNumber
      )
      if (!authCodeRequest.ok()) {
        setIsButtonEnabled(false)
        const error = await authCodeRequest.getError()
        setVerificationError(error.message)
      }
    }
  }

  const steps: ChangePasswordStep[] = [
    {
      key: 'passwordForm',
      component: (
        <ChangePasswordFormStep
          onPasswordFieldChange={(value) => setPassword(value)}
          onNewPasswordFieldChange={(value) => setNewPassword(value)}
          onConfirmedPasswordFieldChange={(value) =>
            setConfirmedPassword(value)
          }
          onChangeScore={(score) => {
            setPasswordScore(score)
          }}
          newPasswordFieldValue={newPassword}
        />
      ),
      componentWidth: 'tablet',
      next: hasAuthMethod ? 'confirmationCode' : 'passwordChanged',
      onContinue: async () => {
        try {
          setUpdating(true)
          if (hasAuthMethod) {
            if (method === TwoFactorAuthMethod.SMS && user.mobilePhoneNumber) {
              setVerificationError(null)
              const sendSMSRequest = await AuthApi.sendSmsAuthCode(
                user.mobilePhoneNumber
              )
              if (!sendSMSRequest.ok()) {
                setIsButtonEnabled(false)
                const error = await sendSMSRequest.getError()
                setVerificationError(error.message)
              }
              return sendSMSRequest.ok()
            }
            return true
          } else {
            return await changePassword()
          }
        } finally {
          setUpdating(false)
        }
      },
    },
    {
      key: 'confirmationCode',
      component: (
        <ConfirmationCodeStep
          method={method}
          value={confirmationCode}
          onChange={(value) => setConfirmationCode(value)}
          isMobile={isMobile}
          onButtonClick={resendVerificationSms}
        />
      ),
      componentWidth: 'tablet',
      next: 'passwordChanged',
      previous: 'passwordForm',
      onContinue: async () => await changePassword(),
    },
    {
      key: 'passwordChanged',
      component: <PasswordChangedStep />,
      componentWidth: 'tablet',
      previous: hasAuthMethod ? 'confirmationCode' : 'passwordForm',
    },
  ]

  const activeStepIndex = steps.findIndex((s) => s.key === currentStep)

  const goForward = async () => {
    setVerificationError(null)
    const { next, onContinue } = steps[activeStepIndex]
    if (onContinue) {
      const shouldContinue = await onContinue()
      if (!shouldContinue) {
        return
      }
    }
    if (next) {
      setCurrentStep(next)
    }
  }

  const goBack = () => {
    setVerificationError(null)
    const { previous } = steps[activeStepIndex]
    if (previous) {
      resetPreviousStepData(previous)
      setCurrentStep(previous)
    }
  }

  const changePassword = async () => {
    setVerificationError(null)
    setUpdating(true)
    const changePasswordRequest: ChangePasswordRequest = {
      oldPassword: password,
      newPassword: newPassword,
    }
    if (hasAuthMethod) {
      changePasswordRequest.otp = confirmationCode
      changePasswordRequest.twoFactorAuthMethod = method
    }
    const changePasswordResponse = await AuthApi.changePassword(
      changePasswordRequest
    )
    setUpdating(false)
    if (!changePasswordResponse.ok()) {
      setIsButtonEnabled(false)
      const error = await changePasswordResponse.getError()
      setVerificationError(error.message)
    }
    return changePasswordResponse.ok()
  }

  const getDialogTitle = () =>
    currentStep === 'confirmationCode' ? 'twoFactorCode' : 'changePassword'

  const { component, componentWidth, next } = steps[activeStepIndex]

  useEffect(() => {
    if (currentStep === 'passwordForm') {
      const isFormValid = checkPasswordValues()
      setIsButtonEnabled(isFormValid)
    }
    if (currentStep === 'confirmationCode') {
      setIsButtonEnabled(confirmationCode.length === 6)
    }
  }, [
    password,
    newPassword,
    confirmedPassword,
    passwordScore,
    confirmationCode,
    currentStep,
    verificationError,
  ])

  useUpdateEffect(() => {
    if (confirmationCode && confirmationCode.length === 6) {
      goForward()
    }
  }, [confirmationCode])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={componentWidth} {...props}>
      <MainContainer>
        <TitleSection>
          {!isMobile && next && (
            <DialogTitle>{t(getDialogTitle())}</DialogTitle>
          )}
          {isMobile && (
            <MobileTitleContainer>
              <NavigateBack
                onClick={goBack}
                style={{ visibility: next ? 'visible' : 'hidden' }}
              >
                <BackArrowIcon />
              </NavigateBack>
              <DialogTitleMobile>{t('changePasswordMobile')}</DialogTitleMobile>
            </MobileTitleContainer>
          )}
          {(!isMobile || (isMobile && !next)) && (
            <CloseDialogButton onClickClose={closeHandler} />
          )}
        </TitleSection>
        {!isMobile && next && <Divider />}
        <StepContentSection>
          {component}
          {!!verificationError && (
            <VerificationErrorSection>
              <FormError data-testid="password-form-error">
                {verificationError}
              </FormError>
            </VerificationErrorSection>
          )}
          {!isMobile && <Divider />}
        </StepContentSection>
        <ButtonsSection>
          {next && (
            <Button
              variant={isMobile ? 'text' : 'outlined'}
              fullWidth={isMobile}
              color={isMobile ? 'tertiary' : 'primary'}
              onClick={closeHandler}
              data-testid="cancel-change-button"
            >
              {t('cancelEnableButton')}
            </Button>
          )}
          {next ? (
            <Button
              state={updating ? 'loading' : 'normal'}
              fullWidth={isMobile}
              variant="contained"
              onClick={goForward}
              color="primary"
              disabled={!isButtonEnabled}
              data-testid="continue-change-button"
            >
              {t('continueButton')}
            </Button>
          ) : (
            <Button
              color="primary"
              fullWidth={isMobile}
              variant="contained"
              onClick={closeHandler}
              data-testid="done-change-button"
            >
              {t('doneButton')}
            </Button>
          )}
        </ButtonsSection>
      </MainContainer>
    </Dialog>
  )
}
