import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

interface StyledBadgeProps {
  textColor: string
  backgroundColor: string
  pulsate: boolean
}

export const StyledBadge = styled.span<StyledBadgeProps>(
  ({ theme, textColor, backgroundColor, pulsate }) => {
    const pulse = keyframes`
    0% {
      box-shadow: 0 0 0 0px ${rgba(backgroundColor, 0.4)};
    }
    100% {
      box-shadow: 0 0 0 10px ${rgba(backgroundColor, 0)};
    }
  `
    return css`
      font-size: 13px;
      font-weight: 500;
      border-radius: 40px;
      text-transform: uppercase;
      color: ${textColor};
      background-color: ${backgroundColor};
      box-shadow: 0px 0px 1px 1px ${backgroundColor};
      animation: ${pulsate
        ? css`
            ${pulse} 2s infinite
          `
        : 'none'};
      padding: ${theme.spacing(0.2, 0.8)};
    `
  }
)
