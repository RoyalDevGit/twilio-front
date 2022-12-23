import { FC } from 'react'

import CheckboxUncheckedLight from 'icons/Checkbox/Unchecked/svg/checkbox_unchecked_light.svg'
import CheckboxUncheckedDark from 'icons/Checkbox/Unchecked/svg/checkbox_unchecked_dark.svg'
import { Icon, IconProps } from 'icons'

export const UncheckedCheckboxIcon: FC<IconProps> = (props) => (
  <Icon
    LightSvg={CheckboxUncheckedLight}
    DarkSvg={CheckboxUncheckedDark}
    {...props}
  />
)
