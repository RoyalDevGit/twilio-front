import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'

export const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SessionHeader = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    text-align: center;
  }
`

export const SessionSubtitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    text-align: center;
  }
`

export const CloseButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`
