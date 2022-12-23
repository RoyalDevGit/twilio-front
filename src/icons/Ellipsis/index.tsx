import { FC } from 'react'

import EllipsisIconDark from 'icons/Ellipsis/svg/ellipsis_dark.svg'
import EllipsisIconLight from 'icons/Ellipsis/svg/ellipsis_light.svg'
import { Icon, IconProps } from 'icons'

export const EllipsisIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={EllipsisIconDark} LightSvg={EllipsisIconLight} {...props} />
)
