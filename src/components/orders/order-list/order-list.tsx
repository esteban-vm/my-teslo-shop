'use client'

import { Skeleton } from 'rsc-daisyui'
import { ProductList } from '@/components/shop'
import { useMounted, useShoppingCart } from '@/hooks'
import { OrderItem } from './order-item'

export function OrderList() {
  const { mounted } = useMounted(2)
  const cart = useShoppingCart((s) => s.cart)

  if (!mounted) {
    return <Skeleton text>Cargando lista de artículos</Skeleton>
  }

  return (
    <ProductList>
      {cart.map((item) => (
        <OrderItem key={`${item.slug}-${item.size}`} product={item} />
      ))}
    </ProductList>
  )
}
