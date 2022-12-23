import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'

export const SecurityPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
`

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const InputActionsBox = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    display: flex;
    align-items: center;
  }
`

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    max-width: 190px;
  }
`

export const AccountInputLabel = styled(Typography)`
  font-weight: 500;
  font-size: 0.813rem;
  color: ${({ theme }) =>
    theme.customComponents.consumerAccount.consumerAccountInputLabel
      .styleOverrides.color};
`

export const SmallTextField = styled(TextField)`
  width: 260px;
  && {
    .MuiInputBase-input {
      padding: ${({ theme }) => theme.spacing(1, 1.5)};
      font-size: 0.875rem;
    }
  }

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    max-width: 180px;
    margin-right: 16px;
  }
`

export const EnableDisableSection = styled.div``

export const EnableDisableButton = styled(Button)`
  font-size: 0.813rem;
  width: 84px;
  height: 40px;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 74px;
    height: 36px;
  }
`

export const EditButton = styled(Button)`
  font-size: 0.813rem;
  width: 84px;
  height: 40px;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 74px;
    height: 36px;
  }
`

export const EditButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const TextVerificationNumber = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`
