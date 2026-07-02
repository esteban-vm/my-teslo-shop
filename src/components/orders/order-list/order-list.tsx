import type { CartProduct } from '@/types'
import { ProductList } from '@/components/shop'
import { OrderItem } from './order-item'

export function OrderList({ products }: { products: CartProduct[] }) {
  return (
    <ProductList>
      {products.map((item) => (
        <OrderItem key={`${item.slug}-${item.size}`} product={item} />
      ))}
    </ProductList>
  )
}
