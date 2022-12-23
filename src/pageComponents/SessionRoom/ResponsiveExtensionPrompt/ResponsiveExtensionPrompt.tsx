import { FC, ReactNode, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { SnackbarProps } from '@mui/material/Snackbar'

import {
  DrawerContainer,
  DrawerContent,
  MobileBottomDrawer,
  SnackbarBody,
  SnackbarFooter,
  SnackbarMessageContainer,
  StyledSnackbar,
  StyledSwipeableDrawer,
} from 'pageComponents/SessionRoom/ResponsiveExtensionPrompt/styles'

type SupportedSnackbarProps = Pick<
  SnackbarProps,
  'children' | 'anchorOrigin' | 'autoHideDuration' | 'resumeHideDuration'
>

export interface ResponsiveExtensionPromptProps extends SupportedSnackbarProps {
  open: boolean
  footer?: ReactNode
}

export const ResponsiveExtensionPrompt: FC<ResponsiveExtensionPromptProps> = ({
  open,
  footer = null,
  children,
  anchorOrigin,
  autoHideDuration,
  resumeHideDuration,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))
  const [openBottomDrawer, setOpenBottomDrawer] = useState(true)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenBottomDrawer(newOpen)
  }

  if (isMobile) {
    return (
      // <StyledBottomSheet
      //   open={open}
      //   blocking={false}
      //   onDismiss={onDismiss}
      //   defaultSnap={({ maxHeight }) => maxHeight - 96}
      //   snapPoints={({ maxHeight }) => [maxHeight - 96]}
      //   header={<SheetHeader>{/* <SessionExtensionIcon /> */}</SheetHeader>}
      //   footer={footer}
      // >
      //   <SheetBody>{children}</SheetBody>
      // </StyledBottomSheet>

      <StyledSwipeableDrawer
        anchor="bottom"
        open={openBottomDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={56}
        disableSwipeToOpen={true}
        disableDiscovery={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <MobileBottomDrawer>
          <DrawerContainer>
            <DrawerContent>
              {children}
              {footer}
            </DrawerContent>
          </DrawerContainer>
        </MobileBottomDrawer>
      </StyledSwipeableDrawer>
    )
  }

  return (
    <StyledSnackbar
      open={open}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      resumeHideDuration={resumeHideDuration}
      message={
        <SnackbarMessageContainer>
          <SnackbarBody>{children}</SnackbarBody>
          <SnackbarFooter>{footer}</SnackbarFooter>
        </SnackbarMessageContainer>
      }
    />
  )
}
