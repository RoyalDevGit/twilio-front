import { FC } from 'react'

import StopwatchSvg from 'icons/LoginAndSignupWallpaper/Stopwatch/svg/stopwatch.svg'
import { Icon, IconProps } from 'icons'

export const StopwatchIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={StopwatchSvg} {...props} />
)
