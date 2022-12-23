import IMask from 'imask'
import { useRef } from 'react'
import { useMount, useUpdateEffect } from 'react-use'

export interface UseMaskOptions {
  mask: string
  value: string
}

export const useMask = ({ mask, value }: UseMaskOptions) => {
  const maskRef = useRef<IMask.MaskedPattern<string>>()
  useMount(() => {
    maskRef.current = IMask.createMask({
      mask,
    })
    maskRef.current.resolve(value)
  })

  useUpdateEffect(() => {
    if (!maskRef.current) {
      return
    }
    maskRef.current.resolve(value)
  }, [value])

  return maskRef.current?.value || value
}
