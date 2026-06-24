import { use } from 'react'
import { Product } from '@/actions'

export function StockCounter({ slug }: { slug: string }) {
  const stock = use(Product.getStockBySlug(slug))

  return (
    <p>
      <span className='font-semibold'>Quedan:</span> {stock} unidades
    </p>
  )
}
