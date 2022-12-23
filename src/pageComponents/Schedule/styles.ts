import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export const ScheduleContainer = styled.div`
  padding-top: ${({ theme }) => theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    background: ${({ theme }) => theme.palette.background.paper};
  }
`

export const TitleContainer = styled(Container)``

export const ScheduleTitle = styled(Typography)`
  font-size: 1.75rem;
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 700;
  }
`

export const MyScheduleTabs = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1.5)};
`

export const ScheduleBody = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    margin-top: ${({ theme }) => theme.spacing(0)};
  }
`

export const TabPanel = styled.div``
