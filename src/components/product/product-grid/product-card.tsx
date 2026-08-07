import type { Route } from 'next'
import type { ProductDB } from '@/schemas/product'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { formatPrice } from '@/lib/helpers'

export function ProductCard({ product }: { product: ProductDB }) {
  const { id, title, price, slug, images } = product
  const productRoute: Route<`/product/${string}`> = `/product/${slug}`

  return (
    <CardContainer $as={Card} border id={id}>
      <Link href={productRoute}>
        <figure className='hover-gallery relative aspect-square'>
          {images.map((image) => (
            <Image alt={title} fill key={image.id} src={`/products/${image.url}`} />
          ))}
        </figure>
      </Link>
      <Card.Body className='gap-1 px-3 py-2.5'>
        <Link href={productRoute} title={title}>
          <Card.Title className='line-clamp-1 text-sm hover:opacity-75 xl:text-base'>{title}</Card.Title>
        </Link>
        <p className='text-sm'>{formatPrice(price)}</p>
      </Card.Body>
    </CardContainer>
  )
}

const CardContainer = tw.div`fade-in mx-auto w-full max-w-96 animate-in overflow-hidden rounded-md shadow-md`
