import type { OrderSummary } from '@/schemas/order'
import { Card } from 'rsc-daisyui'
import { formatPrice } from '@/lib/products'

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
          Subtotal:<span className='float-end'>{formatPrice(subtotal)}</span>
        </p>
        <p>
          Impuestos (15%):<span className='float-end'>{formatPrice(tax)}</span>
        </p>
        <p className='mt-1 font-semibold text-base'>
          Total:<span className='float-end'>{formatPrice(total)}</span>
        </p>
      </div>
    </>
  )
}
