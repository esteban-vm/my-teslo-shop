import type { Metadata } from 'next'
import { CheckoutList, PlaceOrder } from '@/components/checkout'
import { PageTitle } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Verificar orden',
}

export default function CheckoutPage() {
  return (
    <>
      <PageTitle title='Verificar orden' />
      <section data-shop>
        <div className='lg:col-span-2'>
          <CheckoutList />
        </div>
        <div>
          <PlaceOrder />
        </div>
      </section>
    </>
  )
}
