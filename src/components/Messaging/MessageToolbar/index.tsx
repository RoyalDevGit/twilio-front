import React, {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'next-i18next'
import IconButton from '@mui/material/IconButton'
import dynamic from 'next/dynamic'
import { EmojiClickData } from 'emoji-picker-react'
import { enqueueSnackbar } from 'notistack'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  AttachmentLabel,
  AttachmentListContainer,
  CustomMenu,
  LockedMessageToolbarLabel,
  HiddenFileInput,
  MessageSection,
  MessageToolbarContainer,
  MessageToolbarInputBase,
  MessageToolbarInputBaseHolder,
} from 'components/Messaging/MessageToolbar/styles'
import { ClipIcon } from 'icons/MessageToolbar/Emoji'
import { EmojiIcon } from 'icons/MessageToolbar/Clip'
import { UploadIcon } from 'icons/MessageToolbar/Upload'
import { LockedIcon } from 'icons/MessageToolbar/Locked'
import { AttachmentList } from 'components/Messaging/MessageToolbar/AttachmentList'
import { Config } from 'utils/config'
import { isMessagingChannelLocked } from 'utils/messaging/isMessagingChannelLocked'
import { MessagingChannel } from 'interfaces/MessagingChannel'

const DynamicPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EmojiPicker: FC<{ onEmojiClick: (data: EmojiClickData) => unknown }> = (
  props
) => <DynamicPicker {...props} />

const MESSAGE_SIZE_LIMIT = Config.getBytes('MESSAGE_SIZE_LIMIT')

export interface SentMessage {
  content: string
  attachments: File[]
}

export interface MessageToolbarProps {
  className?: string
  onSend?: (message: SentMessage) => unknown
  messageToolbarForceDark?: boolean
  messageToolbarForceLight?: boolean
  channel: MessagingChannel
}

export const MessageToolbar: FC<MessageToolbarProps> = ({
  className,
  onSend,
  messageToolbarForceDark,
  messageToolbarForceLight,
  channel,
}) => {
  const { t } = useTranslation(LocaleNamespace.MessagesPage)

  const [messageContent, setMessageContent] = useState('')
  const [emojiMenuAnchor, setEmojiMenuAnchor] =
    React.useState<null | HTMLElement>(null)
  const [attachments, setAttachments] = useState<File[]>([])
  const [validAttachments, setValidAttachments] = useState(true)
  const emojiMenuIsOpen = Boolean(emojiMenuAnchor)
  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    const attachmentsSize =
      attachments.length === 0
        ? 0
        : attachments.map((a) => a.size).reduce((a, b) => a + b)
    setValidAttachments(MESSAGE_SIZE_LIMIT >= attachmentsSize)
  }, [attachments])

  const openEmojiMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEmojiMenuAnchor(event.currentTarget)
  }

  const closeEmojiMenu = () => {
    setEmojiMenuAnchor(null)
  }

  const triggerOnSend = () => {
    if (!messageContent.trim() && !attachments.length) {
      return
    }
    if (!validAttachments) {
      enqueueSnackbar(t('toastNotificationInvalidAttachments'), {
        variant: 'error',
      })
      return
    }
    if (onSend) {
      onSend({
        content: messageContent,
        attachments,
      })
    }
    setMessageContent('')
    setAttachments([])
  }

  const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter') {
      triggerOnSend()
      event.preventDefault()
    }
  }

  const onEmojiClick = (data: EmojiClickData) => {
    closeEmojiMenu()
    if (!inputRef.current) {
      return
    }

    const cursorPosition = inputRef.current.selectionStart || 0
    const textBeforeCursorPosition = inputRef.current.value.substring(
      0,
      cursorPosition
    )
    const textAfterCursorPosition = inputRef.current.value.substring(
      cursorPosition,
      inputRef.current.value.length
    )
    setMessageContent(
      textBeforeCursorPosition + data.emoji + textAfterCursorPosition
    )
  }

  const isLocked = isMessagingChannelLocked(channel)

  const onFileSubmit: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const { files } = e.target
      setAttachments((prevArray) => [...prevArray, ...Array.from(files)])
      e.target.value = ''
    }
  }

  const removeAttachments = (index: number) => {
    const attachmentToRemove = attachments[index]
    setAttachments((prevAttachments) =>
      prevAttachments.filter((a) => a !== attachmentToRemove)
    )
  }

  return (
    <MessageToolbarContainer className={className} locked={isLocked}>
      {isLocked ? (
        <>
          <div>
            <LockedIcon />
          </div>
          <LockedMessageToolbarLabel>
            {t('lockedToolbarLabel')}
          </LockedMessageToolbarLabel>
        </>
      ) : (
        <>
          <MessageToolbarInputBaseHolder
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            isvalid={validAttachments.toString()}
          >
            {attachments.length > 0 && (
              <AttachmentListContainer>
                <AttachmentList
                  attachments={attachments}
                  attachmentHeight={40}
                  attachmentWidth={131}
                  imageHeight={40}
                  imageWidth={40}
                  onRemovedFile={removeAttachments}
                />
              </AttachmentListContainer>
            )}
            <MessageSection>
              <AttachmentLabel htmlFor="attachment-button">
                <HiddenFileInput
                  accept="application/pdf, image/*, video/*"
                  id="attachment-button"
                  type="file"
                  onChange={onFileSubmit}
                />
                <IconButton sx={{ p: '10px' }} component="span">
                  <ClipIcon
                    forceDark={messageToolbarForceDark}
                    forceLight={messageToolbarForceLight}
                  />
                </IconButton>
              </AttachmentLabel>
              <MessageToolbarInputBase
                sx={{ ml: 1, flex: 1 }}
                value={messageContent}
                onChange={(e) => setMessageContent(e.currentTarget.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('messageToolbarPlaceholder')}
                inputRef={inputRef}
              />
              <IconButton sx={{ p: '10px' }} onClick={openEmojiMenu}>
                <EmojiIcon
                  forceDark={messageToolbarForceDark}
                  forceLight={messageToolbarForceLight}
                />
              </IconButton>
              <IconButton sx={{ p: '10px' }} onClick={triggerOnSend}>
                <UploadIcon
                  forceDark={messageToolbarForceDark}
                  forceLight={messageToolbarForceLight}
                />
              </IconButton>
            </MessageSection>
          </MessageToolbarInputBaseHolder>
          <CustomMenu
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            anchorEl={emojiMenuAnchor}
            open={emojiMenuIsOpen}
            onClose={closeEmojiMenu}
          >
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </CustomMenu>
        </>
      )}
    </MessageToolbarContainer>
  )
}
