import React, { useId } from 'react'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import { CustomContentProps } from 'notistack'
import { DateTime } from 'luxon'

import { SessionExtensionSuccessfulIcon } from 'icons/SessionExtensionSuccessful'
import {
  IconSection,
  MainSection,
  MessageSection,
  NewEndTime,
  StyledTime,
  TextSection,
} from 'pageComponents/SessionRoom/ExtensionPrompts/ExtendSessionSuccessful/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  NotificationsSnackbar,
  NotificationsCard,
} from 'components/Snacks/styles'
import { SnackBody } from 'pageComponents/SessionRoom/ExtensionPrompts/styles'
import { SessionExtensionRequest } from 'interfaces/SessionExtensionRequest'

interface ExtendSessionSuccessfulSnackProps extends CustomContentProps {
  extensionRequest: SessionExtensionRequest
}

export const ExtendSessionSuccessfulSnack = React.forwardRef<
  HTMLDivElement,
  ExtendSessionSuccessfulSnackProps
>(({ extensionRequest, ...props }, ref) => {
  const { t } = useTranslation(LocaleNamespace.ExtensionPrompts)
  const id = useId()
  const { session } = extensionRequest

  const newEndDate = DateTime.fromISO(session.endDate.date)

  return (
    <NotificationsSnackbar ref={ref} role="alert" {...props} id={id}>
      <NotificationsCard>
        <SnackBody>
          <MainSection>
            <IconSection>
              <SessionExtensionSuccessfulIcon />
            </IconSection>
            <TextSection>
              <Typography variant="subtitle1">
                {t('sessionExtended')}
              </Typography>
              <MessageSection>
                <NewEndTime>{t('newEndTime')}</NewEndTime>
                <StyledTime>
                  {newEndDate.toLocaleString(DateTime.TIME_SIMPLE)}
                </StyledTime>
              </MessageSection>
            </TextSection>
          </MainSection>
        </SnackBody>
      </NotificationsCard>
    </NotificationsSnackbar>
  )
})

ExtendSessionSuccessfulSnack.displayName = 'ExtendSessionSuccessfulSnack'
