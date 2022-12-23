import styled from '@emotion/styled'
import { css } from '@emotion/react'
// eslint-disable-next-line no-restricted-imports
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'

interface ButtonProps extends MuiButtonProps {
  state?: 'normal' | 'loading'
}

export const StyledButton = styled(MuiButton)<ButtonProps>`
  ${({ state }) =>
    state === 'loading' &&
    css`
      opacity: 0.7;
    `}
`
