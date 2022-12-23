import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'

export const RecurrenceFrequency = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: center;
`

export const IntervalTextField = styled(TextField)`
  width: 80px;
`

export const WeekdayOptions = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1.5)};
`

export const WeekdayButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(0.5)};
  justify-content: center;
`

interface WeekdayButtonProps {
  selected: boolean
}

export const WeekdayButton = styled.div<WeekdayButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.625rem;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ selected, theme }) =>
    selected ? theme.palette.primary.main : '#f1f3f4'};
  color: ${({ selected, theme }) =>
    selected ? theme.palette.text.primary : '#80868b'};
  cursor: pointer;
`

export const EndOptions = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1.5)};
`

export const EndOptionsTable = styled.table`
  width: 100%;
`

export const EndValueCell = styled.td`
  .MuiOutlinedInput-root {
    max-width: 190px;
  }
`
