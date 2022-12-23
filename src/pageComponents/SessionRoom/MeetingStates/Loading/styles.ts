import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

export const SessionLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SessionLoadingHeader = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    text-align: center;
  }
`

export const SessionLoadingSubtitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    text-align: center;
  }
`
