export const revalidate = 60

import { redirect } from 'next/navigation'
import { getProducts } from '@/actions/product'
import { ProductGrid } from '@/components/product'
import { PagePagination, PageTitle } from '@/components/shared'

export default async function ShopPage({ searchParams }: PageProps<'/'>) {
  let { page = '1' } = await searchParams
  if (Array.isArray(page)) page = '1'

  const { products, totalPages } = await getProducts({
    page: Number.parseInt(page, 10),
  })

  if (products.length === 0) redirect('/')

  return (
    <>
      <PageTitle subtitle='Todos los productos' title='Tienda' />
      <ProductGrid products={products} />
      <PagePagination totalPages={totalPages} />
    </>
  )
}
