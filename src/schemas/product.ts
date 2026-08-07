import { z } from 'zod'
import { Gender, Size } from '@/prisma/generated/enums'
import { PaginatedResults } from './shared'
import './config'

export const ProductForm = z.object({
  id: z.cuid2().optional(),
  title: z.string().trim().nonempty().min(3).max(255),
  description: z.string().trim().nonempty().min(5),
  price: z.coerce
    .number()
    .min(0, 'Ingresa un precio válido')
    .transform((value) => Number(value.toFixed(2))),
  stock: z.coerce
    .number()
    .min(0, 'Ingresa una cantidad válida')
    .transform((value) => Number(value.toFixed(0))),
  sizes: z.array(z.enum(Size)).min(1, 'Elige al menos una talla'),
  gender: z.enum(Gender, 'Selecciona un género'),
  slug: z.string().trim().nonempty().min(3).max(255).lowercase(),
  tags: z.string().trim().nonempty().lowercase(),
  categoryId: z.cuid2('Selecciona una categoría'),
})

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
  images: z.array(z.string()),
})

export const ProductsDB = z.array(ProductDB)
export const PaginatedProducts = PaginatedResults.extend({ products: ProductsDB })

export type ProductForm = z.infer<typeof ProductForm>
export type ProductDB = z.infer<typeof ProductDB>
export type ProductsDB = z.infer<typeof ProductsDB>
export type PaginatedProducts = z.infer<typeof PaginatedProducts>
