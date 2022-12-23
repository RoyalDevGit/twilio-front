import { css } from '@emotion/react'
import styled from '@emotion/styled'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'

import { UserAvatar } from 'components/UserAvatar'

export const ContactContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding-top: ${({ theme }) => theme.spacing(0.5)};
    padding-left: ${({ theme }) => theme.spacing(1)};
    padding-right: ${({ theme }) => theme.spacing(1)};
  }
`

interface ContactButtonBaseProps {
  selected: boolean
}

export const ContactButtonBase = styled(ButtonBase)<ContactButtonBaseProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(2)};
  padding-left: ${({ theme }) => theme.spacing(2)};
  padding-right: ${({ theme }) => theme.spacing(2)};
  padding-top: ${({ theme }) => theme.spacing(1.5)};
  padding-bottom: ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.spacing(0.625)};
  ${({ selected, theme }) => {
    if (selected) {
      return css`
        background-color: ${theme.customComponents.chatComponent
          .messagingChannelSelectedState.styleOverrides.backgroundColor};
      `
    }
  }}
`

export const ContactContainerBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const ContactAvatar = styled(UserAvatar)``

export const ContactNameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 1 auto;
`

export const ContactName = styled(Typography)`
  font-weight: 600;
  font-size: 1.063rem;
`

export const DateBox = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: 14px;
`

export const ContactMessageBox = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  width: 100%;
`

export const ContactMessageDateBox = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  width: 100%;
  padding-bottom: 2px;
`

interface MessageProps {
  width: number
}

export const Message = styled(Typography)<MessageProps>`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: ${({ width }) => width}px;
  text-align: left;
`

export const MessageDateBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
`

export const MessageDate = styled.span`
  font-size: 0.875rem;
  white-space: pre;
  color: ${({ theme }) =>
    theme.customComponents.messagesPage.messagesDateColor.styleOverrides.color};
`

export const UnreadMessageDot = styled.div``
