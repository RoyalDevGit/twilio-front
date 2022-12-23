import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

const BadgeContainer = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
`

const VerifiedExpertLabel = styled(Typography)`
  font-size: 0.813rem;
`

export const VerifiedExpertBadge = () => {
  const { t } = useTranslation(LocaleNamespace.VerifiedExpertBadge)
  return (
    <BadgeContainer>
      <VerifiedExpertLabel variant="body2">
        {t('verifiedExpert')}
      </VerifiedExpertLabel>
    </BadgeContainer>
  )
}
