'use client'

import Link from 'next/link'
import { Button, List } from 'rsc-daisyui'
import { CartItem } from './cart-item'

export function CartList() {
  return (
    <List>
      <li className='px-4 pt-2'>
        <h2 className='font-semibold text-lg'>Agregar más artículos</h2>
      </li>
      <li className='px-4'>
        <Button as={Link} className='p-0' color='info' href='/' link size='sm'>
          Continúa comprando
        </Button>
      </li>
      <CartItem />
      <CartItem />
      <CartItem />
    </List>
  )
}
