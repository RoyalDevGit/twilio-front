import { FC } from 'react'

import LightSvg from 'icons/MagnifyingGlass/svg/search-icon-light.svg'
import DarkSvg from 'icons/MagnifyingGlass/svg/search-icon-dark.svg'
import SearchLightSvg from 'icons/MagnifyingGlass/svg/search-autocomplete-icon-light.svg'
import SearchDarkSvg from 'icons/MagnifyingGlass/svg/search-autocomplete-icon-dark.svg'
import { Icon, IconProps } from 'icons'

export const MagnifyingGlassIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)

export const AutocompleteMagnifyingGlassIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={SearchLightSvg} DarkSvg={SearchDarkSvg} {...props} />
)
