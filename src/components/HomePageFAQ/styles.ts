import styled from '@emotion/styled'
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'

export const HomePageFAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const HomePageFAQTitle = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 300;
`

export const HomePageFAQBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const HomePageFAQAccordion = styled(Accordion)`
  background-color: ${({ theme }) =>
    theme.customComponents.homePageFAQ.homePageAccordionColor.styleOverrides
      .backgroundColor};
  border: ${({ theme }) =>
    theme.customComponents.homePageFAQ.homePageAccordionColor.styleOverrides
      .border};
  box-shadow: none;
  border-radius: 5px;
`

export const HomePageFAQLabel = styled.div`
  font-weight: 600;
  font-size: 1.375rem;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    font-size: 1.125rem;
  }
`
