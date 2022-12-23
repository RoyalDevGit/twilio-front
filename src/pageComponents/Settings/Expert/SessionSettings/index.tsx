import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import InputAdornment from '@mui/material/InputAdornment'
import { enqueueSnackbar } from 'notistack'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  SessionSettingsContainer,
  HorizontalDivider,
  SessionSettingsDescription,
  Section,
  SessionSettingsInputLabel,
  PriceInput,
  SessionDurationItem,
  SessionSettingsTypography,
  SmallTextField,
  InputBox,
} from 'pageComponents/Settings/Expert/SessionSettings/styles'
import { useExpertAsserted } from 'hooks/useExpert'
import { useEditableHourlyRate } from 'hooks/api/expert/useEditableHourlyRate'
import { SessionDurationOptions } from 'components/SessionDurationOptions'
import { SessionDurationOption } from 'interfaces/SessionDurationOption'
import { useEditableSessionDurationOptions } from 'hooks/api/expert/useEditableSessionDurationOptions'
import { SettingsPage, SettingsPageProps } from 'pageComponents/Settings'
import { FormError } from 'components/Form/Error'

export interface ExpertDurationSettingsPageProps extends SettingsPageProps {
  initialSessionDurationOptions: SessionDurationOption[]
}

export const ExpertDurationSettingsPage: NextPage<
  ExpertDurationSettingsPageProps
> = ({ initialSessionDurationOptions, ...props }) => {
  const expert = useExpertAsserted()
  const { t } = useTranslation(LocaleNamespace.ExpertDurationSettings)

  const editableHourlyRate = useEditableHourlyRate({
    expert,
    onSave: () => {
      enqueueSnackbar(t('toastNotificationLabel'), { variant: 'success' })
    },
  })

  const editableSessionDurationOptions = useEditableSessionDurationOptions({
    expert,
    initialValue: initialSessionDurationOptions,
    onSave: () => {
      enqueueSnackbar(t('toastNotificationLabel'), { variant: 'success' })
    },
    onRemove: () => {
      enqueueSnackbar(t('toastNotificationLabel'), { variant: 'success' })
    },
  })

  return (
    <SettingsPage {...props}>
      <SessionSettingsContainer>
        <Section>
          <SessionSettingsTypography>
            {t('hourlyRateTitle')}
          </SessionSettingsTypography>
          <SessionSettingsDescription variant="body2">
            {t('hourlyRateDescription')}
          </SessionSettingsDescription>
          <SessionDurationItem>
            <PriceInput>
              <SessionSettingsInputLabel>
                {t('hourlyRateInputLabel')}
              </SessionSettingsInputLabel>
              <InputBox>
                <SmallTextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  error={!!editableHourlyRate.error}
                  {...editableHourlyRate.input}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
                {!!editableHourlyRate.error && (
                  <FormError>{editableHourlyRate.error}</FormError>
                )}
              </InputBox>
            </PriceInput>
          </SessionDurationItem>
        </Section>
        <HorizontalDivider />
        <Section>
          <SessionSettingsTypography>
            {t('sessionDurationTitle')}
          </SessionSettingsTypography>
          <SessionSettingsDescription variant="body2">
            {t('sessionDurationDescription')}
          </SessionSettingsDescription>
          <SessionDurationOptions
            options={editableSessionDurationOptions.value}
            onAdd={editableSessionDurationOptions.onOptionAdd}
            onRemove={editableSessionDurationOptions.onOptionRemove}
            onDurationChange={
              editableSessionDurationOptions.onOptionDurationChange
            }
            errors={editableSessionDurationOptions.errors}
          />
        </Section>
      </SessionSettingsContainer>
    </SettingsPage>
  )
}
