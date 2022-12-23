import { FC } from 'react'

import HomePageBlurLight from 'icons/HomePageBlur/svg/home_page_light.svg'
import HomePageBlurDark from 'icons/HomePageBlur/svg/home_page_dark.svg'
import { Icon, IconProps } from 'icons'

export const HomePageBlurIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={HomePageBlurLight} DarkSvg={HomePageBlurDark} {...props} />
)
