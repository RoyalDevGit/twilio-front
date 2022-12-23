import styled from '@emotion/styled'
import Dialog from '@mui/material/Dialog'

import { Button } from 'components/Button'
import { CloseButton } from 'components/CloseButton'

export const RescheduleDialog = styled(Dialog)`
  .MuiPaper-root {
    width: 436px;
    padding: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) =>
      theme.customComponents.sessionDetails.dialogs?.dialog?.styleOverrides
        .backgroundColor};
    background-image: none;
  }
`
export const CloseDialogButton = styled(CloseButton)``

export const RescheduleSessionDialogFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
`

export const RescheduleSessionButton = styled(Button)`
  width: 90px;
`

export const VerificationErrorSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: ${({ theme }) => theme.spacing(2)};
`
