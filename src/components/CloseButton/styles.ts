import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'

export const ButtonSection = styled(IconButton)`
  position: absolute;
  z-index: 1;
  top: ${({ theme }) => theme.spacing(0.25)};
  right: ${({ theme }) => theme.spacing(1.25)};
  svg {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`
