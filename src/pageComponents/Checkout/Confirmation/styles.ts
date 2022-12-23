import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { ExpertAvatar } from 'components/ExpertAvatar'
import { Link } from 'components/Link'
import { Button } from 'components/Button'

export const CheckoutConfirmationPageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1112px;
  margin-top: ${({ theme }) => theme.spacing(3)};
  padding-left: ${({ theme }) => theme.spacing(0)};
  padding-right: ${({ theme }) => theme.spacing(0)};

  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    padding-left: ${({ theme }) => theme.spacing(5)};
    padding-right: ${({ theme }) => theme.spacing(5)};
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding-left: ${({ theme }) => theme.spacing(2)};
    padding-right: ${({ theme }) => theme.spacing(2)};
  }
`

export const SessionConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(1.5)};
  background: ${({ theme }) => theme.palette.background.paper};
  padding-top: ${({ theme }) => theme.spacing(6)};
  padding-bottom: ${({ theme }) => theme.spacing(6)};
`

export const SessionConfirmationSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SessionWithLabel = styled(Typography)`
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    font-size: 1.625rem;
    flex-direction: column;
  }

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    font-size: 1.375rem;
  }
`

export const SessionConfirmationDetails = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(2.5)};
  margin-top: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

export const ExpertPhoto = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  img {
    width: 118.45px;
    height: 118.45px;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    justify-content: center;
  }
`
export const SessionInformation = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    justify-content: center;
    align-items: center;
  }
`

export const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 334px;
  gap: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding-left: ${({ theme }) => theme.spacing(0)};
    padding-right: ${({ theme }) => theme.spacing(0)};
  }
`
export const ActionLink = styled(Link)`
  width: 100%;
`

export const ConfirmationButton = styled(Button)``

export const CheckInButton = styled(Button)``

export const SendAMessageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const SendAMessageButton = styled(Button)`
  font-size: 1.063rem;
  white-space: pre;
`

export const ButtonsDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`

export const ExpertLink = styled(Link)`
  display: inline;
`

export const CustomExpertAvatar = styled(ExpertAvatar)`
  .MuiAvatar-root {
    border: 2px solid #5c6e9f;
  }
`
