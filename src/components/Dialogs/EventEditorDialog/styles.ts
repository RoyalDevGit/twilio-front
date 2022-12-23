import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

export const ModalCloseButton = styled(IconButton)`
  position: absolute;
  z-index: 1;
  top: ${({ theme }) => theme.spacing(0.25)};
  right: ${({ theme }) => theme.spacing(1.25)};
  svg {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`

export const DateTimeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.up('laptop')} {
    flex-direction: row;
  }
`

export const DateTimeBlock = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`
export const DateBox = styled.div`
  input {
    max-width: 72px;
  }
`
export const TimeBox = styled.div``

export const ToLabel = styled.span`
  display: none;
  ${({ theme }) => theme.breakpoints.up('laptop')} {
    display: inlined;
  }
`

export const AllDayAndRecursion = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1.5)};
  margin-right: ${({ theme }) => theme.spacing(0)};
`

export const DateTimeAndTimeZone = styled.div``

export const TimeZone = styled(Typography)``
