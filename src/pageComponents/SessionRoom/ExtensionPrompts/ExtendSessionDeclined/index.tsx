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

type ExtendSessionDeclinedSnackProps = CustomContentProps

export const ExtendSessionDeclinedSnack = React.forwardRef<
  HTMLDivElement,
  ExtendSessionDeclinedSnackProps
>((props, ref) => {
  const { t } = useTranslation(LocaleNamespace.ExtensionPrompts)
  const id = useId()

  return (
    <NotificationsSnackbar ref={ref} role="alert" {...props} id={id}>
      <NotificationsCard>
        <MainSection>
          <SessionExtensionDeclinedIcon />
          <Typography variant="subtitle1">{t('sessionDeclined')}</Typography>
        </MainSection>
      </NotificationsCard>
    </NotificationsSnackbar>
  )
})

ExtendSessionDeclinedSnack.displayName = 'ExtendSessionDeclinedSnack'
