import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { DateTime } from 'luxon'

import { AppShell } from 'components/AppShell'
import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import { Expert } from 'interfaces/Expert'
import {
  MessagesPageChatContainer,
  MessagesPageContainer,
  MessagesPageTitle,
  MessagesLeftTray,
  MessagesRightTray,
  MessagesMobilePageContainer,
  MessagesMobilePageTitle,
  MessagesMobileTopSection,
  NoMessagesPageContainer,
  NoMessagesPageLabel,
  MessagesRightTrayHeader,
  SelectedContactAvatar,
  SelectedContactNameBox,
  SelectedContactName,
  ChatExpiring,
  ChatExpiringLabel,
  ChatExpiringBox,
  MessagesRightTrayHeaderBox,
  SelectedChannelDate,
} from 'pageComponents/Messages/styles'
import { MessagingChannelSelector } from 'components/Messaging/MessagingChannelSelector'
import { SearchAutocomplete } from 'components/Header/SearchAutocomplete'
import { MessageBubbleIcon } from 'icons/MessageBubble'
import { MobileChatModal } from 'components/Messaging/MobileChatModal'
import { useMessagingChannels } from 'hooks/useMessagingChannels'
import { getUserProfilePictureUrl } from 'utils/url/getUserProfilePictureUrl'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { User } from 'interfaces/User'
import { Chat } from 'components/Messaging/Chat'
import { MessagingChannel } from 'interfaces/MessagingChannel'
import { usePreventChatPopup } from 'hooks/usePreventChatPopup'
import { CalendarDottedIcon } from 'icons/Calendar/DottedCalendar'

export interface MessagesPageProps {
  initialFeaturedExperts: Expert[]
  initialAllExperts: Expert[]
  initialRecommendedExperts: Expert[]
}

export const MessagesPage: NextPage<MessagesPageProps> = () => {
  const { t } = useTranslation(LocaleNamespace.MessagesPage)
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const { channels } = useMessagingChannels()
  const user = useCurrentUserAsserted()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  const [autoSelectedChannel, setAutoSelectedChannel] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState<
    MessagingChannel | undefined
  >()
  const [mobileChatIsOpen, setMobileChatIsOpen] = useState(false)
  const { preventChatPopup, allowChatPopup } = usePreventChatPopup()

  useEffect(() => {
    if (isMobile || autoSelectedChannel) {
      return
    }
    if (channels.length && !selectedChannel) {
      setSelectedChannel(channels[0])
      setAutoSelectedChannel(true)
    }
  }, [channels, selectedChannel, isMobile, autoSelectedChannel])

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
  }

  useEffect(() => {
    if (!selectedChannel) {
      return
    }
    preventChatPopup(selectedChannel)

    return () => {
      allowChatPopup(selectedChannel)
    }
  }, [selectedChannel])

  const noMessagesScreen = (
    <NoMessagesPageContainer>
      <MessageBubbleIcon />
      <NoMessagesPageLabel>{t('noMessagesLabel')}</NoMessagesPageLabel>
    </NoMessagesPageContainer>
  )

  const displayUser = selectedChannel?.participants.find(
    (p) => (p as User).id !== user.id
  ) as User | undefined

  const renderSelectedChannelDate = () => {
    if (!selectedChannel?.session?.messagingChannel) {
      return null
    }
    const { session } = selectedChannel

    const startDate = DateTime.fromISO(session.startDate.date)
    const endDate = session.ended
      ? DateTime.fromISO(session.ended)
      : DateTime.fromISO(session.endDate.date)
    const formattedStartDate = startDate.toFormat('cccc, DD')
    const formattedStartTime = startDate
      .toLocaleString(DateTime.TIME_SIMPLE)
      .toLowerCase()
    const formattedEndTime = endDate
      .toLocaleString(DateTime.TIME_SIMPLE)
      .toLowerCase()

    return (
      <SelectedChannelDate>{`${formattedStartDate} ${t(
        'atLabel'
      )} ${formattedStartTime} - ${formattedEndTime}`}</SelectedChannelDate>
    )
  }

  return (
    <AppShell
      drawer={
        <ConsumerDrawer
          open={drawerIsOpen}
          onClose={handleDrawerMenuClose}
          onToggleClick={handleDrawerMenuClick}
        />
      }
      mobileNavigation={
        <ConsumerMobileNavigation onDrawerMenuClick={handleDrawerMenuClick} />
      }
      onDrawerMenuClick={handleDrawerMenuClick}
      showHeader={!isMobile}
    >
      <MessagesPageContainer>
        {!isMobile && (
          <>
            <MessagesPageTitle>{t('messagesPageTitle')}</MessagesPageTitle>
            {!channels.length ? (
              noMessagesScreen
            ) : (
              <MessagesPageChatContainer>
                <MessagesLeftTray>
                  {channels.map((channel) => (
                    <MessagingChannelSelector
                      displaySessionDate
                      key={channel.id}
                      channel={channel}
                      selected={channel.id === selectedChannel?.id}
                      onSelect={() => {
                        setSelectedChannel(channel)
                      }}
                    />
                  ))}
                </MessagesLeftTray>
                <MessagesRightTray>
                  {!!selectedChannel && (
                    <>
                      <MessagesRightTrayHeader>
                        <MessagesRightTrayHeaderBox>
                          <div>
                            <SelectedContactAvatar
                              src={
                                displayUser
                                  ? getUserProfilePictureUrl(displayUser)
                                  : undefined
                              }
                              firstName={displayUser?.firstName || ''}
                              lastName={displayUser?.lastName || ''}
                              width={56}
                              height={56}
                            />
                          </div>
                          <SelectedContactNameBox>
                            <SelectedContactName>{`${displayUser?.firstName} ${displayUser?.lastName}`}</SelectedContactName>
                          </SelectedContactNameBox>
                        </MessagesRightTrayHeaderBox>

                        <ChatExpiring>
                          <ChatExpiringBox>
                            <ChatExpiringLabel sx={{ opacity: '0.6' }}>
                              {t('messagesPageExpiringLabel')}
                            </ChatExpiringLabel>
                            <ChatExpiringLabel>
                              {renderSelectedChannelDate()}
                            </ChatExpiringLabel>
                          </ChatExpiringBox>
                          <div>
                            <CalendarDottedIcon />
                          </div>
                        </ChatExpiring>
                      </MessagesRightTrayHeader>
                      <Chat channel={selectedChannel} />
                    </>
                  )}
                </MessagesRightTray>
              </MessagesPageChatContainer>
            )}
          </>
        )}
        {isMobile && (
          <MessagesMobilePageContainer>
            <MessagesMobileTopSection>
              <MessagesMobilePageTitle>
                {t('messagesPageTitle')}
              </MessagesMobilePageTitle>
              <SearchAutocomplete />
            </MessagesMobileTopSection>
            {!channels.length ? (
              noMessagesScreen
            ) : (
              <>
                {channels.map((channel) => (
                  <MessagingChannelSelector
                    key={channel.id}
                    channel={channel}
                    onSelect={() => {
                      setMobileChatIsOpen(true)
                      setSelectedChannel(channel)
                    }}
                    selected={channel.id === selectedChannel?.id}
                  />
                ))}
              </>
            )}
            <MobileChatModal
              open={mobileChatIsOpen}
              channel={selectedChannel}
              onClose={() => setMobileChatIsOpen(false)}
              onTransitionEnd={() => setSelectedChannel(undefined)}
            />
          </MessagesMobilePageContainer>
        )}
      </MessagesPageContainer>
    </AppShell>
  )
}
