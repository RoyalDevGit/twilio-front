import styled from '@emotion/styled'
import DialogContent from '@mui/material/DialogContent'

export const ContentSection = styled(DialogContent)`
  display: flex;
  justify-content: center;
`

export const AuthCodeControl = styled.div`
  div {
    display: flex;
    gap: 16px;

    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  input {
    width: 64px;
    height: 66px;
    background: ${({ theme }) =>
      theme.customComponents.codeVerificationDialog.authCodeSection.input
        .styleOverrides.background};
    border: ${({ theme }) =>
      theme.customComponents.codeVerificationDialog.authCodeSection.input
        .styleOverrides.border};

    border-radius: 3px;
    color: ${({ theme }) =>
      theme.customComponents.codeVerificationDialog.authCodeSection.input
        .styleOverrides.color};
    font-size: 2.375rem;
    font-weight: 300;
    text-align: center;
  }
`
export const AuthCodeSectionMobile = styled.div`
  width: 100%;
`
