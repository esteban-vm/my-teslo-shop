import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getProductById } from '@/actions/product'
import { ProductForm } from '@/components/admin'
import { PageTitle } from '@/components/shared'

export type Props = PageProps<'/admin/product/[id]'>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  if (id === 'new') {
    return {
      title: 'Nuevo producto',
    }
  }

  return {
    title: 'Editar producto',
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const isNew = id === 'new'

  const { data: product } = await getProductById({ id })
  if (!product && !isNew) redirect('/admin/products?take=5')

  return (
    <>
      <PageTitle title={isNew ? 'Nuevo producto' : 'Editar producto'} />
      <ProductForm savedProduct={product} />
    </>
  )
}
