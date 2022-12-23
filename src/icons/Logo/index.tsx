import { FC, SVGProps } from 'react'

import LogoMarkSvg from 'icons/Logo/svg/logomark.svg'
import LogoTextSvg from 'icons/Logo/svg/text.svg'
import LogoCompleteTextSvg from 'icons/Logo/svg/logo-complete-text.svg'
import LogoHorizontalStackedIconDark from 'icons/Logo/svg/horizontal-stacked-dark.svg'
import LogoHorizontalStackedIconLight from 'icons/Logo/svg/horizontal-stacked-light.svg'
import LogoVerticalTextIconDark from 'icons/Logo/svg/logo-vertical-text-dark.svg'
import LogoVerticalTextIconLight from 'icons/Logo/svg/logo-vertical-text-light.svg'
import { Icon, IconProps } from 'icons'

export const LogoIcon: FC<SVGProps<SVGElement>> = (props) => (
  <LogoMarkSvg {...props} />
)

export const LogoTextIcon: FC<SVGProps<SVGElement>> = (props) => (
  <LogoTextSvg {...props} />
)

export const LogoCompleteTextIcon: FC<SVGProps<SVGElement>> = (props) => (
  <LogoCompleteTextSvg {...props} />
)

export const LogoHorizontalStackedIcon: FC<IconProps> = (props) => (
  <Icon
    DarkSvg={LogoHorizontalStackedIconDark}
    LightSvg={LogoHorizontalStackedIconLight}
    {...props}
  />
)

export const LogoVerticalTextIcon: FC<IconProps> = (props) => (
  <Icon
    DarkSvg={LogoVerticalTextIconDark}
    LightSvg={LogoVerticalTextIconLight}
    {...props}
  />
)
