import type { Metadata } from 'next'
import { CartList, OrderSummary } from '@/components/cart'
import { PageTitle } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Mi Carrito',
}

export default function CartPage() {
  return (
    <>
      <PageTitle title='Mi carrito' />
      <div className='my-3 grid gap-3 px-4 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <CartList />
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </>
  )
}
