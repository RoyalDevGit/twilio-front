import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(10)};

  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    svg {
      transform: scale(0.8);
    }
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    svg {
      transform: scale(0.7);
    }
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    svg {
      transform: scale(0.6);
    }
  }
`

export const IconSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`

export const NoPermissionText = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 700;

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    text-align: center;
  }
`

export const LinksSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    width: 100%;
    justify-content: center;
  }
`
