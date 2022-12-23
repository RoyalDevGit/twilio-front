import { FC } from 'react'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'

import { Order } from 'interfaces/Order'
import { OrderCard } from 'pageComponents/Orders/OrderCard'
import { Grid } from 'components/Grid'
import {
  GridHeader,
  NoOrderButton,
  NoOrders,
  NoOrderTitle,
  OrdersGrid,
} from 'pageComponents/Orders/OrderGrid/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { CartIcon } from 'icons/Cart'

export interface OrderGridProps {
  orders?: Order[]
}
export const OrderGrid: FC<OrderGridProps> = ({ orders }) => {
  const { t } = useTranslation(LocaleNamespace.OrdersPage)

  if (orders?.length === 0) {
    return (
      <NoOrders>
        <CartIcon />
        <NoOrderTitle variant="h4">You do not have any orders.</NoOrderTitle>
        <NoOrderButton variant="outlined">Browse experts</NoOrderButton>
      </NoOrders>
    )
  }
  return (
    <>
      <GridHeader>
        <Typography variant="body1">{t('orderColumnLabel')}</Typography>
        <Typography variant="body1">{t('nameColumnLabel')}</Typography>
        <Typography variant="body1">{t('dateColumnLabel')}</Typography>
        <Typography variant="body1">{t('sessionTimeColumnLabel')}</Typography>
        <Typography variant="body1">{t('paymentTypeColumnLabel')}</Typography>
        <Typography variant="body1">{t('statusColumnLabel')}</Typography>
      </GridHeader>
      <OrdersGrid>
        {orders?.map((order) => (
          <Grid key={order.id}>
            <OrderCard order={order} />
          </Grid>
        ))}
      </OrdersGrid>
    </>
  )
}
