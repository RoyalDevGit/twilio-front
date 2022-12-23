import { FC } from 'react'
import { useElementSize } from 'usehooks-ts'
import Box from '@mui/material/Box'
import { DateTime } from 'luxon'

import {
  ContactAvatar,
  ContactName,
  ContactNameBox,
  ContactContainer,
  Message,
  ContactMessageBox,
  MessageDateBox,
  UnreadMessageDot,
  ContactButtonBase,
  MessageDate,
  ContactContainerBox,
  DateBox,
  ContactMessageDateBox,
} from 'components/Messaging/MessagingChannelSelector/styles'
import { getUserFullName } from 'utils/user/getUserFullName'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { UnreadMessageIcon } from 'icons/UnreadMessageDot'
import { MessagingChannel } from 'interfaces/MessagingChannel'
import { User } from 'interfaces/User'
import { getUserProfilePictureUrl } from 'utils/url/getUserProfilePictureUrl'
import { MinimalCalendar } from 'icons/Calendar/MinimalCalendar'

export interface MessagingChannelSelectorProps {
  channel: MessagingChannel
  onSelect?: ((channel: MessagingChannel) => unknown) | (() => unknown)
  selected: boolean
  displaySessionDate?: boolean
}

export const MessagingChannelSelector: FC<MessagingChannelSelectorProps> = ({
  channel,
  onSelect,
  selected,
  displaySessionDate = false,
}) => {
  const user = useCurrentUserAsserted()

  const [messageRef, { width }] = useElementSize()

  const displayUser = channel.participants.find(
    (p) => (p as User).id !== user.id
  ) as User

  const renderSessionDate = () => {
    if (!channel.session) {
      return null
    }
    const { session } = channel
    const startDate = DateTime.fromISO(session.startDate.date)
    const endDate = session.ended
      ? DateTime.fromISO(session.ended)
      : DateTime.fromISO(session.endDate.date)
    const formattedStartDate = startDate.toLocaleString(DateTime.DATE_MED)
    const formattedStartTime = startDate
      .toLocaleString(DateTime.TIME_SIMPLE)
      .toLowerCase()
    const formattedEndTime = endDate
      .toLocaleString(DateTime.TIME_SIMPLE)
      .toLowerCase()

    return (
      <ContactMessageDateBox>
        <Box flex="1 1 auto" ref={messageRef}>
          <DateBox>
            <MinimalCalendar />
            <div>{`${formattedStartDate} • ${formattedStartTime} - ${formattedEndTime}`}</div>
          </DateBox>
        </Box>
      </ContactMessageDateBox>
    )
  }

  return (
    <ContactContainer>
      <ContactButtonBase
        onClick={() => onSelect?.(channel)}
        selected={selected}
      >
        <ContactContainerBox>
          <ContactAvatar
            src={getUserProfilePictureUrl(displayUser)}
            firstName={displayUser.firstName}
            lastName={displayUser.lastName}
            width={40}
            height={40}
          />
          <ContactNameBox>
            <ContactName>{getUserFullName(displayUser)}</ContactName>
            {displaySessionDate && renderSessionDate()}
            {!!channel.lastMessage && (
              <ContactMessageBox>
                <Box flex="1 1 auto" ref={messageRef}>
                  <Message variant="body2" width={width}>
                    {channel.lastMessage.content}
                  </Message>
                </Box>
                <MessageDateBox>
                  •
                  <MessageDate>
                    {DateTime.fromISO(channel.lastMessage.createdAt).toFormat(
                      'ccc'
                    )}
                  </MessageDate>
                </MessageDateBox>
              </ContactMessageBox>
            )}
          </ContactNameBox>
        </ContactContainerBox>
        {!selected && !!channel.unreadCount && (
          <UnreadMessageDot>
            <UnreadMessageIcon />
          </UnreadMessageDot>
        )}
      </ContactButtonBase>
    </ContactContainer>
  )
}
