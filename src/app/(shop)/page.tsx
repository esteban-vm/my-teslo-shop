export const revalidate = 60 // 1 minuto

import { notFound, redirect } from 'next/navigation'
import { getProducts } from '@/actions/product'
import { ProductGrid } from '@/components/product'
import { PagePagination, PageTitle } from '@/components/shared'
import { getPageNumber } from '@/lib/helpers'

export type Props = PageProps<'/'>

export default async function Page({ searchParams }: Props) {
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
