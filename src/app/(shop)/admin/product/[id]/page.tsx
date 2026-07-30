import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getProductById } from '@/actions/product'
import { ProductForm } from '@/components/admin'
import { PageTitle } from '@/components/shared'

export type Props = PageProps<'/admin/product/[id]'>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const { data: product } = await getProductById({ id })

  if (!product) {
    return {
      title: 'Producto no encontrado',
    }
  }

  const { title, description } = product

  return {
    title,
    description,
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const isNew = id === 'new'

  const { data: product } = await getProductById({ id })
  if (!product && !isNew) redirect('/admin/products')

  return (
    <>
      <PageTitle title={isNew ? 'Nuevo producto' : 'Editar producto'} />
      <ProductForm savedProduct={product} />
    </>
  )
}
