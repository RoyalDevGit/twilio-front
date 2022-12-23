import styled from '@emotion/styled'

export const ScheduleStepContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(5)};
  .MuiAccordionSummary-content {
    display: flex;
    gap: 10px;
  }
  .MuiAccordion-root {
    background: ${({ theme }) =>
      theme.customComponents.consumerWizard.consumerWizardCardBackground
        .styleOverrides.background};
  }
`
