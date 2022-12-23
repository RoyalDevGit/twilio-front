import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export const ProfilePageContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(3.5)};
  margin-bottom: ${({ theme }) => theme.spacing(3.5)};
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    padding-left: ${({ theme }) => theme.spacing(4.25)};
    padding-right: ${({ theme }) => theme.spacing(4.25)};
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    padding-left: ${({ theme }) => theme.spacing(5.25)};
    padding-right: ${({ theme }) => theme.spacing(5.25)};
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding-left: ${({ theme }) => theme.spacing(3)};
    padding-right: ${({ theme }) => theme.spacing(3)};
  }
`

export const ProfilePageTitle = styled(Typography)`
  font-size: 1.75rem;
`

export const ProfilePageTabs = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3.75)};
`

export const ProfilePageBody = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
`

export const TabPanel = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(3)};
  padding-left: ${({ theme }) => theme.spacing(0)};
  padding-right: ${({ theme }) => theme.spacing(0)};

  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    padding-left: 0px;
    padding-right: 0px;
  }
`
