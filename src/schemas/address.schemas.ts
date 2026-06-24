import validator from 'validator'
import { z } from 'zod'

function notEmpty(value: string) {
  return !validator.isEmpty(value)
}

const params = { error: 'Este campo no puede quedar vacío' }

export const NewAddressSchema = z.object({
  firstName: z.string().trim().refine(notEmpty, params),
  lastName: z.string().trim().refine(notEmpty, params),
  address: z.string().trim().refine(notEmpty, params),
  address2: z.string().optional(),
  postalCode: z.string().trim().refine(notEmpty, params),
  phone: z.string().trim().refine(notEmpty, params),
  city: z.string().trim().refine(notEmpty, params),
  country: z.string().trim().refine(notEmpty, params),
  remember: z.boolean().optional().default(false),
})

export type NewAddressSchema = z.infer<typeof NewAddressSchema>
