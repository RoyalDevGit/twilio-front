import styled from '@emotion/styled'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'

export const MainSection = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

export const ContentSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
  justify-content: center;
  padding-left: ${({ theme }) => theme.spacing(6)};

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    width: 55%;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 100%;
    padding-left: ${({ theme }) => theme.spacing(2)};
  }
`

export const MainTitle = styled(Typography)`
  font-size: 2.375rem;
  font-weight: 300;
  line-height: 1.25;
`

export const DescriptionText = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 400;
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`

export const StyledButton = styled(Button)`
  width: fit-content;
  background-color: #ffffff;
  color: #3365ef;
`

export const MobileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding-top: ${({ theme }) => theme.spacing(4.5)};
  background-color: ${({ theme }) =>
    theme.customComponents.guestHomePageFooter.mobileSection.styleOverrides
      .backgroundColor};
`

export const StyledDivider = styled.div`
  background-color: ${({ theme }) =>
    theme.customComponents.guestHomePageFooter.styledDivider.styleOverrides
      .backgroundColor};
  height: 8px;
  margin-top: ${({ theme }) => theme.spacing(-5)};
`

export const SupportLinksSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
  height: ${({ theme }) => theme.spacing(9)};
  padding-top: ${({ theme }) => theme.spacing(1.5)};
  padding-left: ${({ theme }) => theme.spacing(2.5)};
`

export const SupportLink = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 1rem;
  font-weight: 500;
`

export const VerticalDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.spacing(0)};
  margin-bottom: ${({ theme }) => theme.spacing(0)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  border-width: ${({ theme }) => theme.spacing(0.089)};
  height: 1.5rem;
  background-color: #8ca4ba;
`
