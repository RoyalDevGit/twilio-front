import { FC, useCallback } from 'react'
// eslint-disable-next-line no-restricted-imports
import { ButtonProps as MuiButtonProps } from '@mui/material/Button'

import { StyledButton } from 'components/Button/styles'

export interface ButtonProps extends MuiButtonProps {
  state?: 'normal' | 'loading'
  className?: string
}

export const Button: FC<React.PropsWithChildren<ButtonProps>> = ({
  state = 'normal',
  children,
  onClick,
  disabled,
  className,
  ...props
}) => {
  const isLoading = state === 'loading'

  const clickHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading) {
        return
      }
      if (onClick) {
        onClick(e)
      }
    },
    [isLoading, onClick]
  )
  return (
    <StyledButton
      className={className}
      {...props}
      onClick={clickHandler}
      disabled={isLoading || disabled}
      disableElevation
    >
      {isLoading ? 'Please wait...' : children}
    </StyledButton>
  )
}
