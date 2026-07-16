export const revalidate = 0

import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getAllOrders } from '@/actions/order'
import { OrderTable } from '@/components/orders'
import { PagePagination, PageTitle } from '@/components/shared'

const title = 'Mantenimiento de órdenes'

export const metadata: Metadata = { title }

export default async function OrdersPage({ searchParams }: PageProps<'/admin/orders'>) {
  let { page = '1' } = await searchParams
  if (Array.isArray(page)) page = '1'

  const { data } = await getAllOrders({ page: Number.parseInt(page, 10) })
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
