import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  CancelButton,
  EditButton,
  EditControlsContainer,
} from 'pageComponents/Settings/EditControls/styles'

interface EditControlProps {
  value?: unknown
  editing: boolean
  onEdit: () => unknown
  onCancel: () => unknown
  onSave: () => unknown
}

export const EditControls: FC<EditControlProps> = ({
  value,
  editing,
  onEdit,
  onCancel,
  onSave,
}) => {
  const { t } = useTranslation(LocaleNamespace.Settings)

  return (
    <EditControlsContainer data-testid="edit-controls">
      {editing && (
        <>
          <EditButton
            variant="outlined"
            data-testid="edit-controls-save"
            color="primary"
            onClick={onSave}
          >
            {t('saveButtonLabel')}
          </EditButton>
          <CancelButton
            variant="text"
            data-testid="edit-controls-cancel"
            color="tertiary"
            onClick={onCancel}
          >
            {t('cancelButtonLabel')}
          </CancelButton>
        </>
      )}
      {!editing && (
        <EditButton
          variant="outlined"
          data-testid="edit-controls-edit"
          color="primary"
          onClick={onEdit}
        >
          {value ? t('editButtonLabel') : t('addButtonLabel')}
        </EditButton>
      )}
    </EditControlsContainer>
  )
}
