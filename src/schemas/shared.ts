import z from 'zod'
import { ValidationErrorMap } from '@/lib/constants'
import { Validations } from '@/lib/validations'

export const WithID = z.object({ id: z.string() })
export const WithSlug = z.object({ slug: z.string() })

export const WithPagination = z.object({
  page: z.any().optional().default(1),
  take: z.any().optional().default(12),
})

export const PaginatedResults = z.object({
  totalPages: z.number(),
  currentPage: z.number(),
})

export const notEmpty = z.string().trim().refine(Validations.notEmpty, ValidationErrorMap.notEmpty)

export const passwordParams = {
  path: ['repeatPassword'],
  error: 'Las contraseñas deben coincidir',
}

export type WithID = z.infer<typeof WithID>
export type WithSlug = z.infer<typeof WithSlug>
export type WithPagination = z.infer<typeof WithPagination>
export type PaginatedResults = z.infer<typeof PaginatedResults>
