import { FC } from 'react'
import Divider from '@mui/material/Divider'
import { useTranslation } from 'next-i18next'

import {
  ChangePasswordForm,
  ChangePasswordFormControl,
  ChangePasswordFormLabel,
  ChangePasswordMessageRequirement,
  ChangePasswordMessageRequirementBullet,
  ChangePasswordMessageRequirements,
  ChangePasswordMessageRequirementTitle,
  ChangePasswordMessageSection,
  ChangePasswordStrengthBar,
  DialogInput,
  FormSection,
} from 'pageComponents/Settings/Security/ChangePasswordDialog/Steps/ChangePasswordFormStep/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

interface ChangePasswordFormStepProps {
  onPasswordFieldChange: (value: string) => unknown
  onNewPasswordFieldChange: (value: string) => unknown
  onConfirmedPasswordFieldChange: (value: string) => unknown
  onChangeScore: (score: number) => void
  newPasswordFieldValue: string
}

export const ChangePasswordFormStep: FC<ChangePasswordFormStepProps> = ({
  onPasswordFieldChange,
  onNewPasswordFieldChange,
  onConfirmedPasswordFieldChange,
  onChangeScore,
  newPasswordFieldValue,
}) => {
  const { t } = useTranslation([
    LocaleNamespace.ChangePasswordDialog,
    LocaleNamespace.Password,
  ])

  return (
    <>
      <ChangePasswordMessageSection>
        <ChangePasswordMessageRequirementTitle variant="subtitle1">
          {' '}
          {t('passwordRequirement')}{' '}
        </ChangePasswordMessageRequirementTitle>
        <ChangePasswordMessageRequirements>
          <ChangePasswordMessageRequirementBullet>
            <ChangePasswordMessageRequirement>
              {t('minimumRequirement')}
            </ChangePasswordMessageRequirement>
          </ChangePasswordMessageRequirementBullet>
          <ChangePasswordMessageRequirementBullet>
            <ChangePasswordMessageRequirement>
              {t('characterRequirement')}
            </ChangePasswordMessageRequirement>
          </ChangePasswordMessageRequirementBullet>
          <ChangePasswordMessageRequirementBullet>
            <ChangePasswordMessageRequirement>
              {t('caseRequirement')}
            </ChangePasswordMessageRequirement>
          </ChangePasswordMessageRequirementBullet>
          <ChangePasswordMessageRequirementBullet>
            <ChangePasswordMessageRequirement>
              {t('spaceRequirement')}
            </ChangePasswordMessageRequirement>
          </ChangePasswordMessageRequirementBullet>
        </ChangePasswordMessageRequirements>
      </ChangePasswordMessageSection>
      <Divider />
      <FormSection>
        <ChangePasswordForm data-testid="change-password-form">
          <ChangePasswordFormControl>
            <ChangePasswordFormLabel>
              {t('currentPassword')}
            </ChangePasswordFormLabel>
            <DialogInput
              placeholder={t('currentPassword')}
              type="password"
              variant="outlined"
              fullWidth
              onChange={(e) => onPasswordFieldChange(e.currentTarget.value)}
              id="current-password-input"
            />
          </ChangePasswordFormControl>
          <ChangePasswordFormControl>
            <ChangePasswordFormLabel>
              {t('newPassword')}
            </ChangePasswordFormLabel>
            <DialogInput
              placeholder={t('newPassword')}
              type="password"
              variant="outlined"
              fullWidth
              onChange={(e) => onNewPasswordFieldChange(e.currentTarget.value)}
              id="new-password-input"
            />
          </ChangePasswordFormControl>
          <ChangePasswordStrengthBar
            password={newPasswordFieldValue}
            onChangeScore={onChangeScore}
          />
          <ChangePasswordFormControl>
            <ChangePasswordFormLabel>{t('rePassword')}</ChangePasswordFormLabel>
            <DialogInput
              placeholder={t('rePassword')}
              type="password"
              variant="outlined"
              fullWidth
              onChange={(e) =>
                onConfirmedPasswordFieldChange(e.currentTarget.value)
              }
              id="confirm-password-input"
            />
          </ChangePasswordFormControl>
        </ChangePasswordForm>
      </FormSection>
    </>
  )
}
