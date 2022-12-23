import React, { useId } from 'react'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import { CustomContentProps } from 'notistack'

import { SessionExtensionDeclinedIcon } from 'icons/SessionExtensionDeclined'
import { MainSection } from 'pageComponents/SessionRoom/ExtensionPrompts/ExtendSessionDeclined/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  NotificationsSnackbar,
  NotificationsCard,
} from 'components/Snacks/styles'

type ExtendSessionWithdrawnSnackProps = CustomContentProps

export const ExtendSessionWithdrawnSnack = React.forwardRef<
  HTMLDivElement,
  ExtendSessionWithdrawnSnackProps
>((props, ref) => {
  const { t } = useTranslation(LocaleNamespace.ExtensionPrompts)
  const id = useId()

  return (
    <NotificationsSnackbar ref={ref} role="alert" {...props} id={id}>
      <NotificationsCard>
        <MainSection>
          <SessionExtensionDeclinedIcon />
          <Typography variant="subtitle1">{t('sessionWithdrawn')}</Typography>
        </MainSection>
      </NotificationsCard>
    </NotificationsSnackbar>
  )
})

ExtendSessionWithdrawnSnack.displayName = 'ExtendSessionWithdrawnSnack'
