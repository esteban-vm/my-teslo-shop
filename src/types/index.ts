import type { Product as ProductDB, Size } from '@/generated/prisma/client'

export interface Product extends ProductDB {
  images: string[]
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
