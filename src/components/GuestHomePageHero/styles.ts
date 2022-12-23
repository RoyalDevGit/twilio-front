import styled from '@emotion/styled'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { SearchAutocomplete } from 'components/Header/SearchAutocomplete'
import { StyledAutocomplete } from 'components/Header/SearchAutocomplete/styles'

export const GuestUserHomePageContainer = styled.div`
  ${({ theme }) => theme.breakpoints.up('fourK')} {
    margin-left: 10%;
  }
`

export const GuestUserHomePageHeaderBox = styled.div`
  display: flex;
  z-index: 5;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3.125)};
  padding-left: ${({ theme }) => theme.spacing(2)};
  padding-right: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  text-align: center;

  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    width: 70%;
    text-align: left;
    margin-left: ${({ theme }) => theme.spacing(-6)};
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    width: 65%;
    margin-left: ${({ theme }) => theme.spacing(-6)};
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 100%;
    margin-left: ${({ theme }) => theme.spacing(0)};
    margin-bottom: ${({ theme }) => theme.spacing(-16.125)};
    margin-top: ${({ theme }) => theme.spacing(4)};
  }
`

export const GuestUserHomePageWelcomeLabel = styled.div`
  font-weight: 300;
  font-size: 2.375rem;
  color: ${({ theme }) => theme.palette.text.primary};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    font-size: 2rem;
    text-align: center;
  }
`

export const GuestUserPopularTagsLabel = styled(Typography)`
  font-weight: 600;
  font-size: 1.063rem;
`

export const GuestUserPopularTags = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    gap: ${({ theme }) => theme.spacing(1)};
  }
`

export const PopularCategoryChip = styled(Chip)`
  border-radius: 45px;
  font-size: 0.875rem;
`

export const SearchSubmitButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(-1)};
  margin-bottom: ${({ theme }) => theme.spacing(10)};
`

export const CustomAutocomplete = styled(SearchAutocomplete)`
  &${StyledAutocomplete} {
    max-width: 925px;
    width: 100%;
  }
`
