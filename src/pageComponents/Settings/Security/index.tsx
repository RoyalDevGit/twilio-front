import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { SettingsPage, SettingsPageProps } from 'pageComponents/Settings'
import {
  AccountInputLabel,
  EditButton,
  EditButtonContainer,
  EnableDisableButton,
  EnableDisableSection,
  InputActionsBox,
  InputBox,
  InputSection,
  SecurityPageContainer,
  SmallTextField,
  TextVerificationNumber,
} from 'pageComponents/Settings/Security/styles'
import { useEditablePassword } from 'hooks/api/user/useEditablePassword'
import { TwoFactorAuthDialog } from 'pageComponents/Settings/Security/TwoFactorAuthDialog'
import { DisableTwoFactorAuthDialog } from 'pageComponents/Settings/Security/DisableTwoFactorAuthDialog'
import { TwoFactorAuthMethod } from 'interfaces/User'
import { ChangePasswordDialog } from 'pageComponents/Settings/Security/ChangePasswordDialog'
import { joinPhoneNumber } from 'utils/string/joinPhoneNumber'

export const SecurityPage: NextPage<SettingsPageProps> = ({ ...props }) => {
  const { t } = useTranslation([LocaleNamespace.SecurityPage])
  const user = useCurrentUserAsserted()
  const editablePassword = useEditablePassword(user)

  const phoneNumber = user.mobilePhoneNumber
    ? joinPhoneNumber(user.mobilePhoneNumber)
    : ''

  const lastFourOfPhone = phoneNumber.slice(-4)
  const fullPhone = `** (***) *** - ${lastFourOfPhone}`

  const [authenticatorDialogMethodIsOpen, setAuthenticatorDialogMethodIsOpen] =
    useState(false)

  const [
    disableAuthenticationDialogIsOpen,
    setDisableAuthenticationDialogIsOpen,
  ] = useState(false)

  const [changePasswordDialogIsOpen, setChangePasswordDialogIsOpen] =
    useState(false)

  const [authenticatorDialogMethod, setAuthenticatorDialogMethod] = useState<
    TwoFactorAuthMethod | undefined
  >()

  const [authenticatorMethod, setAuthenticatorMethod] = useState<
    TwoFactorAuthMethod | undefined
  >()

  const openTwoFactorAuthDialog = (method: TwoFactorAuthMethod) => {
    setAuthenticatorDialogMethod(method)
    setAuthenticatorDialogMethodIsOpen(true)
  }

  const closeTwoFactorAuthDialog = () => {
    setAuthenticatorDialogMethodIsOpen(false)
  }

  const openDisableTwoFactorDialog = (method: TwoFactorAuthMethod) => {
    setDisableAuthenticationDialogIsOpen(true)
    setAuthenticatorMethod(method)
  }

  const closeDisableAuthenticationDialog = () => {
    setDisableAuthenticationDialogIsOpen(false)
    setAuthenticatorMethod(undefined)
  }

  const openChangePasswordDialog = () => {
    if (authenticatorMethodIsEnabled || textMessagingMethodIsEnabled) {
      const method = authenticatorMethodIsEnabled
        ? TwoFactorAuthMethod.Authenticator
        : TwoFactorAuthMethod.SMS
      setAuthenticatorMethod(method)
    }
    setChangePasswordDialogIsOpen(true)
  }

  const closeChangePasswordDialog = () => {
    setChangePasswordDialogIsOpen(false)
  }
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  const authenticatorMethodIsEnabled =
    !!user.twoFactorAuthSettings?.methods?.includes(
      TwoFactorAuthMethod.Authenticator
    )

  const textMessagingMethodIsEnabled =
    !!user.twoFactorAuthSettings?.methods?.includes(TwoFactorAuthMethod.SMS)

  const handleEnableAuthenticatorClick = () => {
    if (authenticatorMethodIsEnabled) {
      return
    }
    openTwoFactorAuthDialog(TwoFactorAuthMethod.Authenticator)
  }

  const handleDisableAuthenticatorClick = () => {
    if (!authenticatorMethodIsEnabled) {
      return
    }
    openDisableTwoFactorDialog(TwoFactorAuthMethod.Authenticator)
  }

  const handleEnableSmsClick = () => {
    if (textMessagingMethodIsEnabled) {
      return
    }
    openTwoFactorAuthDialog(TwoFactorAuthMethod.SMS)
  }

  const handleDisableSmsClick = () => {
    if (!textMessagingMethodIsEnabled) {
      return
    }
    openDisableTwoFactorDialog(TwoFactorAuthMethod.SMS)
  }

  return (
    <SettingsPage {...props}>
      <SecurityPageContainer>
        {!isMobile && <Typography variant="h6">{t('pageTitle')}</Typography>}
        <InputSection>
          <InputActionsBox>
            <InputBox>
              <AccountInputLabel>{t('passwordLabel')}</AccountInputLabel>
              {!editablePassword.editing && (
                <Typography>{t('hiddenPasswordLabel')}</Typography>
              )}
              {editablePassword.editing && (
                <SmallTextField
                  variant="outlined"
                  autoComplete="off"
                  {...editablePassword.input}
                />
              )}
            </InputBox>
            <EditButtonContainer>
              <EditButton
                data-testid="edit-password-button"
                variant="outlined"
                color="primary"
                onClick={() => openChangePasswordDialog()}
              >
                {t('passwordButtonLabel')}
              </EditButton>
            </EditButtonContainer>
          </InputActionsBox>
          <Divider />
        </InputSection>
        <InputSection>
          <InputActionsBox>
            <InputBox>
              <AccountInputLabel>
                {t('authenticatorAppLabel')}
              </AccountInputLabel>
              <Typography>{t('authenticatorAppInstructions')}</Typography>
            </InputBox>
            {!isMobile && (
              <RadioGroup>
                <FormControlLabel
                  checked={authenticatorMethodIsEnabled}
                  control={<Radio id="enable-app-radio" />}
                  label={t<string>('enableAuthenticator')}
                  onClick={handleEnableAuthenticatorClick}
                />
                <FormControlLabel
                  checked={!authenticatorMethodIsEnabled}
                  control={<Radio id="disable-app-radio" />}
                  label={t<string>('disableAuthenticator')}
                  onClick={handleDisableAuthenticatorClick}
                />
              </RadioGroup>
            )}
            {isMobile && (
              <EnableDisableSection>
                {!authenticatorMethodIsEnabled && (
                  <EnableDisableButton
                    variant="outlined"
                    color="primary"
                    onClick={handleEnableAuthenticatorClick}
                    data-testid="enable-app-button"
                  >
                    {t('enableAuthenticator')}
                  </EnableDisableButton>
                )}

                {authenticatorMethodIsEnabled && (
                  <EnableDisableButton
                    variant="outlined"
                    color="primary"
                    onClick={handleDisableAuthenticatorClick}
                    data-testid="disable-app-button"
                  >
                    {t('disableAuthenticator')}
                  </EnableDisableButton>
                )}
              </EnableDisableSection>
            )}
          </InputActionsBox>
          <Divider />
        </InputSection>

        <InputSection>
          <InputActionsBox>
            <InputBox>
              <AccountInputLabel>
                {t('textVerificationLabel')}
              </AccountInputLabel>
              <Typography>{t('textVerificationInstructions')}</Typography>
              {textMessagingMethodIsEnabled && (
                <TextVerificationNumber>
                  <Typography>{t('phoneNumberEnabled')}</Typography>
                  <Typography>
                    {user.mobilePhoneNumber ? fullPhone : null}
                  </Typography>
                </TextVerificationNumber>
              )}
            </InputBox>

            {!isMobile && (
              <RadioGroup>
                <FormControlLabel
                  checked={textMessagingMethodIsEnabled}
                  control={<Radio id="enable-sms-radio" />}
                  label={t<string>('enableTextVerification')}
                  onClick={handleEnableSmsClick}
                />
                <FormControlLabel
                  checked={!textMessagingMethodIsEnabled}
                  control={<Radio id="disable-sms-radio" />}
                  label={t<string>('disableTextVerification')}
                  onClick={handleDisableSmsClick}
                />
              </RadioGroup>
            )}

            {isMobile && (
              <EnableDisableSection>
                {!textMessagingMethodIsEnabled && (
                  <EnableDisableButton
                    variant="outlined"
                    color="primary"
                    onClick={handleEnableSmsClick}
                    data-testid="enable-sms-button"
                  >
                    {t('enableTextVerification')}
                  </EnableDisableButton>
                )}

                {textMessagingMethodIsEnabled && (
                  <EnableDisableButton
                    variant="outlined"
                    color="primary"
                    onClick={handleDisableSmsClick}
                    data-testid="disable-sms-button"
                  >
                    {t('disableTextVerification')}
                  </EnableDisableButton>
                )}
              </EnableDisableSection>
            )}
          </InputActionsBox>
          <Divider />
        </InputSection>
      </SecurityPageContainer>

      <TwoFactorAuthDialog
        open={authenticatorDialogMethodIsOpen}
        method={authenticatorDialogMethod}
        onClose={closeTwoFactorAuthDialog}
      />

      <DisableTwoFactorAuthDialog
        open={disableAuthenticationDialogIsOpen}
        method={authenticatorMethod}
        onClose={closeDisableAuthenticationDialog}
      />

      <ChangePasswordDialog
        method={authenticatorMethod}
        open={changePasswordDialogIsOpen}
        onClose={closeChangePasswordDialog}
      />
    </SettingsPage>
  )
}
