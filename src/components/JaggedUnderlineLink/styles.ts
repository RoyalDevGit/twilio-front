import styled from '@emotion/styled'

import { Link } from 'components/Link'

export const LoginLinkContainer = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`

export const CustomLink = styled(Link)`
  color: ${({ theme }) => theme.palette.primary.main};
`
