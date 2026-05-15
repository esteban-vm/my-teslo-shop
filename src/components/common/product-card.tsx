'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { Card } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'

export function ProductCard() {
  const imageRef = useRef<HTMLImageElement>(null!)

  const handleMouseEnter = () => {
    imageRef.current.src = '/img2.jpg'
  }

  const handleMouseLeave = () => {
    imageRef.current.src = '/img1.jpg'
  }

  return (
    <CardContainer border>
      <Link href='/'>
        <figure className='relative aspect-square'>
          <CardImage
            $as={Image}
            alt='Imagen de producto'
            fill
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={imageRef}
            src='/img1.jpg'
          />
        </figure>
      </Link>
      <Card.Body className='gap-1 px-3 py-2.5'>
        <Link href='/'>
          <Card.Title className='line-clamp-1 text-base hover:opacity-75'>Título del producto</Card.Title>
        </Link>
        <p className='text-sm'>{(123.45).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </p>
      </Card.Body>
    </CardContainer>
  )
}

const CardContainer = tw(Card)`fade-in animate-in overflow-hidden rounded-md shadow-md`
const CardImage = tw.img`absolute inset-0 object-cover object-center contrast-125`
