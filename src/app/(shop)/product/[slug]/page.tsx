export const revalidate = 604_800 // 7 días

import { notFound } from 'next/navigation'
import { ProductActions } from '@/actions'

export default async function ProductPage({ params }: PageProps<'/product/[slug]'>) {
  const { slug } = await params

  const product = await ProductActions.getProductBySlug({ slug })
  if (!product) notFound()

  return (
    <div className='grid gap-3 md:grid-cols-3'>
      <div className='col-span-1 bg-accent/30 md:col-span-2'></div>
      <div className='bg-accent/30 px-5'>
        <h1 className='font-bold font-montserrat text-xl'>{product.title}</h1>
      </div>
    </div>
  )
}
