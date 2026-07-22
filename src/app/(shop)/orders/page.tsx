export const revalidate = 0

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMyOrders } from '@/actions/order'
import { OrderTable } from '@/components/orders'
import { PagePagination, PageTitle } from '@/components/shared'
import { getPageNumber } from '@/lib/helpers'

const title = 'Mis órdenes'

export const metadata: Metadata = { title }

export type Props = PageProps<'/orders'>

export default async function Page({ searchParams }: Props) {
  const page = await getPageNumber(searchParams)

  const { data } = await getMyOrders({ page })
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
