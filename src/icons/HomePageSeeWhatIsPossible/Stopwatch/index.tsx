import { FC } from 'react'

import StopWatchDarkSvg from 'icons/HomePageSeeWhatIsPossible/Stopwatch/svg/stopwatch-dark.svg'
import StopWatchLightSvg from 'icons/HomePageSeeWhatIsPossible/Stopwatch/svg/stopwatch-light.svg'
import { Icon, IconProps } from 'icons'

export const HomepageStopwatchIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={StopWatchDarkSvg} LightSvg={StopWatchLightSvg} {...props} />
)
