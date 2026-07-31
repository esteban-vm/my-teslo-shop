export const revalidate = 0

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from 'rsc-daisyui'
import { getProducts } from '@/actions/product'
import { ProductTable } from '@/components/admin'
import { PagePagination, PageTitle } from '@/components/shared'
import { getParams } from '@/lib/helpers'

const title = 'Mantenimiento de productos'

export const metadata: Metadata = { title }

export type Props = PageProps<'/admin/products'>

export default async function Page({ searchParams }: Props) {
  const { page, take } = await getParams(searchParams)

  const { data } = await getProducts({ page, take })
  if (!data) notFound()

  const { products, totalPages } = data

  return (
    <>
      <PageTitle title={title} />
      <Link href='/admin/product/new' passHref>
        <Button as='span' className='float-end' color='info' outline size='sm'>
          Nuevo producto
        </Button>
      </Link>
      <ProductTable products={products} />
      <PagePagination totalPages={totalPages} />
    </>
  )
}
