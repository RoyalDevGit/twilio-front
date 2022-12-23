import { FC } from 'react'

import { CloseCircleIcon } from 'icons/Close'
import { ButtonSection } from 'components/CloseButton/styles'

export interface CloseButtonProps {
  onClickClose: () => void
}

export const CloseButton: FC<React.PropsWithChildren<CloseButtonProps>> = ({
  onClickClose,
}) => (
  <ButtonSection onClick={onClickClose}>
    <CloseCircleIcon />
  </ButtonSection>
)
