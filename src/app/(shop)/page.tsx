export const revalidate = 60

import { notFound, redirect } from 'next/navigation'
import { getProducts } from '@/actions/product'
import { ProductGrid } from '@/components/product'
import { PagePagination, PageTitle } from '@/components/shared'

export default async function ShopPage({ searchParams }: PageProps<'/'>) {
  let { page = '1' } = await searchParams
  if (Array.isArray(page)) page = '1'

  const { data } = await getProducts({ page: Number.parseInt(page, 10) })
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
