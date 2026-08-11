import { z } from 'zod'
import { Gender, Size } from '@/prisma/generated/enums'
import { PaginatedResults } from './shared'
import './config'

export const ProductForm = z.object({
  id: z.cuid2().optional(),
  title: z.string().trim().nonempty().min(3).max(255),
  description: z.string().trim().nonempty().min(5),
  price: z.coerce.number().min(0, 'Ingresa un precio válido'),
  stock: z.coerce.number().int('Ingresa una cantidad entera').min(0, 'Ingresa una cantidad válida'),
  sizes: z.array(z.enum(Size)).min(1, 'Elige al menos una talla'),
  gender: z.enum(Gender, 'Selecciona un género'),
  slug: z.string().trim().nonempty().min(3).max(255),
  tags: z.string().trim().nonempty(),
  categoryId: z.cuid2('Selecciona una categoría'),
})

export const ProductImage = z.object({
  id: z.number(),
  url: z.string(),
})

export const ProductImages = z.array(ProductImage)

export const ProductDB = z.object({
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
  images: ProductImages,
})

export const ProductsDB = z.array(ProductDB)
export const PaginatedProducts = PaginatedResults.extend({ products: ProductsDB })

export type ProductForm = z.infer<typeof ProductForm>
export type ProductImage = z.infer<typeof ProductImage>
export type ProductImages = z.infer<typeof ProductImages>
export type ProductDB = z.infer<typeof ProductDB>
export type ProductsDB = z.infer<typeof ProductsDB>
export type PaginatedProducts = z.infer<typeof PaginatedProducts>
