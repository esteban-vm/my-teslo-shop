export const revalidate = 604_800 // 7 días

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Skeleton } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { ProductActions } from '@/actions'
import { QuantitySelector, SizeSelector } from '@/components/cart'
import { ProductInfo, ProductSlider, StockCounter } from '@/components/shop'
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

  const { title, description, price, sizes, images } = product

  return (
    <PageContainer>
      <ProductSlider images={images} />
      <ProductDetails>
        <ProductTitle>{title}</ProductTitle>
        <Suspense fallback={<Skeleton className='h-6 w-full rounded-box' />}>
          <StockCounter slug={slug} />
        </Suspense>
        <p>
          <span className='font-semibold'>Precio:&nbsp;</span>
          {formatProductPrice(price)}
        </p>
        <SizeSelector sizes={sizes} />
        <QuantitySelector product={product} />
        <p className='font-semibold'>Descripción:</p>
        <ProductInfo info={description} />
      </ProductDetails>
    </PageContainer>
  )
}

const PageContainer = tw.div`my-3 grid gap-3 lg:grid-cols-3`
const ProductDetails = tw.div`space-y-1 px-3 py-1.5`
const ProductTitle = tw.h1`font-bold font-montserrat text-rose-700 text-xl`
