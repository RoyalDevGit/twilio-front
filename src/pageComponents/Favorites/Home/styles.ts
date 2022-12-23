import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'

export const FavoriteExpertsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const FavoritesEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3)};
  text-align: center;
`

export const FavoritesEmptyStateLabelBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1)};
  text-align: center;
`

export const FavoritesEmptyStateLabel = styled(Typography)`
  font-weight: 500;
  font-size: 1.5rem;
`

export const FavoritesEmptyStateDescription = styled(Typography)`
  max-width: 484px;
`

export const EmptyStateButton = styled(Button)``
