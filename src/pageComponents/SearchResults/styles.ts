import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'

export const SearchResultsContainer = styled(Container)``

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(3)};
`

export const SearchResultsHeader = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 400;
`

export const StyledDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
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

export const ResultsContainer = styled.div``
