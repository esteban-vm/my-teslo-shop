export const revalidate = 0

import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getAllOrders } from '@/actions/order'
import { OrderTable } from '@/components/orders'
import { PagePagination, PageTitle } from '@/components/shared'
import { getPageNumber } from '@/lib/helpers'

const title = 'Mantenimiento de órdenes'

export const metadata: Metadata = { title }

export default async function OrdersPage({ searchParams }: PageProps<'/admin/orders'>) {
  const page = await getPageNumber(searchParams)

  const { data } = await getAllOrders({ page })
  if (!data) notFound()

  const { orders, totalPages } = data
  if (orders.length === 0) redirect('/admin/orders')

  return (
    <>
      <PageTitle title={title} />
      <OrderTable orders={orders} />
      <PagePagination totalPages={totalPages} />
    </>
  )
}
