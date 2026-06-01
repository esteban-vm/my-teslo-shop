'use client'

import type { GalleryItem, ImageGalleryRef } from 'react-image-gallery'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import ImageGallery from 'react-image-gallery'
import { cn } from '@/lib/ui'
import { SliderButton } from './slider-button'

export function ProductSlider({ images }: { images: string[] }) {
  const galleryRef = useRef<ImageGalleryRef>(null)

  const playSlide = () => galleryRef.current?.play()
  const pauseSlide = () => galleryRef.current?.pause()

  const items = images.map((image): GalleryItem => {
    const productUrl = `/products/${image}`

    return {
      original: productUrl,
      originalAlt: 'Imagen del producto',
      thumbnail: productUrl,
      thumbnailAlt: 'Miniatura del producto',
    }
  })

  return (
    <ImageGallery
      additionalClass={cn('col-span-1 lg:col-span-2')}
      autoPlay
      items={items}
      onMouseLeave={playSlide}
      onMouseOver={pauseSlide}
      onTouchEnd={playSlide}
      onTouchStart={pauseSlide}
      ref={galleryRef}
      renderLeftNav={(cb) => <SliderButton icon={<ChevronRight />} isLeft onClick={cb} />}
      renderRightNav={(cb) => <SliderButton icon={<ChevronLeft />} onClick={cb} />}
      showFullscreenButton={false}
      showPlayButton={false}
      slideInterval={5000}
    />
  )
}
