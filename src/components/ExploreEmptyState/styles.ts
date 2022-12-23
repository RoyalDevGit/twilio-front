import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing(23)};
`

export const MainHeader = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(3.25)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    text-align: center;
  }
`

export const CheckBack = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 400;
  margin-bottom: ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    text-align: center;
  }
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    max-width: 320px;
  }
`
