import type { ImageProps } from 'next/image'
import Image from 'next/image'
import { getProductImage } from '@/lib/helpers'

export function ProductImage({ src, alt = '', ...rest }: Partial<ImageProps>) {
  const imageSrc = getProductImage(src)

  return <Image alt={alt} src={imageSrc} {...rest} />
}
