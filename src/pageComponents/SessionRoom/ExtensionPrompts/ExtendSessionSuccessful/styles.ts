import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

export const MainSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

export const IconSection = styled.div``

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const MessageSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing(1)};
`

export const NewEndTime = styled(Typography)`
  font-size: 0.813rem;
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing(0)};
`

export const StyledTime = styled(Typography)`
  font-size: 1rem;
  font-weight: 600;
`
