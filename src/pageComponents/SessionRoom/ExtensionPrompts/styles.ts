import styled from '@emotion/styled'

import { Button } from 'components/Button'

export const PositiveResponseButton = styled(Button)`
  width: 100%;
  background: white;
  border-radius: 0px;
  background: #3365ef;
  color: #ffffff;
`

export const NegativeResponseButton = styled(Button)`
  width: 100%;
  background: #25273b;
  border-radius: 0px;
  color: #ffffff;
`

export const SnackBody = styled.div`
  background-color: #293f98;
  padding: ${({ theme }) => theme.spacing(2)};
`

export const SnackHeader = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
  background-color: #293f98;
  padding: ${({ theme }) => theme.spacing(2, 0, 2, 2)};
`
