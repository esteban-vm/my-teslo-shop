'use client'

import type { ImageProps } from 'next/image'
import Image from 'next/image'
import { useState } from 'react'
import { getProductImage } from '@/lib/products'
import { cn } from '@/lib/ui'

export interface ProductImageProps extends Partial<ImageProps> {
  src: string
}

export function ProductImage({ src, alt = '', className, ...rest }: ProductImageProps) {
  const [isLoading, setLoading] = useState(true)
  const imageSrc = getProductImage(src)

  return (
    <Image
      alt={alt}
      className={cn(className, 'transition-[filter] duration-300 ease-in', isLoading ? 'blur-sm' : 'blur-none')}
      onLoad={() => setLoading(false)}
      src={imageSrc}
      {...rest}
    />
  )
}
