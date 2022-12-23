import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import {
  ChatHistoryContainer,
  ChatHistoryLabel,
} from 'pageComponents/Schedule/SessionChatHistory/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Chat } from 'components/Messaging/Chat'
import { Session } from 'interfaces/Session'

interface SessionChatHistoryProps {
  session: Session
}

export const SessionChatHistory: FC<SessionChatHistoryProps> = ({
  session,
}) => {
  const { t } = useTranslation([LocaleNamespace.SessionList])

  return (
    <ChatHistoryContainer>
      <ChatHistoryLabel>{t('pastSessionChatHistoryLabel')}</ChatHistoryLabel>
      <Chat channel={session.messagingChannel} />
    </ChatHistoryContainer>
  )
}
