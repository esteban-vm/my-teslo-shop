export const revalidate = 0

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from 'rsc-daisyui'
import { getProducts } from '@/actions/product'
import { ProductTable } from '@/components/admin'
import { PagePagination, PageTitle } from '@/components/shared'
import { getPageNumber } from '@/lib/helpers'

const title = 'Mantenimiento de productos'

export const metadata: Metadata = { title }

export type Props = PageProps<'/admin/products'>

export default async function Page({ searchParams }: Props) {
  const page = await getPageNumber(searchParams)

  const { data } = await getProducts({ page, take: 5 })
  if (!data) notFound()

  const { products, totalPages } = data

  return (
    <>
      <PageTitle title={title} />
      <Button as={Link} className='float-end' color='info' href='/admin/product/new' outline size='sm'>
        Nuevo producto
      </Button>
      <ProductTable products={products} />
      <PagePagination totalPages={totalPages} />
    </>
  )
}
