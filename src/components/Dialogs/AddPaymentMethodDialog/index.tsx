/* eslint-disable import/no-default-export */
import { FC } from 'react'
import dynamic from 'next/dynamic'

import { AddPaymentMethodDialogProps } from 'components/Dialogs/AddPaymentMethodDialog/AddPaymentMethodDialog'

const AddPaymentMethodDialog = dynamic(() => import('./AddPaymentMethodDialog'))

/**
 * The Stripe / React Library hoists any references to it at the top of the page and loads the Stripe script in the dom.
 * Even if the component that is referencing Stripe doesn't render on the page, the Stripe API will fire and force the script to be loaded.
 * We had an instance where stripe was being loaded on every page because a global component was using Stripe
 * We don't want that so we are using dynamic importing to fix this.
 *
 * Next.js supports lazy loading external libraries with import() and React components with next/dynamic.
 * Deferred loading helps improve the initial loading performance by decreasing the amount of JavaScript necessary to render the page.
 * Components or libraries are only imported and included in the JavaScript bundle when they're used.
 * https://nextjs.org/docs/advanced-features/dynamic-import
 */

const AddPaymentMethodDialogWrapper: FC<AddPaymentMethodDialogProps> = (
  props: AddPaymentMethodDialogProps
) => <AddPaymentMethodDialog {...props} />

export default AddPaymentMethodDialogWrapper
