import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import Box from '@mui/material/Box'
import { enqueueSnackbar } from 'notistack'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  AvailabilityHeader,
  AvailabilityTimezone,
  AvailabilityTimezoneContainer,
  AvailabilityTitle,
  BlockoutDatesDescription,
  UpdateTimezoneButton,
  AvailabilityContainer,
  Section,
  SectionBox,
  AvailabilitySectionContainer,
  NoticePeriodBox,
} from 'pageComponents/Settings/Expert/Availability/styles'
import { getCurrentTimeZone } from 'utils/date/getCurrentTimeZone'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { useEditableTimeZone } from 'hooks/api/user/useEditableTimeZone'
import { AvailabilityOptions } from 'components/AvailabilityOptions'
import { AvailabilityOption } from 'interfaces/AvailabilityOption'
import { useExpertAsserted } from 'hooks/useExpert'
import { useEditableAvailabilityOptions } from 'hooks/api/expert/useEditableAvailabilityOptions'
import { BlockoutDates } from 'components/BlockoutDates'
import { BlockoutDate } from 'interfaces/BlockoutDate'
import { useEditableBlockoutDates } from 'hooks/api/expert/useEditableBlockoutDates'
import { SettingsPage, SettingsPageProps } from 'pageComponents/Settings'
import { NoticePeriodInput } from 'components/NoticePeriodInput'
import { useEditableNoticePeriod } from 'hooks/api/expert/useEditableNoticePeriod'
import { FormError } from 'components/Form/Error'
import { TimeZoneDialog } from 'components/Dialogs/TimeZoneDialog'

export interface ExpertAvailabilitySettingsPageProps extends SettingsPageProps {
  initialAvailabilityOptions: AvailabilityOption[]
  initialBlockoutDates: BlockoutDate[]
}

export const ExpertAvailabilitySettingsPage: NextPage<
  ExpertAvailabilitySettingsPageProps
> = ({ initialAvailabilityOptions, initialBlockoutDates, ...props }) => {
  const user = useCurrentUserAsserted()
  const expert = useExpertAsserted()
  const { t } = useTranslation([LocaleNamespace.ExpertAvailabilitySettings])
  const editableTimeZone = useEditableTimeZone(
    user,
    user.settings?.timeZone || getCurrentTimeZone()
  )

  const editableAvailabilityOptions = useEditableAvailabilityOptions({
    expert,
    initialValue: initialAvailabilityOptions,
    onSave: () => {
      enqueueSnackbar(t('toastNotificationLabel'), {
        variant: 'success',
        preventDuplicate: true,
      })
    },
  })

  const editableBlockoutDates = useEditableBlockoutDates({
    expert,
    initialValue: initialBlockoutDates,
    onSave: () => {
      enqueueSnackbar(t('toastNotificationLabel'), { variant: 'success' })
    },
    onRemove: () => {
      enqueueSnackbar(t('toastNotificationLabel'), { variant: 'success' })
    },
  })

  const editableNoticePeriod = useEditableNoticePeriod({
    expert,
    onSave: () => {
      enqueueSnackbar(t('toastNotificationLabel'), { variant: 'success' })
    },
  })

  const handleClickOpenTimeZoneDialog = () => {
    editableTimeZone.enable()
  }

  const handleCloseTimeZoneDialog = () => {
    editableTimeZone.disable()
  }

  return (
    <SettingsPage {...props}>
      <AvailabilityContainer>
        <AvailabilityHeader>
          <AvailabilityTitle>{t('availableHours')}</AvailabilityTitle>
          <AvailabilityTimezoneContainer>
            <AvailabilityTimezone>
              {`${t('availabilityTimezoneLabel')} (${
                user.settings?.timeZone || getCurrentTimeZone()
              })`}
            </AvailabilityTimezone>
            <UpdateTimezoneButton
              variant="text"
              onClick={handleClickOpenTimeZoneDialog}
            >
              {t('updateTimeZoneLabel')}
            </UpdateTimezoneButton>
          </AvailabilityTimezoneContainer>
        </AvailabilityHeader>
        <Box maxWidth="tablet">
          <AvailabilityOptions
            value={editableAvailabilityOptions.value}
            onWeekdayToggle={editableAvailabilityOptions.onWeekdayToggle}
            onTimeRangeAdd={editableAvailabilityOptions.onTimeRangeAdd}
            onTimeRangeDelete={editableAvailabilityOptions.onTimeRangeDelete}
            onEndTimeChange={editableAvailabilityOptions.onEndTimeChange}
            onStartTimeChange={editableAvailabilityOptions.onStartTimeChange}
            errors={editableAvailabilityOptions.errors}
            onApplyToAll={(weekday) =>
              editableAvailabilityOptions.applyToAll(weekday)
            }
          />
        </Box>
      </AvailabilityContainer>
      <AvailabilitySectionContainer>
        <Section>
          <SectionBox>
            <AvailabilityTitle>{t('blockoutDates')}</AvailabilityTitle>
            <BlockoutDatesDescription>
              {t('blockoutDatesDescriptionLabel')}
            </BlockoutDatesDescription>
          </SectionBox>
          <BlockoutDates
            value={editableBlockoutDates.value}
            onAdd={editableBlockoutDates.onAdd}
            onRemove={editableBlockoutDates.onRemove}
          />
        </Section>
        <Section>
          <SectionBox>
            <AvailabilityTitle>{t('noticePeriodTitle')}</AvailabilityTitle>
            <BlockoutDatesDescription>
              {t('noticePeriodDescription')}
            </BlockoutDatesDescription>
          </SectionBox>
          <NoticePeriodBox>
            <NoticePeriodInput
              {...editableNoticePeriod.input}
              error={!!editableNoticePeriod.error}
            />
            <FormError>{editableNoticePeriod.error}</FormError>
          </NoticePeriodBox>
        </Section>
      </AvailabilitySectionContainer>
      <TimeZoneDialog
        fullWidth
        startTimeZone={user.settings?.timeZone}
        open={editableTimeZone.editing}
        onClose={editableTimeZone.cancel}
        onSave={async (startTimeZone?: string) => {
          editableTimeZone.setValue(startTimeZone)
          handleCloseTimeZoneDialog()
          await editableTimeZone.save()
          enqueueSnackbar(t('toastNotificationLabel'), { variant: 'success' })
        }}
      />
    </SettingsPage>
  )
}
