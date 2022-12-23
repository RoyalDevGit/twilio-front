import { FC, ReactNode } from 'react'

import {
  ClickableLink,
  NonClickContainer,
} from 'components/SessionCard/ClickableContainer/styles'

interface ClickableContainerProps {
  isclickable: boolean
  linkTo?: string
  children: ReactNode
}

export const ClickableContainer: FC<ClickableContainerProps> = ({
  isclickable,
  linkTo,
  children,
}) =>
  isclickable ? (
    <ClickableLink isclickable={isclickable.toString()} href={linkTo ?? ''}>
      {children}
    </ClickableLink>
  ) : (
    <NonClickContainer>{children}</NonClickContainer>
  )
