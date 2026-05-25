export const revalidate = 604_800 // 7 días

import { notFound } from 'next/navigation'
import { ProductActions } from '@/actions'
import { formatProductPrice } from '@/lib/helpers'

export default async function ProductPage({ params }: PageProps<'/product/[slug]'>) {
  const { slug } = await params

  const product = await ProductActions.getProductBySlug({ slug })
  if (!product) notFound()

  const { title, description, price } = product

  return (
    <div className='my-3 grid gap-3 md:grid-cols-3'>
      <div className='col-span-1 bg-accent/30 md:col-span-2'></div>
      <div className='bg-accent/30 px-3 py-1.5'>
        <h1 className='font-montserrat font-semibold text-lg'>{title}</h1>
        <p>{formatProductPrice(price)}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}
