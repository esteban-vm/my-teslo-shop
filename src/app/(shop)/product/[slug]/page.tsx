export const revalidate = 604_800 // 7 días

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Button, Skeleton } from 'rsc-daisyui'
import { getProductBySlug } from '@/actions/product'
import { QuantitySelector, SizeSelector } from '@/components/cart'
import { ProductInfo, ProductSlider, StockCounter } from '@/components/product'
import { getSession } from '@/lib/auth'
import { formatPrice } from '@/lib/products'

export type Props = PageProps<'/product/[slug]'>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: product } = await getProductBySlug({ slug })

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

export default async function Page({ params }: Props) {
  const { slug } = await params
  const session = await getSession()

  const { data: product } = await getProductBySlug({ slug })
  if (!product) notFound()

  const { id, title, description, price, sizes, images } = product

  return (
    <div className='my-3 grid gap-3 lg:grid-cols-3'>
      <ProductSlider images={images} />
      <div className='space-y-1 px-3 py-1.5'>
        <h1 className='font-bold font-montserrat text-rose-700 text-xl'>{title}</h1>

        {session?.user.role === 'admin' && (
          <Link href={`/admin/product/${id}`} passHref>
            <Button as='span' className='my-2' color='info' outline size='sm'>
              Actualizar producto
            </Button>
          </Link>
        )}

        <Suspense fallback={<Skeleton className='h-6 w-full rounded-box' />}>
          <StockCounter slug={slug} />
        </Suspense>
        <p>
          <span className='font-semibold'>Precio:&nbsp;</span>
          {formatPrice(price)}
        </p>
        <SizeSelector sizes={sizes} />
        <QuantitySelector product={product} />
        <p className='font-semibold'>Descripción:</p>
        <ProductInfo info={description} />
      </div>
    </div>
  )
}
