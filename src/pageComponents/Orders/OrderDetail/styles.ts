import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export const OrderDetailContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(4)};
  padding-left: ${({ theme }) => theme.spacing(4)};
  padding-right: ${({ theme }) => theme.spacing(4)};
`

export const OrderDetailCardSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`

export const DatesSelectionSection = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const DateSelection = styled(DatePicker)``
