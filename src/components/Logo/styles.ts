import styled from '@emotion/styled'

export const LogoContainer = styled.span`
  display: inline-flex;
  align-items: center;
`

export const LogoMark = styled.span`
  margin-right: ${({ theme }) => theme.spacing(0.75)};
`

export const LogoText = styled.span`
  position: relative;
  top: ${({ theme }) => theme.spacing(0.25)};
`
