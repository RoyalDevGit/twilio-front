// Wrapper around grid to fix custom breakpoint props
// We should be able to get rid of this whenever this issue is resolved:
// https://github.com/mui/material-ui/issues/26369#issuecomment-843955468
import { FC } from 'react'
// eslint-disable-next-line no-restricted-imports
import MuiGrid, { GridProps as MuiGridProps } from '@mui/material/Grid'

export interface GridProps
  extends Omit<MuiGridProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> {
  mobileS?: number
  mobileM?: number
  mobileL?: number
  tablet?: number
  laptop?: number
  laptopL?: number
  fourK?: number
}

export const Grid: FC<React.PropsWithChildren<GridProps>> = (props) => (
  <MuiGrid {...props} />
)
