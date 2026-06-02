'use client'

import { useShallow } from 'zustand/shallow'
import { useMounted, useShoppingCart } from '@/hooks'
import { SkeletonLoader } from '../shared'

export function OrderSummary() {
  const { mounted } = useMounted(4)
  const { total, subtotal, tax, totalItems } = useShoppingCart(useShallow((s) => s.getSummaryInformation()))

  if (!mounted) {
    return <SkeletonLoader text='Cargando resumen de orden' />
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
