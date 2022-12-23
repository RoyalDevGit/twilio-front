import { FC, ReactNode } from 'react'

import { MobileNavigationContainer } from 'components/MobileNavigation/styles'

export interface MobileNavigationProps {
  children?: ReactNode
  onDrawerMenuClick?: () => void
}

export const MobileNavigation: FC<MobileNavigationProps> = ({ children }) => (
  <MobileNavigationContainer>{children}</MobileNavigationContainer>
)
