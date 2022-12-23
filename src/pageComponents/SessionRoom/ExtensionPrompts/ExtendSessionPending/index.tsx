import React, { useCallback, useId } from 'react'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import { closeSnackbar, CustomContentProps } from 'notistack'

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
  SnackBody,
} from 'pageComponents/SessionRoom/ExtensionPrompts/styles'
import { SessionExtensionRequest } from 'interfaces/SessionExtensionRequest'
import { SessionApi } from 'apis/SessionApi'
import { ExtensionIconSpinner } from 'pageComponents/SessionRoom/ExtensionPrompts/ExtendSessionPending/styles'
import { getOtherSessionUser } from 'utils/sessions/getOtherSessionUser'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'

interface ExtendSessionPendingSnackProps extends CustomContentProps {
  extensionRequest: SessionExtensionRequest
}

export const ExtendSessionPendingSnack = React.forwardRef<
  HTMLDivElement,
  ExtendSessionPendingSnackProps
>(({ extensionRequest, ...props }, ref) => {
  const { t } = useTranslation(LocaleNamespace.ExtensionPrompts)
  const user = useCurrentUserAsserted()
  const id = useId()

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id)
  }, [props.id, closeSnackbar])

  const handleWithdrawal = async () => {
    await SessionApi.withdrawSessionExtensionRequest(
      extensionRequest.session.id
    )

    handleDismiss()
  }

  const otherUser = getOtherSessionUser(user, extensionRequest.session)

  const isOwner = extensionRequest.requester.id === user.id

  return (
    <NotificationsSnackbar ref={ref} role="alert" {...props} id={id}>
      <NotificationsCard>
        <SnackBody>
          <MainSection>
            <IconSection>
              <ExtensionIconSpinner />
            </IconSection>
            <TextSection>
              <Typography variant="body2">
                {t('requestSent', { name: otherUser.firstName })}
              </Typography>
              <Typography variant="subtitle1">
                {t('waitingForOtherParty')}
              </Typography>
            </TextSection>
          </MainSection>
        </SnackBody>

        {isOwner && (
          <ActionSection>
            <NegativeResponseButton onClick={handleWithdrawal}>
              {t('withdrawRequest')}
            </NegativeResponseButton>
          </ActionSection>
        )}
      </NotificationsCard>
    </NotificationsSnackbar>
  )
})

ExtendSessionPendingSnack.displayName = 'ExtendSessionPendingSnack'
