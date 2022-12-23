import styled from '@emotion/styled'

import { Button } from 'components/Button'

export const EditControlsContainer = styled.div`
  display: flex;

  && > * {
    margin-right: ${({ theme }) => theme.spacing(1)};
    :last-child {
      margin-right: 0;
    }
  }
`

export const EditButton = styled(Button)`
  font-size: 0.813rem;

  padding: 0;
  min-width: 0;
  color: ${({ theme }) => theme.palette.primary.main};
`
