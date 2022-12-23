import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'

export const SessionExpiredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SessionExpiredHeader = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    text-align: center;
  }
`

export const GoBackButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`
