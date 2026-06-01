import type { Product } from '@/generated/prisma/client'

export interface ProductWithImages extends Product {
  images: string[]
}

export interface PropsWithProduct {
  product: ProductWithImages
}
