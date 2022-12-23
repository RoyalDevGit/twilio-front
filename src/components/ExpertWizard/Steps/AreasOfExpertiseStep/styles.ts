import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { CategoryAutocomplete } from 'components/CategoryAutocomplete'

export const AreasOfExpertiseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`

export const AreasOfExpertiseFormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const AreasOfExpertiseFormLabel = styled(Typography)`
  // margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`

export const ExpertiseAutocomplete = styled(CategoryAutocomplete)`
  && {
    .MuiAutocomplete-input {
      padding: 0;
      font-size: 0.875rem;
    }
  }
`

export const EditableOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-top: ${({ theme }) => theme.spacing(2.5)};
`

export const EditableOptionsBox = styled.div`
  padding: ${({ theme }) => theme.spacing(1)};
  border: 1px solid;
  border-color: ${({ theme }) =>
    theme.customComponents.globalSearch.button.borderColor};
  border-radius: 4px;
`
