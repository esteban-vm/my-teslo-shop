'use client'

import type { ImageGalleryRef } from 'react-image-gallery'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImageGallery from 'react-image-gallery'
import { Button } from 'rsc-daisyui'
import { cn } from '@/lib/ui'
import 'react-image-gallery/styles/image-gallery.css'
import { useRef } from 'react'

export interface ProductSliderProps {
  images: string[]
}

export function ProductSlider({ images }: ProductSliderProps) {
  const galleryRef = useRef<ImageGalleryRef>(null)

  const playSlide = () => galleryRef.current?.play()
  const pauseSlide = () => galleryRef.current?.pause()

  return (
    <ImageGallery
      additionalClass={cn('col-span-1 lg:col-span-2')}
      autoPlay
      items={images.map((image) => {
        return {
          original: `/products/${image}`,
          originalAlt: 'foo',
          originalTitle: 'title',
          thumbnailAlt: 'bar',
          thumbnail: `/products/${image}`,
        }
      })}
      onMouseLeave={playSlide}
      onMouseOver={pauseSlide}
      onTouchEnd={playSlide}
      onTouchStart={pauseSlide}
      ref={galleryRef}
      renderLeftNav={(leftNavOnClick) => {
        return (
          <div className='absolute top-1/2 z-30 -translate-y-1/2'>
            <Button onClick={leftNavOnClick} shape='circle' soft>
              <ChevronLeft />
            </Button>
          </div>
        )
      }}
      renderRightNav={(rightNavOnClick) => {
        return (
          <div className='absolute top-1/2 left-full z-30 -translate-x-full -translate-y-1/2'>
            <Button onClick={rightNavOnClick} shape='circle' soft>
              <ChevronRight />
            </Button>
          </div>
        )
      }}
      showFullscreenButton={false}
      showPlayButton={false}
      slideInterval={5000}
    />
  )
}
