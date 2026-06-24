import { use } from 'react'
import { ProductActions } from '@/actions'

export function StockCounter({ slug }: { slug: string }) {
  const stock = use(ProductActions.getStockBySlug(slug))

  return (
    <p>
      <span className='font-semibold'>Quedan:</span> {stock} unidades
    </p>
  )
}
