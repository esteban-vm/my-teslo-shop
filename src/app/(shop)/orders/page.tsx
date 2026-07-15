export const revalidate = 0

import type { Metadata } from 'next'
import { getMyOrders } from '@/actions/order'
import { OrderTable } from '@/components/orders'
import { PageTitle } from '@/components/shared'

const title = 'Mis órdenes'

export const metadata: Metadata = { title }

export default async function MyOrdersPage() {
  const { data: orders = [] } = await getMyOrders()

  return (
    <>
      <PageTitle title={title} />
      <OrderTable orders={orders} />
    </>
  )
}
