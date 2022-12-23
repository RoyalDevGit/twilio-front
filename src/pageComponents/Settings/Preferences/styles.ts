import styled from '@emotion/styled'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'

import { LanguageAutocomplete } from 'components/LanguageAutocomplete'

export const PreferencesPageContainer = styled.div`
  max-width: 610px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
`

export const PreferencesPageTitle = styled(Typography)`
  font-weight: 500;
`

export const PreferencesPageInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const InputActionsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const PreferencesInputLabel = styled(Typography)`
  font-weight: 500;
  font-size: 0.813rem;
  color: ${({ theme }) =>
    theme.customComponents.consumerAccount.consumerAccountInputLabel
      .styleOverrides.color};
`

export const SwitchBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

export const CustomSelect = styled(Select)`
  &.MuiOutlinedInput-root {
    width: 193px;
    height: 40px;
  }
`

export const CustomLanguageAutocomplete = styled(LanguageAutocomplete)`
  width: 193px;
`
