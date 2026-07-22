export const revalidate = 0

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProducts } from '@/actions/product'
import { ProductTable } from '@/components/admin'
import { PagePagination, PageTitle } from '@/components/shared'
import { getPageNumber } from '@/lib/helpers'

const title = 'Mantenimiento de productos'

export const metadata: Metadata = { title }

export default async function ProductsPage({ searchParams }: PageProps<'/admin/products'>) {
  const page = await getPageNumber(searchParams)

  const { data } = await getProducts({ page, take: 5 })
  if (!data) notFound()

  const { products, totalPages } = data

  return (
    <>
      <PageTitle title={title} />
      <ProductTable products={products} />
      <PagePagination totalPages={totalPages} />
    </>
  )
}
