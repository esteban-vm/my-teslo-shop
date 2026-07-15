import type { Metadata } from 'next'
import { BuyNow, CartList } from '@/components/cart'
import { PageTitle } from '@/components/shared'

const title = 'Mi carrito'

export const metadata: Metadata = { title }

export default function CartPage() {
  return (
    <>
      <PageTitle title={title} />
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
