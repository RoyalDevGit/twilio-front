import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { DateTime } from 'luxon'
import { useDebounce, useMount, useUpdateEffect } from 'react-use'

import { useRouter } from 'hooks/useRouter'
import {
  useExpertAvailability,
  ExpertAvailabilityHook,
  UseExpertAvailabilityOptions,
} from 'hooks/api/expert/useExpertAvailability'
import {
  Order,
  OrderItem,
  OrderItemStatus,
  OrderItemType,
  SessionOrderItem,
} from 'interfaces/Order'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { getCurrentTimeZone } from 'utils/date/getCurrentTimeZone'
import { Expert } from 'interfaces/Expert'
import { OrderApi } from 'apis/OrderApi'
import { RequestResult } from 'apis/BaseApi'
import { isInstantSessionOrder } from 'utils/commerce/isInstantSessionOrder'

export const SAVE_DEBOUNCE = 300

interface UseSessionCheckoutProps extends UseExpertAvailabilityOptions {
  expert?: Expert | null
  order?: Order | null
  onOrderSave?: (order: Order) => unknown | (() => unknown)
  isGuest?: boolean
  initAutoSave?: boolean
  autoLoadOrder?: boolean
}

export interface SessionCheckoutHook extends ExpertAvailabilityHook {
  processingError: string | null
  isProcessing: boolean
  order?: Order | null
  refreshOrder: () => void
  updateOrder: (updateData: Partial<Order>) => Promise<Order | undefined>
  processOrder: () => Promise<RequestResult<Order> | undefined>
  saveOrder: () => Promise<Order | undefined>
  resumeAutoSave: () => void
  pauseAutoSave: () => void
  onPaymentMethodChange: (paymentMethodId: string) => void
  reset: () => void
  isUpdating: boolean
  isInstantSession: boolean
  setIsInstantSession: Dispatch<SetStateAction<boolean>>
  setRedirectOnOrderSave: Dispatch<SetStateAction<boolean>>
  notes: string
  setNotes: Dispatch<SetStateAction<string>>
  isGuest?: boolean
  createOrUpdateOrder: () => Promise<Order>
}

