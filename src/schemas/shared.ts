import { z } from 'zod'
import { Gender } from '@/prisma/generated/enums'

z.config({
  ...z.locales.es(),

  customError(iss) {
    const { code, maximum, minimum } = iss

    if (code === 'too_small') {
      if (minimum > 1) {
        return `Ingresa por lo menos ${minimum} caracteres`
      }

      return 'Este campo no puede quedar vacío'
    }

    if (code === 'too_big') {
      return `Ingresa como máximo ${maximum} caracteres`
    }
  },
})

export { z }

export const WithID = z.object({ id: z.string() })
export const WithSlug = z.object({ slug: z.string() })

export const WithPagination = z.object({
  page: z.any().optional(),
  take: z.any().optional(),
})

export const WithPaginationAndGender = WithPagination.extend({
  gender: z.enum(Gender).optional(),
})

export const PaginatedResults = z.object({
  totalPages: z.number(),
  currentPage: z.number(),
})

export type WithID = z.infer<typeof WithID>
export type WithSlug = z.infer<typeof WithSlug>
export type WithPagination = z.infer<typeof WithPagination>
export type WithPaginationAndGender = z.infer<typeof WithPaginationAndGender>
export type PaginatedResults = z.infer<typeof PaginatedResults>
