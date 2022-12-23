import { FC, forwardRef, JSXElementConstructor, ReactElement, Ref } from 'react'
import omit from 'lodash/omit'
import { TransitionProps } from '@mui/material/transitions'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@emotion/react'

export interface ResponsiveDialogProps extends DialogProps {
  transition?: JSXElementConstructor<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TransitionProps & { children: ReactElement<any, any> }
  >
}

const DefaultMobileTransition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Slide ref={ref} {...props} direction="up" />
})

export const ResponsiveDialog: FC<ResponsiveDialogProps> = ({
  transition = DefaultMobileTransition,
  ...otherProps
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  const dialogProps: DialogProps = { ...otherProps }

  if (isMobile) {
    const mobileDialogProps: DialogProps = omit(dialogProps, [
      'fullScreen',
      'fullWidth',
      'maxWidth',
    ])
    mobileDialogProps.fullScreen = true
    return (
      <Dialog {...mobileDialogProps} TransitionComponent={transition}>
        {dialogProps.children}
      </Dialog>
    )
  }

  return <Dialog {...dialogProps}>{dialogProps.children}</Dialog>
}
