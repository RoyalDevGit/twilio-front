import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { css } from '@emotion/react'

import { Button } from 'components/Button'

export const MainSection = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(10)};
  margin-bottom: ${({ theme }) => theme.spacing(10)};
`

export interface PageTitleProps {
  inThankYouState?: boolean
}
export const PageTitle = styled(Typography)<PageTitleProps>`
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  ${({ inThankYouState, theme }) =>
    inThankYouState &&
    css`
      margin-top: ${theme.spacing(10)};
    `}

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    text-align: center;
  }
`

export const PageDescription = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 400;
  margin-bottom: ${({ theme }) => theme.spacing(3.5)};
  max-width: 580px;
  text-align: center;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    text-align: center;
  }
`

export const WatermarkSection = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing(0)};
  bottom: ${({ theme }) => theme.spacing(0)};

  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    transform: scale(0.7);
    margin-bottom: ${({ theme }) => theme.spacing(-9)};
    margin-right: ${({ theme }) => theme.spacing(-8)};
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    transform: scale(0.5);
    margin-bottom: ${({ theme }) => theme.spacing(-15)};
    margin-right: ${({ theme }) => theme.spacing(-12)};
  }
`

export const PaymentMethodsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 637px;
  border: 1px solid rgb(255, 255, 255, 0.4);
  margin: ${({ theme }) => theme.spacing(1, 0, 2, 0)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    border: none;
    margin-top: ${({ theme }) => theme.spacing(-2)};
  }
`

export const TryAnotherPayment = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 400;
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing(2)};
`

export const PaymentMethodSelectorSection = styled.div`
  width: 480px;
  background: #262836;
  border-radius: 10px;
  margin: ${({ theme }) => theme.spacing(0, 5)};
  padding: ${({ theme }) => theme.spacing(2, 4)};
  transform: scale(0.9);

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 100%;
  }
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    width: 85%;
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    width: 75%;
  }
`

export const ContinueButton = styled(Button)`
  width: fit-content;
  margin-bottom: ${({ theme }) => theme.spacing(3.5)};
`

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
`

export const ThankYouStateButtonsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const ThankYouStateButton = styled(Button)`
  min-width: 200px;
`
