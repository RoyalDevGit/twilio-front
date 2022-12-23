import { atom } from 'recoil'

import { MessagingChannel } from 'interfaces/MessagingChannel'

export const preventChatPopupState = atom<MessagingChannel[]>({
  key: 'preventChatPopup',
  default: [],
})
