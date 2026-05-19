'use client'

import type { Product } from '@/generated/prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { Card } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'

export interface ProductCardProps extends Product {
  images: string[]
}

export function ProductCard({ id, title, price, images }: ProductCardProps) {
  const imageRef = useRef<HTMLImageElement>(null!)
  const imageSrc1 = `/products/${images[0]}`
  const imageSrc2 = `/products/${images[1]}`

  const handleMouseEnter = () => {
    imageRef.current.src = imageSrc2
  }

  const handleMouseLeave = () => {
    imageRef.current.src = imageSrc1
  }

  return (
    <CardContainer $as={Card} border id={id}>
      <Link href='/'>
        <figure className='relative aspect-square'>
          <CardImage
            $as={Image}
            alt={title}
            fill
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={imageRef}
            src={imageSrc1}
          />
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

const CardContainer = tw.div`fade-in animate-in overflow-hidden rounded-md shadow-md`
const CardImage = tw.img`absolute inset-0 object-cover object-center contrast-125`
