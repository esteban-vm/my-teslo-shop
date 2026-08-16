import type { ImageProps } from 'next/image'
import Image from 'next/image'
import { getProductImage } from '@/lib/products'

export interface ProductImageProps extends Partial<ImageProps> {
  src?: string
}

export function ProductImage({ src, alt = '', ...rest }: ProductImageProps) {
  const imageSrc = getProductImage(src)
  return <Image alt={alt} src={imageSrc} {...rest} />
}
