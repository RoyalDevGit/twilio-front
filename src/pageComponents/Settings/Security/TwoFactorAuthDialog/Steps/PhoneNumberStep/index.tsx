import Divider from '@mui/material/Divider'
import { useTranslation } from 'next-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

import {
  InformationSection,
  LastParagraph,
  LearnMore,
  PhoneNumberLabel,
  PhoneSection,
} from 'pageComponents/Settings/Security/TwoFactorAuthDialog/Steps/PhoneNumberStep/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Link } from 'components/Link'
import { PhoneNumberInput } from 'components/PhoneNumberInput'
import { PhoneNumber } from 'interfaces/PhoneNumber'

interface PhoneNumberStepProps {
  phoneNumber: PhoneNumber | undefined | null
  onChange: (phoneNumber: PhoneNumber) => unknown
}

export const PhoneNumberStep: FC<PhoneNumberStepProps> = ({
  phoneNumber,
  onChange,
}) => {
  const { t } = useTranslation(LocaleNamespace.TwoFactorAuthenticationDialog)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  return (
    <>
      <PhoneSection>
        <Typography variant="h6">{t('addPhoneHeader')}</Typography>
        <PhoneNumberLabel>{t('phoneNumberLabel')}</PhoneNumberLabel>
        <PhoneNumberInput value={phoneNumber} onChange={onChange} />
      </PhoneSection>
      {!isMobile && <Divider />}
      <InformationSection>
        <Typography variant="body1">{t('phoneNumberInformation1')}</Typography>
        <LastParagraph>
          <Typography variant="body1">
            {t('phoneNumberInformation2')}
            <Link href="">
              <LearnMore>{t('learnMore')}</LearnMore>
            </Link>
          </Typography>
        </LastParagraph>
      </InformationSection>
    </>
  )
}
