import { FC, ReactNode } from 'react'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  ActionSection,
  CardDetails,
  HeaderSection,
  PaymentInformationSection,
  PaymentMethodCardContainer,
  PaymentMethodCardContent,
  PaymentMethodDetailsSection,
  PreferredMethodLabel,
  PreferredMethodSection,
} from 'components/PaymentMethodCard/styles'
import { Button } from 'components/Button'
import { PaymentMethod } from 'interfaces/PaymentMethod'
import { AmexCardBigIcon } from 'icons/PaymentCards/Amex'
import { DinnersClubCardBigIcon } from 'icons/PaymentCards/DinnersClub'
import { DiscoverCardBigIcon } from 'icons/PaymentCards/Discover'
import { JcbCardBigIcon } from 'icons/PaymentCards/Jcb'
import { MasterCardBigIcon } from 'icons/PaymentCards/MasterCard'
import { UnionPayCardBigIcon } from 'icons/PaymentCards/UnionPay'
import { UnknownCardBigIcon } from 'icons/PaymentCards/UnknownCard'
import { VisaCardBigIcon } from 'icons/PaymentCards/Visa'

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod
  onDelete?: (paymentMethod: PaymentMethod) => unknown
  onMarkAsPreferred?: (paymentMethod: PaymentMethod) => unknown
}

export const PaymentMethodCard: FC<PaymentMethodCardProps> = ({
  paymentMethod,
  onDelete,
  onMarkAsPreferred,
}) => {
  const { t } = useTranslation(LocaleNamespace.PaymentMethodsPage)
  const { card } = paymentMethod

  if (!card) {
    return null
  }

  let logo: ReactNode = null
  switch (card.brand) {
    case 'amex':
      logo = <AmexCardBigIcon />
      break
    case 'diners':
      logo = <DinnersClubCardBigIcon />
      break
    case 'discover':
      logo = <DiscoverCardBigIcon />
      break
    case 'jcb':
      logo = <JcbCardBigIcon />
      break
    case 'mastercard':
      logo = <MasterCardBigIcon />
      break
    case 'unionpay':
      logo = <UnionPayCardBigIcon />
      break
    case 'visa':
      logo = <VisaCardBigIcon />
      break
    case 'unknown':
      logo = <UnknownCardBigIcon />
      break
  }

  return (
    <PaymentMethodCardContainer data-testid="payment-card">
      <PaymentMethodCardContent>
        <HeaderSection>
          {logo}
          <ActionSection>
            <Button
              variant="text"
              onClick={() => onDelete && onDelete(paymentMethod)}
              data-testid="delete-payment-method"
            >
              {t('remove')}
            </Button>
            {!paymentMethod.preferred && (
              <Button
                variant="text"
                onClick={() =>
                  onMarkAsPreferred && onMarkAsPreferred(paymentMethod)
                }
              >
                {t('markAsPreferred')}
              </Button>
            )}
          </ActionSection>
        </HeaderSection>
        <PaymentMethodDetailsSection>
          <PaymentInformationSection>
            <CardDetails variant="body1">{`${card.brand} ••••${card.last4} (${card.funding})`}</CardDetails>
            <Typography variant="body1">{`${card.expirationMonth}/${card.expirationYear}`}</Typography>
          </PaymentInformationSection>
          <PreferredMethodSection>
            {paymentMethod.preferred && (
              <PreferredMethodLabel>
                <Typography variant="body1">
                  {t('preferredPaymentMethodLabel')}
                </Typography>
              </PreferredMethodLabel>
            )}
          </PreferredMethodSection>
        </PaymentMethodDetailsSection>
      </PaymentMethodCardContent>
    </PaymentMethodCardContainer>
  )
}
