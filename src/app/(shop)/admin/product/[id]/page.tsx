import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCategories } from '@/actions/category'
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

  const [{ data: product }, { data: categories }] = await Promise.all([getProductById({ id }), getCategories()])

  if (!product && !(id === 'new')) redirect('/admin/products')

  return (
    <>
      <PageTitle title={id === 'new' ? 'Nuevo producto' : 'Editar producto'} />
      <ProductForm savedCategories={categories} savedProduct={product} />
    </>
  )
}
