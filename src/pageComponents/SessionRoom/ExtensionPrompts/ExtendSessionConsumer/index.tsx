import React, { useCallback, useId } from 'react'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import { closeSnackbar, CustomContentProps } from 'notistack'

import { SessionExtensionIcon } from 'icons/SessionExtension'
import {
  MainSection,
  ActionSection,
  IconSection,
  TextSection,
} from 'pageComponents/SessionRoom/ExtensionPrompts/ExtendSessionConsumer/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  NotificationsSnackbar,
  NotificationsCard,
} from 'components/Snacks/styles'
import {
  NegativeResponseButton,
  PositiveResponseButton,
  SnackBody,
} from 'pageComponents/SessionRoom/ExtensionPrompts/styles'
import { SessionExtensionRequest } from 'interfaces/SessionExtensionRequest'
import { SessionApi } from 'apis/SessionApi'
import { Session } from 'interfaces/Session'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { getOtherSessionUser } from 'utils/sessions/getOtherSessionUser'

interface ExtendSessionConsumerSnackProps extends CustomContentProps {
  session: Session
  extensionRequest?: SessionExtensionRequest
}

export const ExtendSessionConsumerSnack = React.forwardRef<
  HTMLDivElement,
  ExtendSessionConsumerSnackProps
>(({ session, extensionRequest, ...props }, ref) => {
  const { t } = useTranslation(LocaleNamespace.ExtensionPrompts)
  const id = useId()
  const user = useCurrentUserAsserted()

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id)
  }, [props.id, closeSnackbar])

  const handlePositiveResponse = async () => {
    if (extensionRequest) {
      await SessionApi.acceptSessionExtensionRequest(
        extensionRequest.session.id
      )
    } else {
      await SessionApi.createSessionExtensionRequest(session.id)
    }

    handleDismiss()
  }

  const handleNegativeResponse = async () => {
    if (extensionRequest) {
      await SessionApi.declineSessionExtensionRequest(
        extensionRequest.session.id
      )
    }
    handleDismiss()
  }

  const otherUser = extensionRequest
    ? getOtherSessionUser(user, extensionRequest.session)
    : null

  return (
    <NotificationsSnackbar ref={ref} role="alert" {...props} id={id}>
      <NotificationsCard>
        <SnackBody>
          <MainSection>
            <IconSection>
              <SessionExtensionIcon />
            </IconSection>
            <TextSection>
              <Typography variant="body2">
                {extensionRequest
                  ? t('expertOfferedExtension', {
                      name: otherUser?.firstName,
                    })
                  : t('sessionAboutToExpire')}
              </Typography>
              <Typography variant="subtitle1">
                {extensionRequest
                  ? t('acceptExtension')
                  : t('extendSessionRequest')}
              </Typography>
            </TextSection>
          </MainSection>
        </SnackBody>

        <ActionSection>
          <PositiveResponseButton onClick={handlePositiveResponse}>
            {t(extensionRequest ? 'acceptButton' : 'yesButton')}
          </PositiveResponseButton>
          <NegativeResponseButton onClick={handleNegativeResponse}>
            {t(extensionRequest ? 'declineButton' : 'noButton')}
          </NegativeResponseButton>
        </ActionSection>
      </NotificationsCard>
    </NotificationsSnackbar>
  )
})

ExtendSessionConsumerSnack.displayName = 'ExtendSessionConsumerSnack'
