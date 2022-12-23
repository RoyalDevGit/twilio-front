import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { MOBILE_CHANGE_PASSWORD_BREAKPOINT } from 'pageComponents/Settings/Security/ChangePasswordDialog'

export const ConfirmationSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 15px 0px;
  ${({ theme }) => theme.breakpoints.down(MOBILE_CHANGE_PASSWORD_BREAKPOINT)} {
    .MuiDialogContent-root {
      width: 100%;
      padding: 20px 12px;
    }
  }
`
export const StepDescription = styled(Typography)`
  padding: 0px 15px;
`
export const StepMobileTitle = styled(Typography)`
  padding: 0px 0px 15px 15px;
`

export const ResendCodeSection = styled.div`
  display: flex;
  align-items: center;
`
