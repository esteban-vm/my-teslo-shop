import z from 'zod'
import { ValidationErrorMap } from '@/lib/constants'
import { Validations } from '@/lib/validations'
import { Gender } from '@/prisma/generated/client'

export const WithID = z.object({ id: z.string() })
export const WithSlug = z.object({ slug: z.string() })

export const WithPagination = z.object({
  page: z.number().optional(),
  take: z.number().optional(),
})

export const WithPaginationAndGender = WithPagination.extend({
  gender: z.enum(Gender).optional(),
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
