import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'

export const StyledAutocomplete = styled(Autocomplete)`
  .MuiOutlinedInput-root {
    padding: ${({ theme }) => theme.spacing(0)} !important;
  }

  .MuiOutlinedInput-root .MuiAutocomplete-input {
    padding: ${({ theme }) => theme.spacing(1.5, 0, 1.5, 1.5)};
  }
`

export const SearchButton = styled(Button)`
  height: 47px;
  ${({ theme }) => {
    const { background, borderStyle, borderColor, borderWidth, borderRadius } =
      theme.customComponents.globalSearch.button
    return css`
      background: ${background};
      border-style: ${borderStyle};
      border-color: ${borderColor};
      border-width: ${borderWidth};
      border-radius: ${borderRadius};
    `
  }};
`

export const ExpertOption = styled.div`
  display: flex;
  align-items: flex-start;

  gap: ${({ theme }) => theme.spacing(1)};
`

export const ExpertOptionAvatarSection = styled.div``

export const ExpertOptionDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const ExpertName = styled.div``

export const ExpertMainExpertise = styled(Typography)`
  opacity: 0.6;
  line-height: 0;
  margin-top: ${({ theme }) => theme.spacing(0.5)};
`

export const SubcategoryOption = styled.div`
  display: flex;
  align-items: center;

  gap: ${({ theme }) => theme.spacing(2)};
  margin-left: ${({ theme }) => theme.spacing(2)};
`

export const SubcategoryOptionDetails = styled.div`
  display: flex;
  align-items: center;
  white-space: pre;
`

export const SubcategoryTitle = styled(Typography)``

export const ParentCategoryTitle = styled(Typography)`
  opacity: 0.6;
  position: relative;
  top: 1px;
`

export const SearchSubmitButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(-1)};
  margin-bottom: ${({ theme }) => theme.spacing(10)};
`
