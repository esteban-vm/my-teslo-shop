import type { Metadata } from 'next'
import { ShoppingCart } from 'lucide-react'
import NextLink from 'next/link'
import { Link } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'

const title = 'Carrito vacío'

export const metadata: Metadata = { title }

export default function EmptyPage() {
  return (
    <PageContainer>
      <CartIcon $as={ShoppingCart} />
      <InnerContainer>
        <PageTitle>{title}</PageTitle>
        <NextLink href='/' passHref>
          <Link as='span' className='font-geist font-semibold text-sm' color='info' hover>
            Ir a comprar ahora
          </Link>
        </NextLink>
      </InnerContainer>
    </PageContainer>
  )
}

const PageContainer = tw.div`flex h-full min-h-144 flex-col items-center justify-center md:flex-row md:gap-4`
const InnerContainer = tw.div`flex flex-col items-center text-center font-montserrat md:items-start`
const PageTitle = tw.h1`font-semibold text-lg text-warning`
const CartIcon = tw.svg`size-12 fill-error/25 stroke-error motion-safe:animate-bounce md:size-14`
