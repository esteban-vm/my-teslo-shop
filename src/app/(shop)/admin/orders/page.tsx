export const revalidate = 0

import type { Metadata } from 'next'
import { getAllOrders } from '@/actions/order'
import { OrderTable } from '@/components/orders'
import { PageTitle } from '@/components/shared'

const title = 'Mantenimiento de órdenes'

export const metadata: Metadata = { title }

export default async function AllOrdersPage() {
  const { data: orders = [] } = await getAllOrders()

  return (
    <>
      <PageTitle title={title} />
      <OrderTable orders={orders} />
    </>
  )
}
