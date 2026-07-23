export const revalidate = 0

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllOrders } from '@/actions/order'
import { OrderTable } from '@/components/orders'
import { PagePagination, PageTitle } from '@/components/shared'
import { getSearchParams } from '@/lib/helpers'

const title = 'Mantenimiento de órdenes'

export const metadata: Metadata = { title }

export type Props = PageProps<'/admin/orders'>

export default async function Page({ searchParams }: Props) {
  const { page } = await getSearchParams(searchParams)

  const { data } = await getAllOrders({ page })
  if (!data) notFound()

  const { orders, totalPages } = data

  return (
    <>
      <PageTitle title={title} />
      <OrderTable orders={orders} />
      <PagePagination totalPages={totalPages} />
    </>
  )
}
