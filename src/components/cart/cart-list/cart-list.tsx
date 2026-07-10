'use client'

import { Skeleton } from 'rsc-daisyui'
import { ItemList } from '@/components/shared'
import { useMounted, useShoppingCart } from '@/hooks'
import { CartItem } from './cart-item'

export function CartList() {
  const { mounted } = useMounted(5)
  const cart = useShoppingCart((s) => s.cart)

  if (!mounted) {
    return <Skeleton text>Cargando carrito</Skeleton>
  }

  return (
    <ItemList link='/' linkTitle='Continuar comprando' title='Agregar más artículos'>
      {cart.map((item) => (
        <CartItem key={`${item.slug}-${item.size}`} product={item} />
      ))}
    </ItemList>
  )
}
