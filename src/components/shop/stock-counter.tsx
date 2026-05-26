import { use } from 'react'
import { ProductActions } from '@/actions'

export interface StockCounterProps {
  slug: string
}

export function StockCounter({ slug }: StockCounterProps) {
  const stock = use(ProductActions.getStockBySlug({ slug }))

  return <p className='font-semibold'>Quedan: {stock} unidades</p>
}
