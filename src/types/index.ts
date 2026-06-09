import type { Product, Size } from '@/generated/prisma/client'

export interface ProductWithImages extends Product {
  images: string[]
}

export interface PropsWithProduct {
  product: ProductWithImages
}

export interface CartProduct {
  id: string
  title: string
  slug: string
  price: number
  quantity: number
  size: Size
  image: string
}
