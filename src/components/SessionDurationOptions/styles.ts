import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import { Button } from 'components/Button'

export const SessionDurationOptionList = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const SessionDurationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const SessionDurationBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2.5)};

  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    gap: ${({ theme }) => theme.spacing(1)};
    align-items: flex-end;
  }
`
export const SessionSettingsInputLabel = styled(Typography)`
  font-size: 0.813rem;
`

export const SmallTextField = styled(TextField)`
  width: 100%;
  && {
    .MuiInputBase-input {
      padding: ${({ theme }) => theme.spacing(1, 0)};
      font-size: 0.875rem;
    }
  }
`

export const DurationSelect = styled(Select)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  width: 265px;
  && {
    .MuiInputBase-input {
      padding: ${({ theme }) => theme.spacing(1, 1.5)};
      font-size: 0.875rem;
    }
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 140px;
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    width: 125px;
  }
`
export const PriceInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 267px;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 120px;
  }
`

export const AddButton = styled(Button)`
  height: 40px;
  color: ${({ theme }) => theme.palette.tertiary.main};
  padding: 0px;
`

export const DeleteButtonSection = styled.div`
  display: flex;
  align-items: flex-end;
`

export const SessionDurationOptionsContainer = styled.div``
