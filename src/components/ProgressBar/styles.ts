import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

export const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const ProgressBarBox = styled.div`
  width: 130px;
`

export const ProgressBarLabel = styled(Typography)`
  font-size: 0.813rem;
  color: ${({ theme }) => theme.palette.text.primary};
`
