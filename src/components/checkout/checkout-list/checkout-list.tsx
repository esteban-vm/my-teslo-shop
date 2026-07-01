'use client'

import { Skeleton } from 'rsc-daisyui'
import { ProductList } from '@/components/shop'
import { useMounted, useShoppingCart } from '@/hooks'
import { CheckoutItem } from './checkout-item'

export function CheckoutList() {
  const { mounted } = useMounted(5)
  const cart = useShoppingCart((s) => s.cart)

  if (!mounted) {
    return <Skeleton text>Cargando lista de artículos</Skeleton>
  }

  return (
    <ProductList link='/cart' linkTitle='Editar carrito' title='Ajustar elementos'>
      {cart.map((item) => (
        <CheckoutItem key={`${item.slug}-${item.size}`} product={item} />
      ))}
    </ProductList>
  )
}
