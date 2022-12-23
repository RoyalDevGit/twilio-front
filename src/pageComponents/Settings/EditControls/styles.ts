import styled from '@emotion/styled'

import { Button } from 'components/Button'

export const EditControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const EditButton = styled(Button)`
  font-size: 0.813rem;
  width: 84px;
  height: 40px;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 74px;
    height: 36px;
  }
`

export const CancelButton = styled(Button)`
  width: 84px;
  height: 40px;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 74px;
    height: 36px;
  }
`
