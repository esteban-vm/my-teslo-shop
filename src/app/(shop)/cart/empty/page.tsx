import type { Metadata } from 'next'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Button } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'

export const metadata: Metadata = {
  title: 'Carrito vacío',
}

export default function EmptyPage() {
  return (
    <PageContainer>
      <CartIcon $as={ShoppingCart} />
      <InnerContainer>
        <h1 className='font-semibold text-lg text-warning'>Carrito de compras vacío</h1>
        <Button as={Link} className='p-0 hover:opacity-75' color='info' href='/' link size='sm'>
          Ir a comprar ahora
        </Button>
      </InnerContainer>
    </PageContainer>
  )
}

const PageContainer = tw.div`-translate-1/2 absolute top-1/2 left-1/2 flex flex-col items-center md:flex-row md:gap-4`
const InnerContainer = tw.div`flex flex-col items-center text-center font-montserrat md:items-start`
const CartIcon = tw.svg`size-14 fill-error/25 stroke-error motion-safe:animate-bounce`
