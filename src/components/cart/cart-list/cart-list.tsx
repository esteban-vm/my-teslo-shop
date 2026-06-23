'use client'

import Link from 'next/link'
import { Button, List, Skeleton } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { useMounted, useShoppingCart } from '@/hooks'
import { CartItem } from './cart-item'

export function CartList() {
  const { mounted } = useMounted(5)
  const cart = useShoppingCart((s) => s.cart)

  if (!mounted) {
    return <Skeleton text>Cargando carrito de compras</Skeleton>
  }

  return (
    <Container $as={List}>
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
    </Container>
  )
}

const Container = tw.ul`mx-auto not-lg:max-w-xl border border-primary/25 p-2 lg:w-full`
