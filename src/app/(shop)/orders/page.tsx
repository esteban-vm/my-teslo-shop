export const revalidate = 0

import type { Metadata } from 'next'
import { getMyOrders } from '@/actions/order'
import { OrderTable } from '@/components/orders'
import { PageTitle } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Mis órdenes',
}

export default async function MyOrdersPage() {
  const { data: orders = [] } = await getMyOrders()

  return (
    <>
      <PageTitle title='Mis órdenes' />
      <OrderTable orders={orders} />
    </>
  )
}
