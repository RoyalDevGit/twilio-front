import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { enqueueSnackbar } from 'notistack'

import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { SettingsPage, SettingsPageProps } from 'pageComponents/Settings'
import {
  PreferencesPageInput,
  PreferencesInputLabel,
  PreferencesPageContainer,
  PreferencesPageTitle,
  InputActionsBox,
  InputBox,
  SwitchBox,
  CustomSelect,
  CustomLanguageAutocomplete,
} from 'pageComponents/Settings/Preferences/styles'
import { EditControls } from 'pageComponents/Settings/EditControls'
import { useEditableLanguage } from 'hooks/api/user/useEditableLanguage'
import { useEditablePrefersDarkMode } from 'hooks/api/user/useEditablePrefersDarkMode'
import { ColorSchemePreference } from 'interfaces/User'
import { FormError } from 'components/Form/Error'

export const PreferencesPage: NextPage<SettingsPageProps> = ({ ...props }) => {
  const user = useCurrentUserAsserted()
  const { t } = useTranslation(LocaleNamespace.Settings)
  const editableLanguage = useEditableLanguage(user)

  const editableSelect = useEditablePrefersDarkMode({
    user,
    onSave: () => {
      enqueueSnackbar(t('toastNotificationLabel'), { variant: 'success' })
    },
  })

  return (
    <SettingsPage {...props}>
      <PreferencesPageContainer>
        <PreferencesPageTitle variant="h6">
          {t('preferencesTab')}
        </PreferencesPageTitle>

        <PreferencesPageInput>
          <InputActionsBox>
            <InputBox>
              <PreferencesInputLabel>
                {t('preferencesLanguageInput')}
              </PreferencesInputLabel>
              {!editableLanguage.editing && (
                <Typography>
                  {editableLanguage.input.value?.name ||
                    t('addPreferredLanguage')}
                </Typography>
              )}
              {editableLanguage.editing && (
                <>
                  <CustomLanguageAutocomplete
                    {...editableLanguage.input}
                    size="small"
                    fullWidth
                    disableClearable
                    inputValue={editableLanguage.textInput.value}
                    onInputChange={editableLanguage.textInput.onChange}
                    renderInput={(params) => (
                      <TextField
                        error={!!editableLanguage.error}
                        {...params}
                        placeholder={t('typeToAdd')}
                      />
                    )}
                  />
                  {!!editableLanguage.error && (
                    <FormError>{editableLanguage.error}</FormError>
                  )}
                </>
              )}
            </InputBox>
            <EditControls
              value={editableLanguage.input.value}
              editing={editableLanguage.editing}
              onEdit={editableLanguage.enable}
              onCancel={editableLanguage.cancel}
              onSave={async () => {
                if (await editableLanguage.save()) {
                  enqueueSnackbar(t('toastNotificationLabel'), {
                    variant: 'success',
                  })
                }
              }}
            />
          </InputActionsBox>
          <Divider />
        </PreferencesPageInput>
        <PreferencesPageInput>
          <InputBox>
            <PreferencesInputLabel>
              {t('preferencesDisplaySettingsInput')}
            </PreferencesInputLabel>
            <SwitchBox>
              <CustomSelect
                value={editableSelect.input.value}
                onChange={editableSelect.input.onChange}
              >
                <MenuItem value={ColorSchemePreference.Dark}>
                  {t('preferencesDarkModeLabel')}
                </MenuItem>
                <MenuItem value={ColorSchemePreference.Light}>
                  {t('preferencesLightModeLabel')}
                </MenuItem>
                <MenuItem defaultChecked value={ColorSchemePreference.System}>
                  {t('preferencesSystemModeLabel')}
                </MenuItem>
              </CustomSelect>
            </SwitchBox>
          </InputBox>
          <Divider />
        </PreferencesPageInput>
      </PreferencesPageContainer>
    </SettingsPage>
  )
}
