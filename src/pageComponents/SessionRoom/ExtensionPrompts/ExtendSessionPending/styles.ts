import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { SessionExtensionIcon } from 'icons/SessionExtension'

export const MainSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

export const IconSection = styled.div``

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const ActionSection = styled.div`
  display: flex;
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
export const ExtensionIconSpinner = styled(SessionExtensionIcon)`
  animation: ${spin} 1.5s infinite linear;
`
