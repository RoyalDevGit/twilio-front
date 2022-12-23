import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'

export const FavoritesContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(5)};
  margin-bottom: ${({ theme }) => theme.spacing(5)};
`

export const FavoritesTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: ${({ theme }) => theme.spacing(1)};
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    padding-left: ${({ theme }) => theme.spacing(0)};
  }
`

export const FavoritesTitle = styled(Typography)`
  font-size: 1.75rem;
`

export const MobileFilterButton = styled(Button)`
  width: 150px;
  ${({ theme }) => theme.breakpoints.up('laptop')} {
    display: none;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`

export const DrawerFilterButton = styled(Button)`
  width: 150px;
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    display: none;
  }
`

export const FavoritesBody = styled.div`
  margin-top: ${({ theme }) => theme.spacing(5)};
`

export const BodyGrid = styled.div``

export const ChildrenContainer = styled.div``
