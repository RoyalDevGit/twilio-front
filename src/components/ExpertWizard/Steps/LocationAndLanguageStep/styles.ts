import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { LanguageAutocomplete } from 'components/LanguageAutocomplete'

export const LocationAndLanguagesTitle = styled(Typography)`
  font-size: 1.75rem;
  width: 65%;
`

export const LocationAndLanguagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: ${({ theme }) => theme.spacing(2)};
`

export const LocationAndLanguagesFormBox = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`
export const LocationTextField = styled(TextField)`
  && {
    .MuiInputBase-input {
      padding: ${({ theme }) => theme.spacing(1, 1.5)};
      font-size: 0.875rem;
    }
  }
`

export const LocationAndLanguagesFormLabel = styled(Typography)`
  // margin-bottom: ${({ theme }) => theme.spacing(0.5)};
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

export const CustomLanguageAutocomplete = styled(LanguageAutocomplete)`
  && {
    .MuiAutocomplete-input {
      padding: 0;
      font-size: 0.875rem;
    }
  }
`
