import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { MOBILE_CHANGE_PASSWORD_BREAKPOINT } from 'pageComponents/Settings/Security/ChangePasswordDialog'

export const StepContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 410px;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  ${({ theme }) => theme.breakpoints.down(MOBILE_CHANGE_PASSWORD_BREAKPOINT)} {
    margin-top: ${({ theme }) => theme.spacing(5)};
    margin-bottom: ${({ theme }) => theme.spacing(0)};
    width: 100%;
  }
`

export const SuccessMessage = styled(Typography)`
  ${({ theme }) => theme.breakpoints.down(MOBILE_CHANGE_PASSWORD_BREAKPOINT)} {
    margin: ${({ theme }) => theme.spacing(0, 10)};
    text-align: center;
  }
`
