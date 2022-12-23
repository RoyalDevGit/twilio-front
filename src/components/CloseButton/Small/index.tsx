import { FC } from 'react'

import { SmallCloseIcon } from 'icons/Close/small'
import { ButtonSection } from 'components/CloseButton/Small/styles'

export interface CloseButtonProps {
  onClickClose: () => void
}

export const SmallCloseButton: FC<
  React.PropsWithChildren<CloseButtonProps>
> = ({ onClickClose }) => (
  <ButtonSection onClick={onClickClose}>
    <SmallCloseIcon />
  </ButtonSection>
)
