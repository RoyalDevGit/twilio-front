import { FC } from 'react'

import {
  CostLabel,
  HourLabel,
  RatePerHourContainer,
  SlashLabel,
} from 'components/RatePerHour/styles'

export interface RatePerHourProps {
  ratePerHour: number
  className?: string
}

export const RatePerHour: FC<React.PropsWithChildren<RatePerHourProps>> = ({
  ratePerHour,
  className,
}) => (
  <RatePerHourContainer className={className}>
    <CostLabel>
      {`$${ratePerHour}`}
      <SlashLabel>/</SlashLabel>
      <HourLabel>hr</HourLabel>
    </CostLabel>
  </RatePerHourContainer>
)
