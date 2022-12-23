import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'

import { Button } from 'components/Button'

export const BlockoutDatesContainer = styled.div``

export const AddBlockoutDatesButton = styled(Button)`
  width: 217px;
  height: 48px;
`

export const BlockoutDatesDialog = styled(Dialog)``

export const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 24px;
`

export const DialogCloseIcon = styled(IconButton)`
  position: absolute;
  top: 24px;
  right: 24px;
`

export const DialogContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3.5)};
`

export const DialogTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const CustomDialogTitle = styled(Typography)`
  font-size: 1.5rem;
  padding-left: ${({ theme }) => theme.spacing(0)};
`
export const StaticCalendarContainer = styled(StaticDatePicker)`
  margin-top: -30px;
`

export const StaticCalendar = styled(TextField)``

export const DialogDescription = styled(Typography)`
  font-size: 0.875rem;
`

export const DialogButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
  margin-top: -30px;
`

export const DialogButton = styled(Button)`
  width: 270px;
  height: 40px;
`

export const BlockoutDateList = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1.5)};
`

export const BlockoutDateItem = styled.div`
  display: flex;
  align-items: center;
`

export const BlockoutDateLabel = styled.div`
  min-width: 184px;
`

export const DeleteIconButton = styled(IconButton)``
