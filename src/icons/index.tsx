import { FC, ReactElement, SVGProps } from 'react'

import { LightOrDark } from 'components/LightOrDark'

type SvgComponent = (props: SVGProps<SVGElement>) => ReactElement

export interface IconProps extends SVGProps<SVGElement> {
  invertColor?: boolean
  forceLight?: boolean
  forceDark?: boolean
  LightSvg?: SvgComponent
  DarkSvg?: SvgComponent
  LightHoverSvg?: SvgComponent
  DarkHoverSvg?: SvgComponent
}

export const Icon: FC<IconProps> = ({
  LightSvg,
  DarkSvg,
  LightHoverSvg,
  DarkHoverSvg,
  forceDark,
  forceLight,
  invertColor,
  ...svgProps
}) => {
  if (forceLight) {
    return (
      <LightOrDark
        light={LightSvg && <LightSvg {...svgProps} />}
        lightHover={LightHoverSvg && <LightHoverSvg {...svgProps} />}
      />
    )
  }
  if (forceDark) {
    return (
      <LightOrDark
        dark={DarkSvg && <DarkSvg {...svgProps} />}
        darkHover={DarkHoverSvg && <DarkHoverSvg {...svgProps} />}
      />
    )
  }

  return (
    <LightOrDark
      inverted={invertColor}
      light={LightSvg && <LightSvg {...svgProps} />}
      lightHover={LightHoverSvg && <LightHoverSvg {...svgProps} />}
      dark={DarkSvg && <DarkSvg {...svgProps} />}
      darkHover={DarkHoverSvg && <DarkHoverSvg {...svgProps} />}
    />
  )
}