export const useSessionCheckout = ({
  expert,
  from,
  to,
  selectedDate,
  selectedDuration,
  selectedInstantSessionDuration,
  selectedTimeSlotId,
  order: initialOrder,
  autoLoadOrder,
  initAutoSave,
  isGuest,
}: UseSessionCheckoutProps): SessionCheckoutHook => {
  const router = useRouter()
  const [processingError, setProcessingError] = useState<string | null>(null)
  const [autoSave, setAutoSave] = useState(
    initAutoSave !== undefined ? initAutoSave : true
  )
  const [isProcessing, setIsProcessing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isInstantSession, setIsInstantSession] = useState(
    initialOrder ? isInstantSessionOrder(initialOrder) : false
  )
  const user = useCurrentUserAsserted()

  const expertAvailability = useExpertAvailability(expert, {
    from,
    to,
    selectedDate,
    selectedDuration,
    selectedInstantSessionDuration,
    selectedTimeSlotId,
  })
  const [order, setOrder] = useState<Order | undefined | null>(initialOrder)
  const [refreshBit, setRefreshBit] = useState(false)
  const [redirectOnOrderSave, setRedirectOnOrderSave] = useState(false)
  const [notes, setNotes] = useState('')

  const goToCheckout = () => {
    router.push('/checkout')
  }

  const refreshOrder = useCallback(() => {
    setRefreshBit(!refreshBit)
  }, [refreshBit])

  const loadOrder = async () => {
    if (isGuest) {
      return
    }
    const order = await getCurrentOrder()
    if (order) {
      applyOrder(order)
    }
  }

  useMount(() => {
    if (initialOrder) {
      applyOrder(initialOrder)
      return
    }
    if (autoLoadOrder) {
      loadOrder()
    }
  })

  useUpdateEffect(() => {
    loadOrder()
  }, [refreshBit])

  const updateOrder = useCallback(
    async (updateData: Partial<Order>) => {
      if (!order?.id) {
        return
      }
      try {
        setIsUpdating(true)
        const updateResult = await OrderApi.update(order.id, updateData)
        const updatedOrder = await updateResult.getData()
        setOrder(updatedOrder)

        return updatedOrder
      } finally {
        setIsUpdating(false)
      }
    },
    [order]
  )

  const applyOrder = (order: Order) => {
    setOrder(order)
    if (!order?.items?.length) {
      return
    }
    const sessionItem = order.items[0] as OrderItem<SessionOrderItem>
    if (sessionItem.data.startDate) {
      const selectedDate = DateTime.fromISO(sessionItem.data.startDate.date)
      expertAvailability.setSelectedDate(selectedDate)
    }

    if (sessionItem.data.duration) {
      if (sessionItem.data.instant) {
        expertAvailability.setSelectedInstantSessionDuration(
          sessionItem.data.duration
        )
      } else {
        expertAvailability.setSelectedDuration(sessionItem.data.duration)
      }
    }
    if (sessionItem.data.timeSlotId) {
      expertAvailability.setSelectedTimeSlotId(sessionItem.data.timeSlotId)
    }
    setIsInstantSession(sessionItem.data.instant)
    setNotes(sessionItem.data.notes || '')
  }

  const saveOrder = useCallback(async () => {
    if (!expert || !expertAvailability.availability || isGuest) {
      return
    }

    const userTimeZone = user?.settings.timeZone || getCurrentTimeZone()
    if (isInstantSession) {
      if (!expertAvailability.selectedInstantSessionDuration) {
        return
      }

      const duration = expertAvailability.availability.instant.durations.find(
        (d) => d.minutes === expertAvailability.selectedInstantSessionDuration
      )
      if (!duration) {
        return
      }

      const sessionOrderItem: OrderItem<SessionOrderItem> = {
        status: OrderItemStatus.Unfulfilled,
        itemType: OrderItemType.Session,
        totalPrice: {
          currencyCode: duration.price.currencyCode,
          amount: duration.price.amount,
        },
        data: {
          startDate: {
            timeZone: userTimeZone,
            date: DateTime.now().toUTC().toISO(),
          },
          timeSlotId: expertAvailability.selectedTimeSlotId,
          duration: expertAvailability.selectedInstantSessionDuration,
          expert: expert.id,
          consumer: user.id,
          instant: true,
          notes,
        },
      }
      const updatedOrder = await updateOrder({
        items: [sessionOrderItem],
      })

      if (redirectOnOrderSave) {
        goToCheckout()
      }

      return updatedOrder
    }

    if (!expertAvailability.selectedDate) {
      return
    }

    if (!expertAvailability.selectedDuration) {
      return
    }

    if (!expertAvailability.selectedTimeSlotId) {
      return
    }

    const timeSlot = expertAvailability.availability.timeSlots.find(
      (ts) => ts.id === expertAvailability.selectedTimeSlotId
    )
    if (!timeSlot) {
      return
    }

    const sessionOrderItem: OrderItem<SessionOrderItem> = {
      status: OrderItemStatus.Unfulfilled,
      itemType: OrderItemType.Session,
      totalPrice: {
        currencyCode: timeSlot.price.currencyCode,
        amount: timeSlot.price.amount,
      },
      data: {
        startDate: {
          timeZone: userTimeZone,
          date: DateTime.fromISO(timeSlot.startDate).toUTC().toISO(),
        },
        timeSlotId: expertAvailability.selectedTimeSlotId,
        duration: expertAvailability.selectedDuration,
        expert: expert.id,
        consumer: user.id,
        instant: false,
        notes,
      },
    }
    const updatedOrder = await updateOrder({
      items: [sessionOrderItem],
    })

    if (redirectOnOrderSave) {
      goToCheckout()
    }

    return updatedOrder
  }, [
    expertAvailability.selectedDate,
    expertAvailability.selectedDuration,
    expertAvailability.selectedTimeSlotId,
    expertAvailability.selectedInstantSessionDuration,
    isInstantSession,
    notes,
    redirectOnOrderSave,
    expert,
  ])

  useDebounce(
    () => {
      if (!autoSave) {
        return
      }
      saveOrder()
    },
    SAVE_DEBOUNCE,
    [
      saveOrder,
      autoSave,
      expertAvailability.selectedDate,
      expertAvailability.selectedDuration,
      expertAvailability.selectedTimeSlotId,
      expertAvailability.selectedInstantSessionDuration,
      isInstantSession,
      notes,
    ]
  )

  const createOrUpdateOrder = async () => {
    resumeAutoSave()
    const currentOrderResult = await OrderApi.getCurrent()
    if (!currentOrderResult.ok()) {
      const apiError = await currentOrderResult.getError()
      throw apiError
    }
    const currentOrder = await currentOrderResult.getData()
    if (currentOrder) {
      setOrder(currentOrder)
      return currentOrder
    }
    const orderResult = await OrderApi.create()
    if (!orderResult.ok()) {
      const apiError = await orderResult.getError()
      throw apiError
    }
    const newOrder = await orderResult.getData()
    await applyOrder(newOrder)
    return newOrder
  }

  const getCurrentOrder = async () => {
    const currentOrderResult = await OrderApi.getCurrent()
    if (!currentOrderResult.ok()) {
      const apiError = await currentOrderResult.getError()
      throw apiError
    }
    const currentOrder = await currentOrderResult.getData()
    if (currentOrder) {
      return currentOrder
    }
    return null
  }

  const processOrder = async () => {
    if (!order) {
      return
    }
    try {
      setIsProcessing(true)
      setProcessingError(null)

      const processResult = await OrderApi.process(order.id)
      if (processResult.ok()) {
        const updatedOrder = await processResult.getData()
        setOrder(updatedOrder)
      } else {
        const apiError = await processResult.getError()
        setProcessingError(apiError.message)
      }
      return processResult
    } finally {
      setIsProcessing(false)
    }
  }

  const resumeAutoSave = () => {
    setAutoSave(true)
  }

  const pauseAutoSave = () => {
    setAutoSave(false)
  }

  const onPaymentMethodChange = (paymentMethodId: string) => {
    updateOrder({
      paymentMethod: paymentMethodId,
    })
  }

  const reset = () => {
    setProcessingError(null)
    setIsProcessing(false)
    expertAvailability.reset()
    refreshOrder()
  }

  return {
    ...expertAvailability,
    processingError,
    isProcessing,
    order,
    refreshOrder,
    updateOrder,
    processOrder,
    saveOrder,
    resumeAutoSave,
    pauseAutoSave,
    onPaymentMethodChange,
    reset,
    isUpdating,
    isInstantSession,
    setIsInstantSession,
    setRedirectOnOrderSave,
    notes,
    setNotes,
    createOrUpdateOrder,
  }
}
