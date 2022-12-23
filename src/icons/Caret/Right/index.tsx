import { FC, SVGProps } from 'react'

import SmallSvgLight from 'icons/Caret/Right/S/svg/icons/light/next-caret.svg'
import SmallSvgDark from 'icons/Caret/Right/S/svg/icons/dark/next-caret.svg'
import MediumSvgLight from 'icons/Caret/Right/M/svg/icons/light/next-caret.svg'
import MediumSvgDark from 'icons/Caret/Right/M/svg/icons/dark/next-caret.svg'
import { LightOrDark } from 'components/LightOrDark'

export interface RightCaretIconProps extends SVGProps<SVGElement> {
  size: 'S' | 'M'
}
export const RightCaretIcon: FC<RightCaretIconProps> = (props) =>
  props.size === 'S' ? (
    <LightOrDark
      light={<SmallSvgLight {...props} />}
      dark={<SmallSvgDark {...props} />}
    />
  ) : (
    <LightOrDark
      light={<MediumSvgLight {...props} />}
      dark={<MediumSvgDark {...props} />}
    />
  )
