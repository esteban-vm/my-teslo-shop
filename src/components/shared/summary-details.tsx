import type { OrderSummary } from '@/types'
import { Card } from 'rsc-daisyui'
import { formatProductPrice } from '@/lib/helpers'

export function SummaryDetails({ summary }: { summary: OrderSummary }) {
  const { total, subtotal, tax, totalItems } = summary

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
