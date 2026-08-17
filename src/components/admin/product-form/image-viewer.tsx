'use client'

import type { ProductImages } from '@/schemas/product'
import { CircleXIcon } from 'lucide-react'
import { Button, Indicator, Mask } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { deleteProductImage } from '@/actions/product'
import { ProductImage } from '@/components/shared'
import { DEFAULT_IMAGE_URL } from '@/lib/constants'
import { cn } from '@/lib/ui'

export interface ImageViewerProps {
  images: ProductImages
}

export function ImageViewer({ images }: ImageViewerProps) {
  return (
    <Container>
      {images.map((image) => {
        return (
          <Indicator key={image.id}>
            <Indicator.Item>
              <Button
                className={cn('hover:opacity-75', image.url === DEFAULT_IMAGE_URL && 'hidden')}
                color='error'
                link
                onClick={() => deleteProductImage(image)}
                shape='circle'
                size='sm'
                title='Eliminar imagen'
                type='button'
              >
                <CircleXIcon className='stroke-current' />
              </Button>
            </Indicator.Item>
            <Mask as='div' className='relative size-36 overflow-hidden lg:size-40' shape='squircle'>
              <ProductImage fill src={image.url} />
            </Mask>
          </Indicator>
        )
      })}
    </Container>
  )
}

const Container = tw.div`mt-3 flex w-full flex-wrap items-center justify-center gap-2`
