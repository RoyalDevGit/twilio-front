import DialogActions from '@mui/material/DialogActions'
import styled from '@emotion/styled'

export const VerticalDialogActions = styled(DialogActions)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${({ theme }) => theme.spacing(4)};

  > button {
    width: 100%;
    margin: ${({ theme }) => theme.spacing(0)} !important;
    margin-bottom: ${({ theme }) => theme.spacing(3)} !important;

    :last-child {
      margin-bottom: ${({ theme }) => theme.spacing(0)} !important;
    }
  }
`
