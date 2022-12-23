import styled from '@emotion/styled'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { CategoryAutocomplete } from 'components/CategoryAutocomplete'
import { RemovableOption } from 'components/RemovableOption'
import { UserAvatar } from 'components/UserAvatar'

export const AccountInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    max-width: 610px;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    max-width: none;
  }
`

export const AccountInformationTitle = styled(Typography)`
  font-weight: 500;
`

export const ProfileAvatarContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3.75)};
  align-items: center;

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    flex-direction: column;
  }
`

export const ProfileAvatar = styled(UserAvatar)`
  .MuiAvatar-root {
    border-radius: 5px;
  }
`

export const AccountInformationButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
`
export const HiddenFileInput = styled.input`
  display: none;
`

export const AccountInformationButton = styled(Button)<{ component?: string }>`
  width: 177px;
`

export const ResetImageButton = styled(Button)`
  min-width: 0px;
  padding: 0px;
`

export const AccountInformationFileSizeLabel = styled(Typography)`
  opacity: 0.7;
`

export const GeneralInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`

export const AccountInformationInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`

export const InputActionsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing(2.5)};

    div[class*='EditControlsContainer'] {
      flex-direction: row;
      justify-content: flex-start;
      .MuiButtonBase-root {
        height: 32px;
      }
    }
  }
`

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.625)};
`

export const AccountInputLabel = styled(Typography)`
  font-weight: 500;
  font-size: 0.813rem;
  color: ${({ theme }) =>
    theme.customComponents.consumerAccount.consumerAccountInputLabel
      .styleOverrides.color};
`

export const SmallTextField = styled(TextField)`
  width: 260px;
  && {
    .MuiInputBase-input {
      padding: ${({ theme }) => theme.spacing(1, 1.5)};
      font-size: 0.875rem;
    }
  }
`

export const AutoCompleteTextField = styled(TextField)`
  width: 260px;
  && {
    .MuiInputBase-input {
      padding: ${({ theme }) => theme.spacing(1, 1.5)};
      font-size: 0.875rem;
      height: 0px;
    }
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(2.5)};
  }
`

export const BlueInputLabel = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.primary.main};
  cursor: pointer;
`

export const ExpertInterests = styled.div`
  margin-top: ${({ theme }) => theme.spacing(7.5)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    max-width: 610px;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    max-width: none;
  }
`

export const AccountInformationBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const AccountInformationActionsBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(3)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2.5)};
  }
`

export const SectionWithTitle = styled.div`
  margin-top: ${({ theme }) => theme.spacing(7.5)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    max-width: 610px;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    max-width: none;
  }
`
export const SectionWithTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const AccountInformationDialog = styled(Dialog)`
  position: absolute;
  .MuiPaper-root {
    width: 402px;
  }
`

export const CloseDialogIcon = styled(IconButton)`
  position: absolute;
  right: 10px;
  top: 10px;
`

export const CategoriesAutocomplete = styled(CategoryAutocomplete)`
  && {
    .MuiAutocomplete-input {
      padding: 0;
      font-size: 0.875rem;
    }
  }
`

export const EditableList = styled.div``

export const EditableOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const AutocompleteSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

export const UserTitleInfo = styled(Typography)`
  font-size: 1rem;
  margin-top: ${({ theme }) => theme.spacing(0.75)};
`

export const RemovableAreaOfInterest = styled(RemovableOption)`
  .MuiButtonBase-root {
    margin-left: ${({ theme }) => theme.spacing(2)};
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(2.5)};
  }
`

export const SocialMediaPageTitle = styled(Typography)`
  font-weight: 500;
`

export const SocialMediaPageSubtitle = styled(Typography)`
  opacity: 0.8;
`

export const SocialMediaPageInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
`

export const SocialMediaPageInputLabel = styled(Typography)`
  font-weight: 500;
  font-size: 0.813rem;
  color: ${({ theme }) =>
    theme.customComponents.consumerAccount.consumerAccountInputLabel
      .styleOverrides.color};
`
