import type { Metadata } from 'next'
import { CheckoutList, PlaceOrder } from '@/components/checkout'
import { PageTitle } from '@/components/shared'

const title = 'Verificar orden'

export const metadata: Metadata = { title }

export default function CheckoutPage() {
  return (
    <>
      <PageTitle title={title} />
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
