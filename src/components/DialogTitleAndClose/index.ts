import styled from '@emotion/styled'
import DialogTitle from '@mui/material/DialogTitle'

export const DialogTitleAndClose = styled(DialogTitle)`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding-right: ${({ theme }) => theme.spacing(1)};
`
