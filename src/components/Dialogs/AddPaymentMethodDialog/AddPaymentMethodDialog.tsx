import { ChangeEvent, FC, FormEventHandler, useCallback, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import { PaymentMethod, PaymentMethodStatus } from 'interfaces/PaymentMethod'
import { ResponsiveDialog } from 'components/ResponsiveDialog'
import { CloseCircleIcon } from 'icons/Close'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { PaymentMethodApi } from 'apis/PaymentMethodApi'
import { FormError } from 'components/Form/Error'
import {
  StripePaymentElement,
  useStripePaymentElement,
} from 'components/StripePaymentElement'
import { Button } from 'components/Button'
import { DialogTitleAndClose } from 'components/DialogTitleAndClose'
import { CustomDialogContent } from 'components/Dialogs/AddPaymentMethodDialog/styles'

export interface AddPaymentMethodDialogProps extends DialogProps {
  paymentMethod: PaymentMethod
  onSave?: (paymentMethod: PaymentMethod) => unknown | (() => unknown)
}

const AddPaymentMethodDialog: FC<AddPaymentMethodDialogProps> = ({
  onClose,
  onSave,
  paymentMethod,
  ...props
}) => {
  const { t } = useTranslation(LocaleNamespace.AddPaymentMethodDialog)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [preferred, setPreferred] = useState(false)
  const { stripe, elements, initialized, onInitialize } =
    useStripePaymentElement()

  const closeHandler = () => {
    if (!onClose) {
      return
    }
    onClose({}, 'escapeKeyDown')
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault()
      try {
        setIsSaving(true)
        setError(null)

        if (!stripe || !elements) {
          return
        }

        const result = await stripe.confirmSetup({
          elements,
          redirect: 'if_required',
        })
        if (result.error) {
          if (result.error.type !== 'validation_error') {
            setError(result.error.message || null)
          }
        } else {
          const stripePaymentMethodId = result.setupIntent
            .payment_method as string
          const updateResult = await PaymentMethodApi.update(paymentMethod.id, {
            stripePaymentMethodId,
            status: PaymentMethodStatus.Ready,
            preferred: preferred,
          })
          if (updateResult.ok()) {
            if (onSave) {
              onSave(await updateResult.getData())
            }
            closeHandler()
          } else {
            const apiError = await updateResult.getError()
            setError(apiError.message)
          }
        }
      } finally {
        setIsSaving(false)
      }
    },
    [preferred, initialized, stripe, elements]
  )

  const handlePreferredChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPreferred(event.target.checked)
  }

  return (
    <ResponsiveDialog {...props} onClose={onClose}>
      <form
        noValidate
        onSubmit={handleSubmit}
        autoComplete="off"
        id="payment-form"
      >
        <DialogTitleAndClose>
          <Typography variant="subtitle1" component="h2">
            {t('paymentMethodDialogTitle')}
          </Typography>
          <IconButton onClick={closeHandler}>
            <CloseCircleIcon />
          </IconButton>
        </DialogTitleAndClose>
        <CustomDialogContent dividers>
          <StripePaymentElement
            clientSecret={paymentMethod.stripeSetupIntentClientSecret}
            onInitialize={onInitialize}
          />
          {initialized && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={preferred}
                    onChange={handlePreferredChange}
                    id="payment-mark-as-preferred"
                  />
                }
                label={t('markAsPreferredMethod') as string}
              />
              {error && (
                <FormError data-testid="payment-error">{error}</FormError>
              )}
            </>
          )}
        </CustomDialogContent>
        {initialized && (
          <DialogActions>
            <Button onClick={closeHandler}>{t('cancel')}</Button>
            <Button
              state={isSaving ? 'loading' : 'normal'}
              type="submit"
              disabled={!stripe}
              id="payment-save-button"
            >
              {t('save')}
            </Button>
          </DialogActions>
        )}
      </form>
    </ResponsiveDialog>
  )
}

export default AddPaymentMethodDialog
