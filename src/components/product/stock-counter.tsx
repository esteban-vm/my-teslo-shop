import { use } from 'react'
import { getStockBySlug } from '@/actions/product'

export function StockCounter(props: { slug: string }) {
  const { data: stock = 0 } = use(getStockBySlug(props))

  return (
    <p>
      <span className='font-semibold'>Quedan:</span> {stock} unidades
    </p>
  )
}
