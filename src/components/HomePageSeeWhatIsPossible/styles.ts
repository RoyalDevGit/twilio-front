import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { Image } from 'components/Image'

export const SeeWhatIsPossibleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3.25)};
`

export const SeeWhatIsPossibleTitle = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 300;
`

export const SeeWhatIsPossibleBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${({ theme }) => theme.spacing(11.5)};
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    grid-template-columns: 2fr 1fr;
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing(5.5)};
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`

export const SeeWhatsIsPossibleImageContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  span {
    ${({ theme }) => theme.breakpoints.down('laptop')} {
      position: relative !important;
    }
  }
`

export const SeeWhatsIsPossibleImage = styled(Image)`
  position: relative !important;
  height: 100% !important;
  width: 100% !important;
`

export const SeeWhatsIsPossibleDescription = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: 210px 210px;
  gap: ${({ theme }) => theme.spacing(4)};
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    grid-template-columns: 1fr;
  }
`

export const SeeWhatsIsPossibleDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    flex-direction: row;
    align-items: center;
  }
`

export const SeeWhatsIsPossibleDescriptionLabel = styled.div``

export const SeeWhatsIsPossibleButton = styled(Button)`
  width: fit-content;
  height: 40px;
  align-self: flex-end;
  position: relative;
  ${({ theme }) => theme.breakpoints.up('laptopL')} {
    position: relative;
    bottom: 15px;
  }
`
