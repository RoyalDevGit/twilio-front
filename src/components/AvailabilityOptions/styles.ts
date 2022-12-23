import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FormControlLabel from '@mui/material/FormControlLabel'

import { Button } from 'components/Button'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const AvailabilityTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(5)};
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    width: 100%;
  }
`

export const AvailabilityTableRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    grid-template-columns: auto;
  }
`

export const TimeRangeSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(5)};

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1.5)};
    align-items: start;
  }
`

export const TimeRangeOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const CustomAccordion = styled(Accordion)`
  width: 100%;
`

export const ExpandAccordionIcon = styled(ExpandMoreIcon)`
  fill: ${({ theme }) => theme.palette.text.primary};
`

export const DaysContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing(10)};
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    gap: ${({ theme }) => theme.spacing(2)};
    align-items: flex-start;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(2)};
    flex-direction: column;
  }
`

export const SwitchContainerBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`

export const DaysOfTheWeek = styled(Typography)`
  font-size: 1.5rem;
  min-width: 148px;
`

export const AddAnotherTimeContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(2)};
    flex-direction: column;
  }
`

export const AddAnotherTimeButton = styled(Button)`
  font-size: 1rem;
  color: ${({ theme }) =>
    theme.customComponents.availableHoursSelect.addAnotherTimeButton
      .styleOverrides.color};
`

export const ApplyTimesLabel = styled(FormControlLabel)`
  color: ${({ theme }) => theme.palette.text.primary};
  opacity: 0.7;
  padding-left: ${({ theme }) => theme.spacing(0.8)};
`
