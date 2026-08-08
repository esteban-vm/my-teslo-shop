'use client'

import type { ProductImages } from '@/schemas/product'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImageGallery from 'react-image-gallery'
import { useProductSlider } from '@/hooks'
import { SliderButton } from './slider-button'

export interface ProductSliderProps {
  images: ProductImages
}

export function ProductSlider(props: ProductSliderProps) {
  const { galleryRef, galleryItems, onPlay, onPause, onSlide } = useProductSlider(props)

  return (
    <ImageGallery
      additionalClass='col-span-1 mx-auto px-3 py-1.5 lg:col-span-2 lg:w-[75%]'
      autoPlay
      disableThumbnailScroll
      disableThumbnailSwipe
      items={galleryItems}
      onMouseLeave={onPlay}
      onMouseOver={onPause}
      onTouchEnd={onPlay}
      onTouchStart={onPause}
      ref={galleryRef}
      renderLeftNav={() => <SliderButton icon={<ChevronRight />} isLeft onClick={onSlide} />}
      renderRightNav={() => <SliderButton icon={<ChevronLeft />} onClick={onSlide} />}
      showFullscreenButton={false}
      showPlayButton={false}
      slideInterval={5_000}
    />
  )
}
