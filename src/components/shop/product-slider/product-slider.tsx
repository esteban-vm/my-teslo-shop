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

  const onSlideNav = () => {
    const gallery = galleryRef.current

    if (gallery) {
      gallery.pause()
      const currentIndex = gallery.getCurrentIndex()

      if (currentIndex === 0) {
        gallery.slideToIndex(1)
      } else {
        gallery.slideToIndex(0)
      }

      gallery.play()
    }
  }

  const galleryItems = images.map((image): GalleryItem => {
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
      items={galleryItems}
      onMouseLeave={playSlide}
      onMouseOver={pauseSlide}
      onTouchEnd={playSlide}
      onTouchStart={pauseSlide}
      ref={galleryRef}
      renderLeftNav={() => <SliderButton icon={<ChevronRight />} isLeft onClick={onSlideNav} />}
      renderRightNav={() => <SliderButton icon={<ChevronLeft />} onClick={onSlideNav} />}
      showFullscreenButton={false}
      showPlayButton={false}
      slideInterval={5000}
    />
  )
}
