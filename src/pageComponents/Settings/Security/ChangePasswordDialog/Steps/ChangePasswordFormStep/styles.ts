import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { FormLabel } from 'components/Form/Label'
import { PasswordValidator } from 'components/Password/PasswordValidator'
import { PasswordValidatorWrapper } from 'components/Password/styles'

export const ChangePasswordMessageSection = styled(Container)`
  padding: ${({ theme }) => theme.spacing(2)};
`
export const ChangePasswordMessageRequirements = styled.ul`
  margin: 0;
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  margin-left: ${({ theme }) => theme.spacing(-2)};
`
export const ChangePasswordMessageRequirementBullet = styled.li``
export const ChangePasswordMessageRequirementTitle = styled(Typography)`
  font-weight: 600;
`
export const ChangePasswordMessageRequirement = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`
export const FormSection = styled(Container)``
export const ChangePasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 14px 0px;
  ${PasswordValidatorWrapper} {
    width: 383px;
    margin-top: ${({ theme }) => theme.spacing(-1)};
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
`
export const ChangePasswordFormControl = styled.div`
  display: block;
  margin-bottom: 16px;
`
export const ChangePasswordFormLabel = styled(FormLabel)`
  font-size: 13px;
  line-height: 16px;
  font-weight: 500;
  margin: 8px 0px;
  color: ${({ theme }) =>
    theme.customComponents.securityPage.changePasswordDialog.changePasswordLabel
      .styleOverrides.color};
`
export const DialogInput = styled(TextField)`
  width: 383px;
  max-height: 40px;
  .MuiOutlinedInput-root {
    background-color: ${({ theme }) =>
      theme.customComponents.securityPage.changePasswordDialog
        .changePasswordInput.styleOverrides.backgroundColor};
  }
  .MuiOutlinedInput-input {
    padding: 10px 16px 8px;
  }
`

export const ChangePasswordStrengthBar = styled(PasswordValidator)``
