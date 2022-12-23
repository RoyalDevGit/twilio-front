import styled from '@emotion/styled'
import MuiTextField from '@mui/material/TextField'

export const TextField = styled(MuiTextField)`
  .MuiOutlinedInput-root {
    height: 48px;
    input {
      padding: ${({ theme }) => theme.spacing(1.6)};
    }
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    .MuiOutlinedInput-root {
      height: 40px;
      input {
        padding: ${({ theme }) => theme.spacing(1.1)};
      }
    }
  }
`
