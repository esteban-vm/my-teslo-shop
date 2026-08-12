import type { GalleryItem, ImageGalleryRef } from 'react-image-gallery'
import type { ProductSliderProps } from '@/components/product'
import { useRef } from 'react'
import { getProductImage } from '@/lib/helpers'

export function useProductSlider({ images }: ProductSliderProps) {
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

  const items: typeof images =
    images.length > 0
      ? images.map((image) => ({ id: image.id, url: getProductImage(image.url) as string }))
      : [{ url: getProductImage() as string }, { url: getProductImage() as string }]

  const galleryItems = items.map((image): GalleryItem => {
    return {
      original: image.url!,
      originalAlt: 'Imagen del producto',
      thumbnail: image.url,
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
