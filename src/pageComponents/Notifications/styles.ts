import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'

export const NotificationsContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(2.5)};

  .MuiList-root {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  ${({ theme }) => theme.breakpoints.up('mobileL')} {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1)};
  }
`

export const NotificationsTitle = styled(Typography)`
  font-size: 1.75rem;
  align-self: flex-start;
`

export const StyledList = styled(List)`
  width: 100%;

  div {
    max-width: 100%;
  }
`
