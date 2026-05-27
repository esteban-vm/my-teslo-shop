export const revalidate = 604_800 // 7 días

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import tw from 'tailwind-styled-components'
import { ProductActions } from '@/actions'
import { ProductSlider, QuantityCounter, SizeSelector, StockCounter } from '@/components/shop'
import { formatProductPrice } from '@/lib/helpers'

type ProductPageProps = PageProps<'/product/[slug]'>

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await ProductActions.getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Producto no encontrado',
    }
  }

  const { title, description, images } = product

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`/products/${images[1]}`],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  const product = await ProductActions.getProductBySlug(slug)
  if (!product) notFound()

  const { title, description, price, images, sizes } = product

  return (
    <PageContainer>
      <ProductSlider images={images} />
      <div className='space-y-1 px-3 py-1.5'>
        <ProductTitle>{title}</ProductTitle>
        <Suspense fallback={<CounterSkeleton />}>
          <StockCounter slug={slug} />
        </Suspense>
        <p>
          <span className='font-semibold'>Precio:&nbsp;</span>
          {formatProductPrice(price)}
        </p>
        <SizeSelector availableSizes={sizes} selectedSize={sizes[1]} />
        <QuantityCounter />
        <p className='text-justify'>{description}</p>
      </div>
    </PageContainer>
  )
}

const PageContainer = tw.div`my-3 grid gap-3 lg:grid-cols-3`
const ProductTitle = tw.h1`font-montserrat font-semibold text-xl`
const CounterSkeleton = tw.div`h-6 w-full animate-pulse rounded-md bg-accent/30`
