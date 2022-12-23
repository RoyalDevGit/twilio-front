import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

export const LoginAndSignupWallpaperContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: relative;
`

export const LoginAndSignupWallpaperTextContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
  color: #ffffff;
`

export const LoginAndSignupHeading = styled(Typography)`
  font-size: 2rem;
  font-weight: 600;
`
export const LoginAndSignupDescriptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: start;
  justify-content: flex-start;
`

export const LoginAndSignupDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const Description = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 400;
  width: 65%;
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    width: 75%;
  }
`
