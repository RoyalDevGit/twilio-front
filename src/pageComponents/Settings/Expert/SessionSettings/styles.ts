import styled from '@emotion/styled'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

export const SessionSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(2)};
  }
`
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
`

export const SessionSettingsTypography = styled(Typography)`
  font-size: 1.25rem;

  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    font-size: 1rem;
  }

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    font-size: 0.875rem;
  }
`

export const SessionSettingsDescription = styled(Typography)`
  font-size: 0.875rem;
  opacity: 0.7;
  width: 45%;

  ${({ theme }) => theme.breakpoints.down('fourK')} {
    width: 55%;
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    width: 65%;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    width: 100%;
  }
`

export const SessionDurationItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2.5)};

  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    gap: ${({ theme }) => theme.spacing(2)};
    align-items: flex-end;
  }
`
export const SessionSettingsInputLabel = styled(Typography)`
  font-size: 0.813rem;
`

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const PriceInput = styled.div`
  display: flex;
  flex-direction: column;
`

export const SmallTextField = styled(TextField)`
  width: 265px;
  && {
    .MuiInputBase-input {
      padding: ${({ theme }) => theme.spacing(1, 0)};
      font-size: 0.875rem;
    }
  }
`

export const HorizontalDivider = styled(Divider)`
  width: auto;

  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    margin-top: ${({ theme }) => theme.spacing(2)};
  }
`
