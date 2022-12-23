import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'

export const AvailabilityContainer = styled.div``

export const AvailabilityHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
`

export const AvailabilityTitle = styled(Typography)`
  font-size: 1.75rem;
`

export const AvailabilityTimezone = styled(Typography)`
  font-size: 0.875rem;
`

export const AvailabilityTimezoneContainer = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing(1)};
  }
`

export const UpdateTimezoneButton = styled(Button)`
  font-size: 1rem;
  padding: ${({ theme }) => theme.spacing(0)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    margin-left: ${({ theme }) => theme.spacing(-0.5)};
  }
`

export const BlockoutDatesDescription = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.text.primary};
  opacity: 70%;
`

export const AvailabilitySectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
`

export const SectionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

export const NoticePeriodBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
`
