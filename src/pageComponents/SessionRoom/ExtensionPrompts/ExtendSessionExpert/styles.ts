import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

export const MainSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
`

export const IconSection = styled.div``

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const ActionSection = styled.div`
  display: flex;
  width: 100%;
`

export const UpcomingSessionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
  padding-top: ${({ theme }) => theme.spacing(2)};
`

export const HoursSection = styled.div`
  display: flex;
  white-space: pre;
`

export const HoursText = styled(Typography)`
  font-weight: bold;
`

export const DurationSection = styled.div`
  padding-top: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`
