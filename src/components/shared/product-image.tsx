import type { ImageProps } from 'next/image'
import Image from 'next/image'

export interface ProductImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src?: string
  alt?: string
}

export function ProductImage({ src, alt = '', ...rest }: ProductImageProps) {
  let imageSrc: string

  if (src) {
    if (src.startsWith('http')) imageSrc = src
    else imageSrc = `/products/${src}`
  } else {
    imageSrc = 'imgs/placeholder.jpg'
  }

  return <Image alt={alt} src={imageSrc} {...rest} />
}
