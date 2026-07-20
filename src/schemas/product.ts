import { z } from 'zod'
import { Gender, Size } from '@/prisma/generated/client'
import { PaginatedResults, WithPagination } from './shared'

export const ProductResult = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  sizes: z.array(z.enum(Size)),
  gender: z.enum(Gender),
  slug: z.string(),
  tags: z.array(z.string()),
  categoryId: z.string(),
  images: z.array(z.string()),
})

export const ProductResults = z.array(ProductResult)
export const PaginatedProducts = PaginatedResults.extend({ products: ProductResults })
export const WithPaginationAndGender = WithPagination.extend({ gender: z.enum(Gender).optional() })

export type ProductResult = z.infer<typeof ProductResult>
export type ProductResults = z.infer<typeof ProductResults>
export type PaginatedProducts = z.infer<typeof PaginatedProducts>
export type WithPaginationAndGender = z.infer<typeof WithPaginationAndGender>
