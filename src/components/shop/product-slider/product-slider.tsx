'use client'

import type { GalleryItem, ImageGalleryRef } from 'react-image-gallery'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import ImageGallery from 'react-image-gallery'
import { SliderButton } from './slider-button'

export function ProductSlider({ images }: { images: string[] }) {
  const galleryRef = useRef<ImageGalleryRef>(null)

  const onPlay = () => galleryRef.current?.play()
  const onPause = () => galleryRef.current?.pause()

  const onSlide = () => {
    onPause()

    const gallery = galleryRef.current

    if (gallery) {
      const currentIndex = gallery.getCurrentIndex()

      if (currentIndex === 0) {
        gallery.slideToIndex(1)
      } else {
        gallery.slideToIndex(0)
      }
    }

    onPlay()
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
      additionalClass='col-span-1 mx-auto w-[75%] lg:col-span-2'
      autoPlay
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
