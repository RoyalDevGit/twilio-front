import { css } from '@emotion/react'
import styled from '@emotion/styled'
import ButtonBase from '@mui/material/ButtonBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { PaymentMethodSelector } from 'components/PaymentMethodSelector'
import { CardsListContainer } from 'components/PaymentMethodSelector/styles'
import { SnackBody } from 'pageComponents/SessionRoom/ExtensionPrompts/styles'

export const MainSection = styled(SnackBody)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  background-color: #25273b;
`

export const HeaderSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
  padding: ${({ theme }) => theme.spacing(0, 0, 2, 0)};
`

export const SelectDurationSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

export const IconSection = styled.div``

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  padding-left: ${({ theme }) => theme.spacing(1.5)};
  padding-right: ${({ theme }) => theme.spacing(1.5)};
`

export const ScrollIcon = styled.div`
  display: flex;
  justify-content: center;
`

export const ScrollIconButton = styled(IconButton)``

export const AvailableDurationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  padding-top: ${({ theme }) => theme.spacing(1)};
`
export const StyledDivider = styled(Divider)``

interface AvailableDurationProps {
  selected: boolean
}

export const AvailableDuration = styled(ButtonBase)<AvailableDurationProps>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 3px;
  padding-top: ${({ theme }) => theme.spacing(1)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  ${({ selected }) => {
    if (!selected) {
      return
    }

    return css`
      background-color: #ffffff;
      color: #1a1a1a;

      ${StyledDivider} {
        background-color: rgba(26, 26, 26, 0.3);
      }
    `
  }}
`

export const DurationTime = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: center;
`

export const DurationTimeValue = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 600;
`

export const DurationPrice = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 500;
`

export const SessionTimeAndPriceContainer = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing(1)};
`

export const TimeAndPriceSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SessionTimePriceLabel = styled(Typography)`
  font-size: 0.813rem;
  font-weight: 500;
  color: #fdffff;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

export const TimeAndPriceLabel = styled(Typography)`
  font-size: 1rem;
  font-weight: 600;
`

export const TimeAndPriceDivider = styled(Divider)`
  margin-left: ${({ theme }) => theme.spacing(3)};
  margin-right: ${({ theme }) => theme.spacing(3)};
`

export const PayWithCardLabel = styled(Typography)`
  font-size: 0.813rem;
  font-weight: 500;
  align-self: center;
  margin-bottom: ${({ theme }) => theme.spacing(-1)};
`

export const StyledPaymentMethodSelector = styled(PaymentMethodSelector)`
  &${CardsListContainer} {
    max-height: 500px;
    overflow: auto;
  }
`

export const BackToCheckoutButton = styled(Button)`
  align-self: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing(-2)};
`

export const ErrorSection = styled.div`
  text-align: center;
`
