import type { CartProduct } from '@/types'
import { ItemList } from '@/components/shared'
import { OrderItem } from './order-item'

export function OrderList({ products }: { products: CartProduct[] }) {
  return (
    <ItemList>
      {products.map((item) => (
        <OrderItem key={`${item.slug}-${item.size}`} product={item} />
      ))}
    </ItemList>
  )
}
