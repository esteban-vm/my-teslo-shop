import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getProductBySlug } from '@/actions/product'
import { ProductForm } from '@/components/admin'
import { PageTitle } from '@/components/shared'

export type Props = PageProps<'/admin/product/[slug]'>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: product } = await getProductBySlug({ slug })

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
  const { slug } = await params

  const { data: product } = await getProductBySlug({ slug })
  if (!product) redirect('/admin/products')

  return (
    <>
      <PageTitle title={product.title} />
      <ProductForm savedProduct={product} />
    </>
  )
}
