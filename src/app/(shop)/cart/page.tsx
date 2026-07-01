import type { Metadata } from 'next'
import { BuyNow, CartList } from '@/components/cart'
import { PageTitle } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Mi Carrito',
}

export default function CartPage() {
  return (
    <>
      <PageTitle title='Mi carrito' />
      <section data-shop>
        <div className='lg:col-span-2'>
          <CartList />
        </div>
        <div>
          <BuyNow />
        </div>
      </section>
    </>
  )
}
