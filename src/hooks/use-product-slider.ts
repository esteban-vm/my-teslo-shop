import type { GalleryItem, ImageGalleryRef } from 'react-image-gallery'
import type { ProductSliderProps } from '@/components/product'
import { useRef } from 'react'
import { getProductImage } from '@/lib/products'

export function useProductSlider({ images }: ProductSliderProps) {
  const galleryRef = useRef<ImageGalleryRef>(null)

  const onPlay = () => galleryRef.current?.play()
  const onPause = () => galleryRef.current?.pause()

  const onSlide = () => {
    onPause()
    const gallery = galleryRef.current

    if (gallery) {
      const currentIndex = gallery.getCurrentIndex()
      if (currentIndex === 0) gallery.slideToIndex(1)
      else gallery.slideToIndex(0)
    }

    onPlay()
  }

  const galleryItems = images.map((image): GalleryItem => {
    const imageSrc = getProductImage(image.url)

    return {
      original: imageSrc,
      originalAlt: 'Imagen del producto',
      thumbnail: imageSrc,
      thumbnailAlt: 'Miniatura del producto',
    }
  })

  return {
    galleryRef,
    galleryItems,
    onPlay,
    onPause,
    onSlide,
  }
}
