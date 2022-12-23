import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import VerifiedIcon from '@mui/icons-material/Verified'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Container from '@mui/material/Container'
import Popper, { PopperProps } from '@mui/material/Popper'

import { Button } from 'components/Button'
import { ExpertAvatar } from 'components/ExpertAvatar'
import { CategoryAutocomplete } from 'components/CategoryAutocomplete'
import { LanguageAutocomplete } from 'components/LanguageAutocomplete'

export const BannerHeaderContainer = styled.div`
  position: relative;
`
interface ExpertBannerProps {
  src?: string | null
}

export const ExpertBanner = styled.div<ExpertBannerProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-image: ${({ theme }) =>
      theme.customComponents.bannerGradient.expertBannerGradient.styleOverrides
        .background},
    url('${({ src }) => src}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 500px;
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    height: 316px;
  }
`

export const ExpertContainer = styled.div`
  position: relative;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    margin-bottom: ${({ theme }) => theme.spacing(5)};
  }
`

export const HeaderContainerBody = styled.div`
  position: relative;
  top: -400px;
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    top: -176px;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    top: -80px;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    top: 0px;
  }
`

export const ExpertAvatarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(5)};
  gap: ${({ theme }) => theme.spacing(4)};
  align-items: center;
  justify-items: center;
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    grid-template-columns: 2fr 1fr;
    justify-items: start;
    padding-left: ${({ theme }) => theme.spacing(8)};
    padding-right: ${({ theme }) => theme.spacing(8)};
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    grid-template-columns: 2fr 1fr;
    padding-left: ${({ theme }) => theme.spacing(4)};
    padding-right: ${({ theme }) => theme.spacing(4)};
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    padding-left: ${({ theme }) => theme.spacing(3)};
    padding-right: ${({ theme }) => theme.spacing(3)};
    gap: ${({ theme }) => theme.spacing(1)};
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`

export const ExpertLeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    justify-self: start;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
    justify-self: center;
  }
`
export const ExpertAvatarInfo = styled.div``

export const ExpertAvatarBox = styled(Box)`
  position: relative;
  top: 0px;
`

export const CustomExpertAvatar = styled(ExpertAvatar)`
  position: relative;
  top: 0px;

  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    width: 209px;
    height: 209px;
  }
`

export const HiddenFileInput = styled.input`
  display: none;
`

export const AvatarButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: ${({ theme }) => theme.spacing(2)};
  top: -10px;
`

export const AvatarButtons = styled(Button)<{ component?: string }>`
  font-size: 0.813rem;
  border: 1px solid;
  border-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: ${({ theme }) => theme.spacing(7.5)};
  color: ${({ theme }) => theme.palette.tertiary.main};
  padding: ${({ theme }) => theme.spacing(1.2)};
  width: 170px;
`

export const ExpertAvatarMain = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(1.25)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    align-items: center;
  }
`

export const ExpertAvatarIconBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.25)};
`

export const VerifiedExpert = styled(VerifiedIcon)`
  color: #3fa3ff;
  font-size: 0.813rem;
`

export const VerifiedExpertLabel = styled(Typography)`
  font-size: 0.813rem;
`

export const ExpertName = styled(Typography)`
  font-size: 2rem;
`

export const ExpertExpertiseArea = styled(Typography)`
  font-size: 1rem;
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    font-size: 0.875rem;
  }
`

export const ExpertAvatarSubtitle = styled(Typography)`
  font-size: 0.875rem;
`

export const ExpertRightSide = styled.div`
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    justify-self: end;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    justify-self: center;
  }
`

// BODY OF EDIT EXPERT PROFILE

export const ExpertEditProfileContainer = styled(Container)`
  position: relative;
  top: -320px;
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    top: -120px;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    top: -40px;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    top: 50px;
  }
`

export const ExpertBodySection = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: ${({ theme }) => theme.spacing(10)};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing(15)};
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    grid-template-columns: 1fr 3fr 1fr;
    gap: ${({ theme }) => theme.spacing(4)};
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    grid-template-columns: 1fr 3fr 1fr;
    gap: ${({ theme }) => theme.spacing(4)};
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    grid-template-columns: 1fr 2fr;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    grid-template-columns: 1fr;
  }
`

export const ExpertLeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing(2.5)};
  }
`

export const ExpertLeftPanelBox = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(0.75)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    align-items: center;
  }
`

export const ExpertTitle = styled(Typography)`
  font-size: 0.813rem;
`

export const EditContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1.5)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(2.5)};
  }
`

export const VerticalDivider = styled(Divider)`
  width: auto;
`

export const ExpertTitleInfo = styled(Typography)`
  font-size: 1rem;

  margin-top: ${({ theme }) => theme.spacing(0.75)};
`

export const ExpertMiddlePanel = styled.div``

export const ExpertDescriptionBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const ExpertDescription = styled(TextField)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

export const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing(2.75)};
  margin-bottom: ${({ theme }) => theme.spacing(2.75)};
  gap: ${({ theme }) => theme.spacing(1)};
`

export const TagsChipsBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  justify-content: space-between;
`

export const ChipsAutocomplete = styled(Autocomplete)`
  width: 100%;
`

export const TagsLabel = styled(Typography)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.tertiary.main};
  opacity: 0.5;
`

export const SmallAutocomplete = styled(Autocomplete)`
  && {
    .MuiAutocomplete-input {
      padding: 0;
      font-size: 0.875rem;
    }
  }
`

export const SmallLanguagesAutocomplete = styled(LanguageAutocomplete)`
  && {
    .MuiAutocomplete-input {
      padding: 0;
      font-size: 0.875rem;
    }
  }
`

export const SmallCategoriesAutocomplete = styled(CategoryAutocomplete)`
  && {
    .MuiAutocomplete-input {
      padding: 0;
      font-size: 0.875rem;
    }
  }
`

export const SmallTextField = styled(TextField)`
  && {
    .MuiInputBase-input {
      padding: ${({ theme }) => theme.spacing(1, 1.5)};
      font-size: 0.875rem;
    }
  }
`

export const AutocompleteSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const EditableList = styled.div``

export const EditableOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const DynamicCategoryPopper = styled((props: PopperProps) => (
  <Popper
    {...props}
    style={{
      width: 'fit-content',
      minWidth: '208px',
    }}
    placement="bottom-start"
  />
))``
