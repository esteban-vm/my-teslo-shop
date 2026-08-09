import type { ProductImages } from '@/schemas/product'
import { CircleXIcon } from 'lucide-react'
import Image from 'next/image'
import { Button, Indicator, Mask } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'

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
                className='hover:opacity-75'
                color='error'
                link
                shape='circle'
                size='sm'
                title='Eliminar imagen'
                type='button'
              >
                <CircleXIcon className='stroke-current' />
              </Button>
            </Indicator.Item>
            <Mask as='div' className='relative size-36 overflow-hidden lg:size-40' shape='squircle'>
              <Image alt='' fill src={`/products/${image.url}`} />
            </Mask>
          </Indicator>
        )
      })}
    </Container>
  )
}

const Container = tw.div`mt-3 flex w-full flex-wrap items-center justify-center gap-2`
