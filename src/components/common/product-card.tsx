'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Card } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'

export function ProductCard() {
  const [imageScr, setImageSrc] = useState<`/img${1 | 2}.jpg`>('/img1.jpg')

  return (
    <CardContainer border>
      <Link href='/'>
        <figure className='relative aspect-square'>
          <CardImage
            alt='Shoes'
            fill
            onMouseEnter={() => setImageSrc('/img2.jpg')}
            onMouseLeave={() => setImageSrc('/img1.jpg')}
            src={imageScr}
          />
        </figure>
      </Link>
      <Card.Body className='gap-1 px-3 py-2.5'>
        <Link href='/'>
          <Card.Title className='line-clamp-1 text-lg hover:opacity-75'>Product Title</Card.Title>
        </Link>
        <p>$ 123.45</p>
      </Card.Body>
    </CardContainer>
  )
}

const CardContainer = tw(Card)`fade-in animate-in overflow-hidden rounded-md shadow-md`
const CardImage = tw(Image)`absolute inset-0 object-cover object-center contrast-125`
