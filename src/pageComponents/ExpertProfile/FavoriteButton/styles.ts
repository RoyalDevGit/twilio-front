import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { Button } from 'components/Button'

interface FavoriteToggleButtonProps {
  isfavorite: string
}
export const FavoriteToggleButton = styled(Button)<FavoriteToggleButtonProps>(
  ({ theme, isfavorite }) => css`
    width: 127px;
    max-height: 45px;
    font-weight: 600;

    ${theme.breakpoints.down('tablet')} {
      display: none;
    }

    && {
      ${isfavorite === 'true' &&
      css`
        background-color: ${theme.palette.tertiary.main};
        color: ${theme.customComponents.expertProfile.expertFavoriteButton
          .styleOverrides.color};
        ${theme.breakpoints.down('tablet')} {
          display: none;
        }
      `}
    }
  `
)
