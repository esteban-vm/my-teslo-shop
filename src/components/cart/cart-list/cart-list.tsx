'use client'

import { Skeleton } from 'rsc-daisyui'
import { ProductList } from '@/components/shop'
import { useMounted, useShoppingCart } from '@/hooks'
import { CartItem } from './cart-item'

export function CartList() {
  const { mounted } = useMounted(5)
  const cart = useShoppingCart((s) => s.cart)

  if (!mounted) {
    return <Skeleton text>Cargando carrito de compras</Skeleton>
  }

  return (
    <ProductList link='/' linkTitle='Continuar comprando' title='Agregar más artículos'>
      {cart.map((product) => (
        <CartItem key={`${product.slug}-${product.size}`} product={product} />
      ))}
    </ProductList>
  )
}
