import styled from '@emotion/styled'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { CloseButton } from 'components/CloseButton'

export const CancelDialog = styled(Dialog)`
  position: absolute;
  .MuiPaper-root {
    width: 436px;
    padding: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) =>
      theme.customComponents.sessionDetails.dialogs?.dialog?.styleOverrides
        .backgroundColor};
  }
`

export const CancelSessionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const CancelSessionLabel = styled(Typography)`
  font-weight: 500;
`

export const CancelSessionTypography = styled(Typography)``

export const SessionTimeContainer = styled.div`
  display: flex;
  gap: 15px;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
  }
`
export const SessionTimeBox = styled.div`
  display: flex;
  gap: 8px;
`

export const HorizontalDivider = styled(Divider)``

export const CancelSessionDialogBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const CancelSessionDialogFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const CancelSessionButton = styled(Button)``

export const CloseDialogButton = styled(CloseButton)``

export const IconBox = styled.div``

export const CancellationReasonField = styled(TextField)`
  .MuiInputBase-root {
    fieldset.MuiOutlinedInput-notchedOutline {
      border: 1px solid #d5d8df;
      border-radius: 4px;
    }
    border: #4f4f5d solid 0.5px;
    background-color: ${({ theme }) =>
      theme.customComponents.sessionDetails.dialogs?.cancellationField
        ?.styleOverrides.backgroundColor};
  }
  .Mui-focused {
    border: ${({ theme }) => `${theme.palette.primary.main} solid 1px`};
  }
`
