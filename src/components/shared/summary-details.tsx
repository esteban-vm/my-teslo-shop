'use client'

import type { OrderSummary } from '@/types'
import { Card } from 'rsc-daisyui'
import { useShallow } from 'zustand/shallow'
import { useShoppingCart } from '@/hooks'
import { formatProductPrice } from '@/lib/helpers'

export function SummaryDetails({ savedSummary }: { savedSummary?: OrderSummary }) {
  const storedSummary = useShoppingCart(useShallow((s) => s.getOrderSummary()))
  const summaryDetails = savedSummary ?? storedSummary
  const { total, subtotal, tax, totalItems } = summaryDetails

  return (
    <>
      <Card.Title>Resumen de orden</Card.Title>
      <div>
        <p>
          Nro. de artículos:
          <span className='float-end'>{totalItems}</span>
        </p>
        <p>
          Subtotal:<span className='float-end'>{formatProductPrice(subtotal)}</span>
        </p>
        <p>
          Impuestos (15%):<span className='float-end'>{formatProductPrice(tax)}</span>
        </p>
        <p className='mt-1 font-semibold text-base'>
          Total:<span className='float-end'>{formatProductPrice(total)}</span>
        </p>
      </div>
    </>
  )
}
