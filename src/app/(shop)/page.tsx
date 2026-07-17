export const revalidate = 60

import { notFound, redirect } from 'next/navigation'
import { getProducts } from '@/actions/product'
import { ProductGrid } from '@/components/product'
import { PagePagination, PageTitle } from '@/components/shared'
import { getPageNumber } from '@/lib/helpers'

export default async function ShopPage({ searchParams }: PageProps<'/'>) {
  const page = await getPageNumber(searchParams)

  const { data } = await getProducts({ page })
  if (!data) notFound()

  const { products, totalPages } = data
  if (products.length === 0) redirect('/')

  return (
    <>
      <PageTitle subtitle='Todos los productos' title='Tienda' />
      <ProductGrid products={products} />
      <PagePagination totalPages={totalPages} />
    </>
  )
}
