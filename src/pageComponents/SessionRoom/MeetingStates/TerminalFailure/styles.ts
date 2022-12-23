import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

export const SessionTerminalFailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SessionTerminalFailureSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 420px;
  height: 234px;
  background: #414157;
  border: 1px solid #000000;
  border-radius: 10px;
  padding-left: ${({ theme }) => theme.spacing(3)};
  padding-right: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    max-width: 395px;
  }
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    max-width: 335px;
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    max-width: 290px;
  }
`

export const SessionFailureNotification = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(1)};
`
