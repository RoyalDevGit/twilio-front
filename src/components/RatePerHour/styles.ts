import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const RatePerHourContainer = styled(Box)`
  display: flex;
  align-items: center;
  font-weight: 700;
  gap: ${({ theme }) => theme.spacing(0.5)};
  color: ${({ theme }) =>
    theme.customComponents.ratePerHour.ratePerHourContainer.styleOverrides
      .color};
`

export const CostLabel = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 700;
`

export const SlashLabel = styled.span`
  margin-left: ${({ theme }) => theme.spacing(0.2)};
`

export const HourLabel = styled.span`
  font-size: 1rem;
  font-weight: 700;
  margin-left: ${({ theme }) => theme.spacing(0.5)};
`
