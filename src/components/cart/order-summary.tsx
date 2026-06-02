'use client'

import { Skeleton } from 'rsc-daisyui'
import { useShallow } from 'zustand/shallow'
import { useMounted, useShoppingCart } from '@/hooks'

export function OrderSummary() {
  const { mounted } = useMounted(4)
  const { total, subtotal, tax, totalItems } = useShoppingCart(useShallow((s) => s.getSummaryInformation()))

  if (!mounted) {
    return <Skeleton className='h-48 w-full rounded-box' />
  }

  return (
    <>
      <p>{total}</p>
      <p>{subtotal}</p>
      <p>{tax}</p>
      <p>{totalItems}</p>
    </>
  )
}
