import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { Link } from 'components/Link'

export const ConsumerWizardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`

export const ConsumerWizardTitle = styled(Typography)`
  font-size: 1.75rem;
`

export const ConsumerWizardBody = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 280px);
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    grid-template-columns: repeat(4, 235px);
    gap: ${({ theme }) => theme.spacing(2)};
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    grid-template-columns: repeat(4, 173px);
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    grid-template-columns: repeat(2, 190px);
  }
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    grid-template-columns: 1fr;
  }
`
export interface ConsumerWizarLinkProps {
  disable: string
}

export const ConsumerWizardLink = styled(Link)<ConsumerWizarLinkProps>`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.text.primary};
  justify-self: center;
  width: 100%;

  ${({ disable }) =>
    disable === 'true' &&
    css`
      pointer-events: none;
      ${ConsumerWizardCard} {
        opacity: 0.5;
      }
    `}
`

export const ConsumerWizardCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 264px;
  height: 126px;

  background: ${({ theme }) =>
    theme.customComponents.consumerWizard.consumerWizardCardBackground
      .styleOverrides.background};
  border-radius: 5px;
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    width: 230px;
    height: 126px;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    width: 170px;
    height: 160px;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 183px;
    height: 160px;
  }
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    width: 100%;
    height: 160px;
  }
`

export const ConsumerWizardCardTitle = styled(Typography)`
  font-size: 1.063rem;
  font-weight: 600;
  text-align: center;
`
