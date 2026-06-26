'use client'

import Link from 'next/link'
import { Button, List, Skeleton } from 'rsc-daisyui'
import { useMounted, useShoppingCart } from '@/hooks'
import { CheckoutItem } from './checkout-item'

export function CheckoutList() {
  const { mounted } = useMounted(5)
  const cart = useShoppingCart((s) => s.cart)

  if (!mounted) {
    return <Skeleton text>Cargando lista de compra</Skeleton>
  }

  return (
    <List>
      <li className='px-4 pt-2'>
        <h2 className='font-semibold text-lg'>Ajustar elementos</h2>
      </li>
      <li className='px-4'>
        <Button as={Link} className='p-0 hover:opacity-75' color='info' href='/cart' link size='sm'>
          Editar carrito
        </Button>
      </li>
      {cart.map((product) => (
        <CheckoutItem key={`${product.slug}-${product.size}`} product={product} />
      ))}
    </List>
  )
}
