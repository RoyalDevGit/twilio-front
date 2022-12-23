import { FC } from 'react'

import EmojiIconDark from 'icons/MessageToolbar/Emoji/svg/emoji_dark.svg'
import EmojiIconLight from 'icons/MessageToolbar/Emoji/svg/emoji_light.svg'
import { Icon, IconProps } from 'icons'

export const EmojiIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={EmojiIconDark} LightSvg={EmojiIconLight} {...props} />
)
