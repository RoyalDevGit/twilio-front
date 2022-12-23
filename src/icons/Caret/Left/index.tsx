import { FC, SVGProps } from 'react'

import SmallSvgLight from 'icons/Caret/Left/S/svg/icons/light/prev-caret.svg'
import SmallSvgDark from 'icons/Caret/Left/S/svg/icons/dark/prev-caret.svg'
import MediumSvgLight from 'icons/Caret/Left/M/svg/icons/light/prev-caret.svg'
import MediumSvgDark from 'icons/Caret/Left/M/svg/icons/dark/prev-caret.svg'
import { LightOrDark } from 'components/LightOrDark'

export interface LeftCaretIconProps extends SVGProps<SVGElement> {
  size: 'S' | 'M'
}
export const LeftCaretIcon: FC<LeftCaretIconProps> = (props) =>
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
