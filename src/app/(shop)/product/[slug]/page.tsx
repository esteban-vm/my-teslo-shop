export const revalidate = 604_800 // 7 días

import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import tw from 'tailwind-styled-components'
import { ProductActions } from '@/actions'
import { ProductSlider, StockCounter } from '@/components/shop'
import { formatProductPrice } from '@/lib/helpers'

export default async function ProductPage({ params }: PageProps<'/product/[slug]'>) {
  const { slug } = await params

  const product = await ProductActions.getProductBySlug(slug)
  if (!product) notFound()

  const { title, description, price, images } = product

  return (
    <PageContainer>
      <ProductSlider images={images} />
      <div className='px-3 py-1.5'>
        <ProductTitle>{title}</ProductTitle>
        <Suspense fallback={<CounterSkeleton />}>
          <StockCounter slug={slug} />
        </Suspense>
        <p>{formatProductPrice(price)}</p>
        <p>{description}</p>
      </div>
    </PageContainer>
  )
}

const PageContainer = tw.div`my-3 grid gap-3 lg:grid-cols-3`
const ProductTitle = tw.h1`font-montserrat font-semibold text-lg`
const CounterSkeleton = tw.div`h-6 w-full animate-pulse rounded-md bg-accent/30`
