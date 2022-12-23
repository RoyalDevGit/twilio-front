import styled from '@emotion/styled'

import { SnackBody } from 'pageComponents/SessionRoom/ExtensionPrompts/styles'

export const MainSection = styled(SnackBody)`
  display: flex;
  background: #25273b;
  gap: ${({ theme }) => theme.spacing(1.5)};
`
