import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'

import { ResponsiveDialog } from 'components/ResponsiveDialog'
import { Button } from 'components/Button'

export const StyledDialog = styled(ResponsiveDialog)``

export const ModalCloseButton = styled(IconButton)`
  position: absolute;
  z-index: 1;
  top: ${({ theme }) => theme.spacing(1.5)};
  right: ${({ theme }) => theme.spacing(1.25)};
  svg {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`

export const ConfirmReservationButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(8)};
`

export const DialogBody = styled.div`
  padding-top: ${({ theme }) => theme.spacing(8)};
  padding-right: ${({ theme }) => theme.spacing(2)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const EventName = styled.div`
  font-size: 3rem;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    font-size: 2rem;
  }
`
export const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * {
    margin-bottom: ${({ theme }) => theme.spacing(3)};
    :last-child {
      margin-bottom: ${({ theme }) => theme.spacing(0)};
    }
  }
`
export const DateSection = styled.div``
export const TimeSection = styled.div``
