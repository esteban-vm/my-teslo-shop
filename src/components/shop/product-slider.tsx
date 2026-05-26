'use client'

import type { ImageGalleryRef } from 'react-image-gallery'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import ImageGallery from 'react-image-gallery'
import { Button } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { cn } from '@/lib/ui'

export function ProductSlider({ images }: { images: string[] }) {
  const galleryRef = useRef<ImageGalleryRef>(null)

  const playSlide = () => galleryRef.current?.play()
  const pauseSlide = () => galleryRef.current?.pause()

  return (
    <ImageGallery
      additionalClass={cn('col-span-1 lg:col-span-2')}
      autoPlay
      items={images.map((image) => {
        const productUrl = `/products/${image}`

        return {
          original: productUrl,
          originalAlt: 'Imagen del producto',
          thumbnail: productUrl,
          thumbnailAlt: 'Miniatura del producto',
        }
      })}
      onMouseLeave={playSlide}
      onMouseOver={pauseSlide}
      onTouchEnd={playSlide}
      onTouchStart={pauseSlide}
      ref={galleryRef}
      renderLeftNav={(leftNavOnClick) => {
        return (
          <ButtonContainer>
            <Button onClick={leftNavOnClick} shape='circle' soft>
              <ChevronLeft />
            </Button>
          </ButtonContainer>
        )
      }}
      renderRightNav={(rightNavOnClick) => {
        return (
          <ButtonContainer className='left-full -translate-x-full'>
            <Button onClick={rightNavOnClick} shape='circle' soft>
              <ChevronRight />
            </Button>
          </ButtonContainer>
        )
      }}
      showFullscreenButton={false}
      showPlayButton={false}
      slideInterval={5000}
    />
  )
}

const ButtonContainer = tw.div`absolute top-1/2 z-10 -translate-y-1/2`
