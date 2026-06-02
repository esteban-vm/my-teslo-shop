'use client'

import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { useShoppingCart } from '@/hooks'

export function OrderSummary() {
  const [mounted, setMounted] = useState(false)
  const { total, subtotal, tax, totalItems } = useShoppingCart(useShallow((s) => s.getSummaryInformation()))

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div>
      <p>{total}</p>
      <p>{subtotal}</p>
      <p>{tax}</p>
      <p>{totalItems}</p>
    </div>
  )
}
