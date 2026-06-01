'use client'

import Link from 'next/link'
import { Button, List } from 'rsc-daisyui'
import { useShoppingCart } from '@/hooks'
import { CartItem } from './cart-item'

export function CartList() {
  const cart = useShoppingCart((s) => s.cart)

  return (
    <List>
      <li className='px-4 pt-2'>
        <h2 className='font-semibold text-lg'>Agregar más artículos</h2>
      </li>
      <li className='px-4'>
        <Button as={Link} className='p-0 hover:opacity-75' color='info' href='/' link size='sm'>
          Continúa comprando
        </Button>
      </li>
      {cart.map((product) => (
        <CartItem key={`${product.slug}-${product.size}`} product={product} />
      ))}
    </List>
  )
}
