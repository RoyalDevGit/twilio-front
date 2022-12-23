import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import { FormError } from 'components/Form/Error'

export const TimeRangeOptionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(15)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(2)};
    flex-direction: column;
  }

  .MuiFormControl-root {
    max-width: 104px;
  }
`

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    gap: ${({ theme }) => theme.spacing(3.2)};
  }
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    gap: ${({ theme }) => theme.spacing(1.4)};
  }
`

export const CustomTimePicker = styled(TextField)`
  .MuiInputBase-input {
    padding: 8px;
  }
`

export const SelectToLabel = styled(Typography)``

export const CloseIconButton = styled(IconButton)`
  padding: 0px;
`

export const CustomError = styled(FormError)`
  margin-top: ${({ theme }) => theme.spacing(1)};
`
