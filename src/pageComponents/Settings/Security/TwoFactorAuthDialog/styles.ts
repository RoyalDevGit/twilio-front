import styled from '@emotion/styled'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'

export const TitleSection = styled.div`
  display: flex;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding-left: ${({ theme }) => theme.spacing(2)};
  }
`

export const NavigateBack = styled(IconButton)`
  margin-right: ${({ theme }) => theme.spacing(-3)};
`

export const DialogTitleMobile = styled(DialogTitle)`
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    font-size: 1.063rem;
    padding-left: ${({ theme }) => theme.spacing(3)};
  }
`

export const ActionsSection = styled(DialogActions)`
  padding: ${({ theme }) => theme.spacing(2.5, 2)};
`

export const ContentSection = styled(DialogContent)`
  padding: ${({ theme }) => theme.spacing(2, 0, 1, 0)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
  }
`

export const ErrorSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    text-align: center;
  }
`

export const ResendCodeSection = styled.div`
  display: flex;
  align-items: center;
`
