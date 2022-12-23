import styled from '@emotion/styled'

import { Button } from 'components/Button'

export const MobileCheckoutContainer = styled.div``

export const SheetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const BackButton = styled(Button)``

export const CancelButton = styled(Button)``

export const SheetBody = styled.div`
  padding: ${({ theme }) => theme.spacing(1)};
  height: 100%;
`
