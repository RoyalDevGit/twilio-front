import { FC, ReactNode } from 'react'

import {
  InformationContainer,
  InformationLabel,
  DeleteIconButton,
} from 'components/RemovableOption/styles'
import { CloseCircleIcon } from 'icons/Close'

export interface RemovableOptionProps {
  children: ReactNode
  onDelete?: () => unknown
}

export const RemovableOption: FC<RemovableOptionProps> = ({
  children,
  onDelete,
}) => {
  const optionContent =
    typeof children === 'string' ? (
      <InformationLabel data-testid="delete-option-content">
        {children}
      </InformationLabel>
    ) : (
      children
    )
  return (
    <InformationContainer>
      {optionContent}
      <DeleteIconButton id="delete-option-button" onClick={onDelete}>
        <CloseCircleIcon />
      </DeleteIconButton>
    </InformationContainer>
  )
}
