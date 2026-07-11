'use client'

import { Skeleton } from 'rsc-daisyui'
import { ItemList } from '@/components/shared'
import { useCartStore, useMounted } from '@/hooks'
import { CheckoutItem } from './checkout-item'

export function CheckoutList() {
  const { mounted } = useMounted(5)
  const cart = useCartStore((s) => s.cart)

  if (!mounted) {
    return <Skeleton text>Cargando lista de artículos</Skeleton>
  }

  return (
    <ItemList link='/cart' linkTitle='Editar carrito' title='Ajustar elementos'>
      {cart.map((item) => (
        <CheckoutItem key={`${item.slug}-${item.size}`} product={item} />
      ))}
    </ItemList>
  )
}
