import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

export const SessionExpiredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SessionExpiredHeader = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    text-align: center;
  }
`

export const ActionSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(5)};
`

export const CircularProgressSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  position: relative;
  top: -290px;
  right: 422px;

  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    top: 0px;
    right: 0px;
    margin-bottom: ${({ theme }) => theme.spacing(5)};
  }
`
