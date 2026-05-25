import type { Route } from 'next'
import type { Product } from '@/generated/prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'

export interface ProductCardProps extends Product {
  images: string[]
}

export function ProductCard({ id, title, price, slug, images }: ProductCardProps) {
  const productRoute: Route<`/product/${string}`> = `/product/${slug}`

  return (
    <CardContainer $as={Card} border id={id}>
      <Link href={productRoute}>
        <figure className='hover-gallery relative aspect-square'>
          {images.map((image) => (
            <Image alt={title} fill key={image} src={`/products/${image}`} />
          ))}
        </figure>
      </Link>
      <Card.Body className='gap-1 px-3 py-2.5'>
        <Link href={productRoute} title={title}>
          <Card.Title className='line-clamp-1 text-base hover:opacity-75'>{title}</Card.Title>
        </Link>
        <p className='text-sm'>{price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
      </Card.Body>
    </CardContainer>
  )
}

const CardContainer = tw.div`fade-in w-full max-w-96 animate-in overflow-hidden rounded-md shadow-md`
