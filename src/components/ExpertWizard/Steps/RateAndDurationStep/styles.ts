import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

export const RateAndDurationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
  margin-top: ${({ theme }) => theme.spacing(3)};
`

export const RateAndDurationFormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.25)};
  width: 100%;
`

export const RateAndDurationLabel = styled(Typography)`
  font-size: 1.25rem;
`

export const RateAndDurationSubtitle = styled(Typography)`
  opacity: 0.7;
`

export const HourlyRateInputLabel = styled(Typography)`
  font-size: 0.813rem;
`
