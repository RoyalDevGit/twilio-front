import styled from '@emotion/styled'

import { Button } from 'components/Button'

export const AuthenticationSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(1)};
  padding-right: ${({ theme }) => theme.spacing(1.5)};
`

export const SignUpWithEmailButton = styled(Button)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px 1px rgb(84 83 83 / 10%);
  margin-bottom: ${({ theme }) => theme.spacing(1.875)};
  :hover {
    background-color: white;
  }
  svg {
    left: 5px;
    position: relative;
  }
  .MuiTypography-root {
    font-weight: bold;
    color: #3365ef;
    width: 100%;
    position: relative;
    right: 10px;
  }
`
