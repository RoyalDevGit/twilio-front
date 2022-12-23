import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { Image } from 'components/Image'
import { UserAvatar } from 'components/UserAvatar'

export const ProfileInformationStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`

export const ProfileInformationSubtitle = styled(Typography)``

export const ProfileInformationFormBox = styled.div``

export const ProfileInformationFormLabel = styled(Typography)`
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const ProfileInformationBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3.75)};
  align-items: center;
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    flex-direction: column;
  }
`

export const ProfileInformationIconBox = styled.div`
  width: 104px;
  height: 104px;
  background: ${({ theme }) =>
    theme.customComponents.expertWizard.expertWizardThumbnailBackground
      .styleOverrides.backgroundColor};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

export const ProfileInformationImage = styled(Image)`
  display: block;
`

export const ProfileAvatar = styled(UserAvatar)`
  .MuiAvatar-root {
    border-radius: 5px;
  }
`

export const ProfileInformationButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.25)};
`
export const HiddenFileInput = styled.input`
  display: none;
`

export const ProfileInformationButton = styled(Button)<{ component?: string }>`
  width: 215px;
`
export const ProfileInformationFileSizeLabel = styled(Typography)`
  opacity: 0.7;
`

export const ProfileInformationTextField = styled(TextField)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`
