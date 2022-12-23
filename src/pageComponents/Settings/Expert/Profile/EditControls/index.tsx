import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import {
  EditControlsContainer,
  EditButton,
} from 'pageComponents/Settings/Expert/Profile/EditControls/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

interface EditControlProps {
  editing: boolean
  onEdit: () => unknown
  onCancel: () => unknown
  onSave: () => unknown
}

export const EditControls: FC<EditControlProps> = ({
  editing,
  onEdit,
  onCancel,
  onSave,
}) => {
  const { t } = useTranslation(LocaleNamespace.ExpertProfileSettings)

  return (
    <EditControlsContainer>
      {editing && (
        <>
          <EditButton variant="text" onClick={onCancel}>
            {t('cancel')}
          </EditButton>
          <EditButton variant="text" onClick={onSave}>
            {t('save')}
          </EditButton>
        </>
      )}
      {!editing && (
        <EditButton variant="text" onClick={onEdit}>
          {t('edit')}
        </EditButton>
      )}
    </EditControlsContainer>
  )
}
