import Divider from '@mui/material/Divider'
import { useTranslation } from 'next-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useMount } from 'react-use'
import { useState } from 'react'
import chunk from 'lodash/chunk'

import {
  CodeInstructions,
  CodeInstructionsSection,
  CodesSection,
  CodeToEnter,
  InstructionsSection,
  KeyPart,
  QrCode,
  QrCodeSection,
  SameDeviceInstructions,
  UserInstructions1,
  UserInstructions2,
} from 'pageComponents/Settings/Security/TwoFactorAuthDialog/Steps/QRCodeStep/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { AuthenticatorInfo } from 'interfaces/AuthenticatorInfo'
import { AuthApi } from 'apis/AuthApi'
import { Link } from 'components/Link'

export const QRCodeStep = () => {
  const { t } = useTranslation(LocaleNamespace.TwoFactorAuthenticationDialog)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))
  const [authenticatorInfo, setAuthenticatorInfo] = useState<
    AuthenticatorInfo | undefined
  >()

  useMount(() => {
    const loadData = async () => {
      const result = await AuthApi.getAuthenticatorAppInfo()
      const authAppInfo = await result.getData()
      setAuthenticatorInfo(authAppInfo)
    }
    loadData()
  })

  const securityKeyParts: string[] = []
  const securityKeyChars = authenticatorInfo?.secretKey.split('')

  if (securityKeyChars) {
    const groups = chunk(securityKeyChars, 4).map((group) => group.join(''))
    securityKeyParts.push(...groups)
  }

  return (
    <>
      <InstructionsSection>
        <UserInstructions1 variant="body1">
          {t('downloadApp')}
        </UserInstructions1>
        <UserInstructions2 variant="body1">{t('scanQrCode')}</UserInstructions2>
        {!isMobile && <Divider />}
      </InstructionsSection>

      <CodesSection>
        {!!authenticatorInfo && (
          <QrCodeSection>
            <QrCode
              src={authenticatorInfo.qrCodeUrl}
              width={180}
              height={180}
              alt="QR code"
            />
          </QrCodeSection>
        )}

        <CodeInstructionsSection>
          {isMobile && (
            <Link href={authenticatorInfo?.keyUri || ''}>
              <SameDeviceInstructions variant="body1">
                {t('sameDeviceInstructions')}
              </SameDeviceInstructions>
            </Link>
          )}
          <CodeInstructions variant="body1">
            {t('enterCodeInstructions')}
          </CodeInstructions>
          <CodeToEnter textTransform={'uppercase'}>
            {securityKeyParts.map((part) => (
              <KeyPart key={part}>{part}</KeyPart>
            ))}
          </CodeToEnter>
        </CodeInstructionsSection>
      </CodesSection>
    </>
  )
}
