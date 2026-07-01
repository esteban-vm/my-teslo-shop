import type { Metadata } from 'next'
import { OrderList } from '@/components/orders'
import { PageTitle } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Detalle de orden',
}

export default async function OrderPage({ params }: PageProps<'/orders/[id]'>) {
  const { id } = await params

  return (
    <>
      <PageTitle subtitle={id} title='Orden #' />
      <section data-shop>
        <div className='lg:col-span-2'>
          <OrderList />
        </div>
        <div></div>
      </section>
    </>
  )
}
