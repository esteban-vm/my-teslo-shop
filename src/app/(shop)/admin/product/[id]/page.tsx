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
  const isNewProduct = id === 'new'

  const { data: product } = await getProductById({ id })
  if (!product && !isNewProduct) redirect('/admin/products')

  const title = isNewProduct ? 'Nuevo producto' : 'Editar producto'

  return (
    <>
      <PageTitle title={title} />
      <ProductForm savedProduct={product} />
    </>
  )
}
