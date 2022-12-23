import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

export const InformationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(2)};
  }
`

export const InformationLabel = styled(Typography)`
  font-size: 1rem;
`

export const DeleteIconButton = styled(IconButton)`
  padding: 0px;
`
