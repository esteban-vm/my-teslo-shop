import z from 'zod'
import { ValidationErrorMap } from '@/lib/constants'
import { Validations } from '@/lib/validations'

export const WithID = z.object({ id: z.string() })
export const WithSlug = z.object({ slug: z.string() })

export const notEmpty = z.string().trim().refine(Validations.notEmpty, ValidationErrorMap.notEmpty)

export const passwordParams = {
  path: ['repeatPassword'],
  error: 'Las contraseñas deben coincidir',
}
