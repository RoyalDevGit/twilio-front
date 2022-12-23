import styled from '@emotion/styled'

export const LogoSection = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing(4)};
  top: ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    transform: scale(0.8);
    width: 100%;
    display: flex;
    justify-content: center;
    left: 0px;
  }
`

export const WatermarkSection = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing(0)};
  bottom: ${({ theme }) => theme.spacing(0)};

  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    transform: scale(0.7);
    margin-bottom: ${({ theme }) => theme.spacing(-9)};
    margin-right: ${({ theme }) => theme.spacing(-8)};
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    transform: scale(0.5);
    margin-bottom: ${({ theme }) => theme.spacing(-15)};
    margin-right: ${({ theme }) => theme.spacing(-12)};
  }
`
