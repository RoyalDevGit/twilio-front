import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'

export const SessionsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const NoSessionsBookedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(6)};
`

export const NoSessionBookedLabelBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3)};
  text-align: center;
`
export const NoSessionsBookedLabel = styled(Typography)``

export const NoSessionsBookedButton = styled(Button)``
