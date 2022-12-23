import styled from '@emotion/styled'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

export const FilterAccordionContainer = styled.div`
  height: 100%;
  flex: 1 1 auto;
  overflow: auto;
  background: ${({ theme }) =>
    theme.customComponents.expertProfile.expertMobileCheckoutSheet
      .styleOverrides.background};
`

export const CustomAccordion = styled(Accordion)`
  border-bottom: 1px solid;
  border-color: ${({ theme }) =>
    theme.customComponents.filterComponent.filterDividers.styleOverrides
      .borderColor};
  &:not(:last-child) {
    border-top: 0;
  }
  &:before {
    display: none;
  }
`

export const CustomAccordionSummary = styled(AccordionSummary)`
  .MuiAccordionSummary-content {
    justify-content: space-between;
  }
`

export const FilterByAccordionTitle = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 500;
`

export const CustomAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
`

export const CustomFormControlLabel = styled(FormControlLabel)`
  border-bottom: 1px solid;
  border-color: ${({ theme }) =>
    theme.customComponents.filterComponent.filterDividers.styleOverrides
      .borderColor};
  &:not(:last-child) {
    border-top: 0;
  }
  &:before {
    display: none;
  }
  &:last-child {
    border-bottom: 0;
  }
`

export const DrawerFilterFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) =>
    theme.customComponents.expertProfile.expertMobileCheckoutSheet
      .styleOverrides.background};
  padding: ${({ theme }) => theme.spacing(2)};
  flex: 0;
`
