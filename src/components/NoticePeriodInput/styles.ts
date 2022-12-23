import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { TextField } from 'components/Form/TextField'

export const NoticePeriodContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
  }
`

export const NoticePeriodSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const SelectLabel = styled(Typography)`
  font-size: 0.813rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.tertiary.main};
`

export const DurationTextField = styled(TextField)`
  width: 265px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  && {
    .MuiInputBase-input {
      padding: ${({ theme }) => theme.spacing(1, 1.5)};
      font-size: 0.875rem;
    }
  }
`
