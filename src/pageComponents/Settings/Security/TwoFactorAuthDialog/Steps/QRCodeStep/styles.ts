import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'

import { Image } from 'components/Image'

export const InstructionsSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const UserInstructions1 = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(0, 3)};
`

export const UserInstructions2 = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(1, 3, 2.5, 3)};
`

export const CodesSection = styled(DialogContent)`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
    align-items: center;
  }
`

export const QrCodeSection = styled.div`
  display: flex;
  width: 218px;
  height: 218px;
  justify-content: center;
  align-items: center;
  background-image: ${({ theme }) =>
    theme.customComponents.QRCodeStep.qrCodeSection.styleOverrides
      .backgroundImage};
`

export const QrCode = styled(Image)`
  border-radius: 3px;
`

export const KeyPart = styled.span`
  margin-right: 4px;
`

export const CodeInstructionsSection = styled(Container)`
  display: flex;
  flex-direction: column;
  border: ${({ theme }) =>
    theme.customComponents.QRCodeStep.codeInstructionsSection.styleOverrides
      .border};
  width: 216px;
  height: 216px;
  text-align: center;
  border-radius: 2px;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    border: 0;
    width: 100%;
  }
`

export const SameDeviceInstructions = styled(Typography)`
  font-weight: 600;
  font-size: 16px;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    margin-bottom: ${({ theme }) => theme.spacing(2.5)};
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

export const CodeInstructions = styled(Typography)`
  font-weight: 400;
  font-size: 13px;
  padding-top: ${({ theme }) => theme.spacing(2)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding-top: ${({ theme }) => theme.spacing(0)};
    font-size: 16px;
  }
`

export const CodeToEnter = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  padding: ${({ theme }) => theme.spacing(2)};
  word-break: break-all;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding: 0;
    color: ${({ theme }) =>
      theme.customComponents.QRCodeStep.codeToEnter.styleOverrides.color};
  }
`
