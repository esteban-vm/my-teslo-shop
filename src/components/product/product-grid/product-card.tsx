import type { Route } from 'next'
import type { ProductDB } from '@/schemas/product'
import Link from 'next/link'
import { Card } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { ProductImage } from '@/components/shared'
import { formatPrice } from '@/lib/products'

export function ProductCard({ product }: { product: ProductDB }) {
  const { id, title, price, slug, images } = product
  const productRoute: Route<`/product/${string}`> = `/product/${slug}`

  return (
    <Container border id={id}>
      <Link href={productRoute}>
        <figure className='hover-gallery relative aspect-square'>
          {images.map((image) => (
            <ProductImage alt={title} fill key={image.id} src={image.url} />
          ))}
        </figure>
      </Link>
      <Card.Body className='gap-1 px-3 py-2.5'>
        <Link href={productRoute} title={title}>
          <Title>{title}</Title>
        </Link>
        <p className='text-sm'>{formatPrice(price)}</p>
      </Card.Body>
    </Container>
  )
}

const Container = tw(Card)`fade-in mx-auto w-full max-w-96 animate-in overflow-hidden rounded-md shadow-md`
const Title = tw(Card.Title)`line-clamp-1 text-sm hover:opacity-75 xl:text-base`
