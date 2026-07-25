import { z } from 'zod'
import { Gender, Size } from '@/prisma/generated/enums'
import { PaginatedResults } from './shared'
import './config'

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

export const ProductDTO = z.object({
  id: z.cuid2().nullable().optional(),
  title: z.string().trim().nonempty().min(3).max(255),
  description: z.string().trim().nonempty().min(5),
  price: z.coerce
    .number()
    .min(0)
    .transform((value) => Number(value).toFixed(2)),
  stock: z.coerce
    .number()
    .min(0)
    .transform((value) => Number(value).toFixed(2)),
  sizes: z.array(z.enum(Size)),
  gender: z.enum(Gender),
  slug: z.string().trim().nonempty().min(3).max(255),
  tags: z.string().trim().nonempty(),
  categoryId: z.cuid2(),
})

export type ProductResult = z.infer<typeof ProductResult>
export type ProductResults = z.infer<typeof ProductResults>
export type PaginatedProducts = z.infer<typeof PaginatedProducts>
export type ProductDTO = z.infer<typeof ProductDTO>
