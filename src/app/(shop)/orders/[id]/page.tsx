import type { Metadata } from 'next'
import type { CartProduct } from '@/types'
import { Banknote, BanknoteX } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Alert, Card, Divider } from 'rsc-daisyui'
import { getOrderById } from '@/actions/order'
import { OrderList, PaymentButton } from '@/components/orders'
import { PageTitle } from '@/components/pages'
import { AddressDetails, SummaryDetails } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Detalle de orden',
}

export default async function OrderPage({ params }: PageProps<'/orders/[id]'>) {
  const { id } = await params

  const { data: order } = await getOrderById({ id })
  if (!order) notFound()

  const { items, isPaid, shippingAddress: savedAddress, ...savedSummary } = order

  const products: CartProduct[] = items.map(({ product, ...rest }) => {
    return {
      ...rest,
      id: product.id,
      title: product.title,
      slug: product.slug,
      image: product.images.map((image) => image.url)[0],
    }
  })

  return (
    <>
      <PageTitle subtitle={id} title='ID de orden:' />
      <section data-shop>
        <div className='lg:col-span-2'>
          <Alert
            className='not-lg:mx-auto mb-2 max-w-md gap-2 rounded-lg py-2 font-semibold'
            color={isPaid ? 'success' : 'error'}
          >
            {isPaid ? <Banknote /> : <BanknoteX />}
            <span>{isPaid ? 'Pagada' : 'No pagada'}</span>
          </Alert>
          <OrderList products={products} />
        </div>
        <div>
          <Card>
            <Card.Body>
              {savedAddress && <AddressDetails savedAddress={savedAddress} />}
              <Divider />
              <SummaryDetails savedSummary={savedSummary} />
              {/* <Alert className='gap-2 rounded-lg py-2 font-semibold' color={isPaid ? 'success' : 'error'}>
                {isPaid ? <Banknote /> : <BanknoteX />}
                <span>{isPaid ? 'Pagada' : 'No pagada'}</span>
              </Alert> */}
              <PaymentButton />
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  )
}
