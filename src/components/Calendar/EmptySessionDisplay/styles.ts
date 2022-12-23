import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { Image } from 'components/Image'
import { MOBILE_CALENDAR_BREAKPOINT } from 'components/Calendar/styles'

export const DisplayContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(12)};
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    margin-left: 0;
    margin-top: ${({ theme }) => theme.spacing(2)};
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    background: ${({ theme }) => theme.palette.background.default};
  }
`

export const ContainerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px 0 0;

  ${({ theme }) => theme.breakpoints.down(MOBILE_CALENDAR_BREAKPOINT)} {
    margin: ${({ theme }) => theme.spacing(2)};
    padding: 0;
  }
`

export const EmptyMessage = styled(Typography)`
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme }) =>
    theme.customComponents.calendar.emptySessionDisplay.styleOverrides.color};
  opacity: ${({ theme }) =>
    theme.customComponents.calendar.emptySessionDisplay.styleOverrides.opacity};
  margin-top: ${({ theme }) => theme.spacing(2)};
  text-align: center;

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    font-size: 20px;
    color: ${({ theme }) => theme.palette.text.primary};
    opacity: 1;
  }
`

export const CalendarImage = styled(Image)``

export const BrowseButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  min-width: 171px;
  min-height: 40px;
  border-radius: 3px;
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    width: 100%;
  }
`
