import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'

export const MainSection = styled.div`
  display: flex;
  align-items: self-end;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const CountryCodeInput = styled(TextField)`
  width: 20%;
`
