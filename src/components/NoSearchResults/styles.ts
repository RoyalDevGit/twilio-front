import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { Image } from 'components/Image'
import { Link } from 'components/Link'

export const HeaderContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(6)};
  margin-bottom: ${({ theme }) => theme.spacing(5)};
  gap: ${({ theme }) => theme.spacing(5)};
`

export const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.25)};
`

export const SectionContainer = styled(Container)``

export const IndustryListSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(7.5)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`

export const IndustryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 381px;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
`

export const IndustryLink = styled(Link)``

export const SectionDivider = styled.div`
  background-color: ${({ theme }) => theme.palette.tertiary.main};
  opacity: 0.2;
  height: 1px;
  margin: ${({ theme }) => theme.spacing(3, 0)};
`

export const HeaderImage = styled(Image)``

export const SectionTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`
