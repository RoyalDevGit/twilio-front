/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC } from 'react'
import { DateNavigator } from '@devexpress/dx-react-scheduler-material-ui'

import { ChevronRightIcon } from 'icons/Chevron/Right'
import { ChevronLeftIcon } from 'icons/Chevron/Left'
import {
  CalendarNavigatorButton,
  CalendarNavigatorContainer,
  CalendarNavigatorText,
} from 'components/Calendar/Navigator/styles'

export const CalendarNavigator: FC<
  React.PropsWithChildren<DateNavigator.RootProps>
> = (props) => (
  <CalendarNavigatorContainer>
    <CalendarNavigatorButton
      onClick={() => {
        props.onNavigate('back', null as any)
      }}
    >
      <ChevronLeftIcon />
    </CalendarNavigatorButton>
    <CalendarNavigatorText>{props.navigatorText}</CalendarNavigatorText>
    <CalendarNavigatorButton
      onClick={() => {
        props.onNavigate('forward', null as any)
      }}
    >
      <ChevronRightIcon />
    </CalendarNavigatorButton>
  </CalendarNavigatorContainer>
)
