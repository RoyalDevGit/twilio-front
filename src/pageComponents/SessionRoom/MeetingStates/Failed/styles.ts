import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

export const SessionFailedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SessionFailedHeader = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    text-align: center;
  }
`

export const SessionFailedSubtitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    text-align: center;
  }
`
