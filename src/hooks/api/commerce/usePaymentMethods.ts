import { PaymentMethodApi } from 'apis/PaymentMethodApi'
import { useApiPagination, UsePaginationOptions } from 'hooks/useApiPagination'
import { PaymentMethod, PaymentMethodStatus } from 'interfaces/PaymentMethod'

export const usePaymentMethods = (
  props?: Partial<UsePaginationOptions<PaymentMethod>>
) => {
  const paymentMethodPagination = useApiPagination<PaymentMethod>({
    ...props,
    dataFetcher: async (page, limit) => {
      const result = await PaymentMethodApi.query({
        page,
        limit,
        status: [PaymentMethodStatus.Ready],
      })

      const paginationResult = await result.getData()
      return paginationResult
    },
  })

  return paymentMethodPagination
}
