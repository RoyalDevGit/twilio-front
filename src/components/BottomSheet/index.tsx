import { FC, ReactNode } from 'react'
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

import {
  BottomSheetBody,
  BottomSheetContainer,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSwipeableSheet,
} from 'components/BottomSheet/styles'

export interface BottomSheetProps extends Omit<SwipeableDrawerProps, 'anchor'> {
  header?: ReactNode
  footer?: ReactNode
}

const Puller = styled(Box)(({ theme }) => ({
  width: 70,
  height: 4,
  backgroundColor: theme.palette.grey[500],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 35px)',
}))

export const BottomSheet: FC<BottomSheetProps> = ({
  children,
  header,
  footer,
  ...props
}) => (
  <BottomSwipeableSheet
    {...props}
    anchor="bottom"
    sx={{ height: 'calc(100vh - 96px)', borderRadius: '15px 15px 0px 0px' }}
    disableSwipeToOpen={true}
    disableDiscovery={true}
  >
    <BottomSheetContainer>
      <BottomSheetHeader>
        <Puller />
        {header}
      </BottomSheetHeader>
      <BottomSheetBody>{children}</BottomSheetBody>
      {footer && <BottomSheetFooter>{footer}</BottomSheetFooter>}
    </BottomSheetContainer>
  </BottomSwipeableSheet>
)
