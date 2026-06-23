import type { Metadata } from 'next'
import { CartList, OrderSummary } from '@/components/cart'
import { PageTitle } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Carrito de compras',
}

export default function CartPage() {
  return (
    <>
      <PageTitle title='Mi carrito' />
      <div className='my-3 grid gap-3 lg:grid-cols-3'>
        <div className='px-4 lg:col-span-2'>
          <CartList />
        </div>
        <div className='px-4'>
          <OrderSummary />
        </div>
      </div>
    </>
  )
}
