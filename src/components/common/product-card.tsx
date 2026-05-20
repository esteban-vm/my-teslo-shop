import type { Product } from '@/generated/prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'

export interface ProductCardProps extends Product {
  images: string[]
}

export function ProductCard({ id, title, price, images: [img1, img2] }: ProductCardProps) {
  return (
    <CardContainer $as={Card} border id={id}>
      <Link href='/'>
        <figure className='hover-gallery relative aspect-square'>
          <Image alt={title} fill src={`/products/${img1}`} />
          <Image alt={title} fill src={`/products/${img2}`} />
        </figure>
      </Link>
      <Card.Body className='gap-1 px-3 py-2.5'>
        <Link href='/'>
          <Card.Title className='line-clamp-1 text-base hover:opacity-75'>{title}</Card.Title>
        </Link>
        <p className='text-sm'>{price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
      </Card.Body>
    </CardContainer>
  )
}

const CardContainer = tw.div`fade-in w-full max-w-96 animate-in overflow-hidden rounded-md shadow-md`
