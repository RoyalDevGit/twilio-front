import styled from '@emotion/styled'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

import { Button } from 'components/Button'
import { RatePerHour } from 'components/RatePerHour'
import { CostLabel, RatePerHourContainer } from 'components/RatePerHour/styles'
import { Image } from 'components/Image'

export const BookASessionButton = styled(Button)`
  width: 100%;
  transition-duration: 0.7s;
  transition-property: background-color;
  font-size: 0.75rem;
`

export const FeaturedExpertCardContainer = styled(Card)`
  position: relative;
  min-width: 264px;
  min-height: 368px;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    ${BookASessionButton} {
      background-color: #ffffff;
    }
    ${({ theme }) => theme.breakpoints.up('laptop')} {
      img {
        transform: scale(1.1);
      }
    }
  }
`

export const GradientContainer = styled.div`
  max-width: 264px;
  max-height: 368px;
  border-radius: 5px;

  :after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.6811318277310925) 20%,
      rgba(0, 0, 0, 0.4682466736694678) 35%,
      rgba(0, 0, 0, 0.1685267857142857) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`

export const ExpertCardMedia = styled(Image)`
  position: relative;
  transition: transform 0.5s ease;
  object-fit: cover;
`

export const FeaturedExpertIcon = styled(IconButton)`
  position: absolute;
  padding: ${({ theme }) => theme.spacing(0)};
  top: ${({ theme }) => theme.spacing(2)};
  right: ${({ theme }) => theme.spacing(2)};
`

export const ExpertInformationContainer = styled(CardContent)`
  position: absolute;
  width: 100%;
  bottom: -14px;
  display: flex;
  flex-direction: column;
`

export const ExpertName = styled(Typography)`
  font-size: 1.25rem;
  color: #ffffff;
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`

export const ExpertiseTitle = styled(Typography)`
  font-size: 0.813rem;
  color: #ffffff;
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`

export const RatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

export const VerticalDivider = styled(Divider)`
  max-height: 16px;
  border-color: #ffffff;
`

export const CustomRatePerHour = styled(RatePerHour)`
  &${RatePerHourContainer} {
    color: #ffffff;
  }
  ${CostLabel} {
    color: #ffffff;
  }
`

export const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.4)};
  color: ${({ theme }) =>
    theme.customComponents.miniStarRating.ratingContainer.styleOverrides.color};
`

export const RatingValue = styled(Typography)`
  font-size: 1rem;
  color: ${({ theme }) =>
    theme.customComponents.miniStarRating.ratingValue.styleOverrides.color};
`

export const RatingCountSection = styled(Typography)`
  font-size: 1rem;
  color: #ffffff;
`
export const Count = styled.span`
  color: #ffffff;
  text-decoration: underline;
`
