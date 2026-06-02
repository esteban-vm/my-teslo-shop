'use client'

import Link from 'next/link'
import { Button, List } from 'rsc-daisyui'
import { SkeletonLoader } from '@/components/shared'
import { useMounted, useShoppingCart } from '@/hooks'
import { CartItem } from './cart-item'

export function CartList() {
  const { mounted } = useMounted(5)
  const cart = useShoppingCart((s) => s.cart)

  if (!mounted) {
    return <SkeletonLoader text='Cargando carrito de compras' />
  }

  return (
    <List>
      <li className='px-4 pt-2'>
        <h2 className='font-semibold text-lg'>Agregar más artículos</h2>
      </li>
      <li className='px-4'>
        <Button as={Link} className='p-0 hover:opacity-75' color='info' href='/' link size='sm'>
          Continuar comprando
        </Button>
      </li>
      {cart.map((product) => (
        <CartItem key={`${product.slug}-${product.size}`} product={product} />
      ))}
    </List>
  )
}
