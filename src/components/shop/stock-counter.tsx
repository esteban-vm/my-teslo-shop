import { use } from 'react'
import { getStockBySlug } from '@/actions/product'

export function StockCounter({ slug }: { slug: string }) {
  const stock = use(getStockBySlug(slug))

  return (
    <p>
      <span className='font-semibold'>Quedan:</span> {stock} unidades
    </p>
  )
}
