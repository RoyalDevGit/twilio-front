import styled from '@emotion/styled'

import { Link } from 'components/Link'

interface Clickable {
  isclickable: string
}
export const ClickableLink = styled(Link)<Clickable>`
  cursor: ${({ isclickable }) =>
    isclickable === 'true' ? 'pointer' : 'default'};
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};
  :hover {
    color: ${({ theme }) => theme.palette.primary.main};
    transition: all 0.3s 0s ease;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    transition: none;
  }
`
export const NonClickContainer = styled.div``
