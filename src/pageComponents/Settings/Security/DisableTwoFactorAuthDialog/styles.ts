import styled from '@emotion/styled'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'

export const DisableMessage = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(2, 3)};
`

export const ActionsSection = styled(DialogActions)`
  padding: ${({ theme }) => theme.spacing(2.5, 2)};
`

export const FormErrorContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(0, 2, 2)};
`

export const UserInstructions1 = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(2, 3, 1, 3)};
`

export const UserInstructions2 = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(0, 3, 2, 3)};
`
