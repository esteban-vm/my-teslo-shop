import type { Metadata } from 'next'
import type { CartProduct } from '@/types'
import { notFound } from 'next/navigation'
import { Card, Divider } from 'rsc-daisyui'
import { getOrderById } from '@/actions/order'
import { OrderList, PaymentAlert } from '@/components/orders'
import { AddressDetails, PageTitle, SummaryDetails } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Detalle de orden',
}

export default async function OrderPage({ params }: PageProps<'/orders/[id]'>) {
  const { id } = await params

  const { data: order } = await getOrderById({ id })
  if (!order) notFound()

  const { items, isPaid, shippingAddress: address, ...savedSummary } = order

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
          <OrderList products={products} />
        </div>
        <div>
          <Card>
            <Card.Body>
              <PaymentAlert isPaid={isPaid} />
              {address && <AddressDetails address={address} />}
              <Divider />
              <SummaryDetails savedSummary={savedSummary} />
              {/* {!isPaid && <PaymentButton amount={savedSummary.total} orderId={order.id} />} */}
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  )
}
