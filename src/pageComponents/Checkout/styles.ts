import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import { Button } from 'components/Button'
import { ExpertAvatar } from 'components/ExpertAvatar'

export const CheckoutPageContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(1)};
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CheckoutPageBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    align-items: center;
  }
`

export const CheckoutPageTitle = styled(Typography)`
  font-size: 1.75rem;
`

export const CheckoutPageGrid = styled.div`
  display: grid;
  grid-template-columns: [detailsAndPaymentColumn] 496px [sessionConfirmationColumn] 598px [end];
  grid-template-rows: auto;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    justify-content: center;
    grid-template-columns: [detailsAndPaymentColumn] 450px [sessionConfirmationColumn] 500px [end];
  }

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const DetailsAndPaymentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  max-width: 700px;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    max-width: 400px;
  }

  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    max-width: 350px;
  }

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    max-width: 300px;
  }
`

export const SessionConfirmationColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    max-width: 400px;
  }

  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    max-width: 350px;
  }

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    max-width: 300px;
  }
`

export const AvailableSessionsSection = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: 10px;
  background: ${({ theme }) => theme.palette.background.paper};
`

export const MobileCheckoutTitle = styled(Typography)`
  font-weight: 500;
`

export const AvailableSessionTimeSlotPickerSection = styled.div`
  padding-top: 10px;
`

export const MobileCheckoutSubtitle = styled(Typography)`
  opacity: 0.7;
  margin-top: 2.5px;
`

export const SessionConfirmationSection = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: 10px;
  background: ${({ theme }) => theme.palette.background.paper};
  height: 100%;
`

export const SessionConfirmationDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: ${({ theme }) => theme.spacing(4)};
  padding-right: ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding-left: ${({ theme }) => theme.spacing(0)};
    padding-right: ${({ theme }) => theme.spacing(0)};
  }
`

export const ExpertPhoto = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(5)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const SessionWithLabel = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 300;
  text-align: center;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    font-size: 1.625rem;
  }

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    font-size: 1.37rem;
  }
`

export const SessionCostLabel = styled(Typography)`
  font-size: 2.375rem;
  font-weight: 300;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    font-size: 2.25rem;
  }

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    font-size: 1.875rem;
  }
`

interface SessionDateTimeSectionProps {
  darkmode?: string
}

export const SessionDateTimeSection = styled.div<SessionDateTimeSectionProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  height: 56px;
  border: ${({ darkmode }) =>
    darkmode === 'false'
      ? '1px solid rgba(184, 206, 227, 0.7)'
      : '1px solid rgb(184 206 227 / 0.2)'};

  border-radius: 5px;
  margin-top: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
    height: 100%;
    gap: ${({ theme }) => theme.spacing(1)};
    padding: ${({ theme }) => theme.spacing(1)};
  }
`

export const SessionTimeIconBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`
export const VerticalDivider = styled(Divider)`
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`

export const SessionCommentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing(3)};
  width: 100%;
`

export const SessionComment = styled(TextField)`
  margin-top: ${({ theme }) => theme.spacing(1)};
`

export const ConfirmBookingSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(4)};
  width: 100%;
`

export const ConfirmBookingButton = styled(Button)`
  height: 48px;
`

export const CustomExpertAvatar = styled(ExpertAvatar)``
