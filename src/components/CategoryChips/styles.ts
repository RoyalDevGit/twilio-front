import styled from '@emotion/styled'
import Chip, { ChipProps } from '@mui/material/Chip'
import { css } from '@emotion/react'

import {
  ArrowButtonContainer,
  MainContainer,
} from 'components/HorizontalScrollableContainer/styles'

export const TagsSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
  margin-top: ${({ theme }) => theme.spacing(2.5)};
  margin-bottom: ${({ theme }) => theme.spacing(2.5)};
  ${MainContainer} {
    width: 100%;
    ${({ theme }) => theme.breakpoints.down('laptop')} {
      ${ArrowButtonContainer} {
        display: none;
      }
    }
  }
`

interface CategoryChipProps extends ChipProps {
  selected?: boolean
}

export const CategoryChip = styled(Chip)<CategoryChipProps>`
  border-radius: 5px;
  font-size: 0.875rem;

  ${({ selected, theme }) =>
    selected &&
    css`
      background-color: ${theme.customComponents.filterComponent
        .filterChipSelected.styleOverrides.backgroundColor};
      color: #1a1a1a;

      &&:hover {
        background-color: ${theme.customComponents.filterComponent
          .filterChipSelected.styleOverrides.backgroundColor};
        color: #1a1a1a;
      }
    `}
`
