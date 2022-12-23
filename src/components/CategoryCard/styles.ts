import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Card from '@mui/material/Card'
import Typography, { TypographyProps } from '@mui/material/Typography'

import { Image } from 'components/Image'

export const CategoryCardContainer = styled(Card)`
  position: relative;
  width: 264px;
  height: 162px;
  border-radius: 5px;
  background-color: white;
  transition: all 0.7s;
  box-shadow: none;

  :hover {
    img {
      ${({ theme }) => theme.breakpoints.up('laptop')} {
        transform: scale(1.1);
      }
    }
  }
  > span:first-of-type {
    position: absolute !important;
    right: 0;

    top: -20px;
  }
`

export const CategoryCardMedia = styled(Image)`
  position: absolute;
  transition: transform 0.5s ease;
  z-index: 0;
`

export const CategoryCardMediaDefault = styled(Image)`
  position: absolute;
  transition: transform 0.5s ease;
  z-index: 0;
  height: 100%;
  width: 100%;
`

export const CategoryCardContent = styled.div`
  position: relative;
  margin-left: ${({ theme }) => theme.spacing(1.5)};
  margin-top: ${({ theme }) => theme.spacing(1.25)};
  max-width: 220px;
  white-space: pre-wrap;
`

export const CategoryCardText = styled(Typography)`
  font-size: 0.813rem;
  font-weight: 700;
  color: #1a1a1a;
`

interface ExpertiseTextProps extends TypographyProps {
  chartcount: number
}

export const ExpertiseText = styled(Typography)<ExpertiseTextProps>`
  ${({ chartcount }) => {
    if (chartcount >= 15 && chartcount <= 20) {
      return css`
        width: 112px;
        white-space: break-spaces;
      `
    }
    return css`
      width: fit-content;
    `
  }};
  font-size: 1.25rem;
  font-weight: 400;
  color: #1a1a1a;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: ${({ theme }) => theme.spacing(0, 1, 0, 0)};
`
