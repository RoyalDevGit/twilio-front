import styled from '@emotion/styled'
import DialogContent from '@mui/material/DialogContent'

export const CustomDialogContent = styled(DialogContent)`
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    &.MuiDialogContent-root {
      padding: ${({ theme }) => theme.spacing(1.5)};
    }
  }
`
