import { z } from 'zod'
import { Validations } from '@/lib/validations'

const params = { error: 'Este campo no puede quedar vacío' }

export const NewAddressSchema = z.object({
  firstName: z.string().trim().refine(Validations.notEmpty, params),
  lastName: z.string().trim().refine(Validations.notEmpty, params),
  address: z.string().trim().refine(Validations.notEmpty, params),
  address2: z.string().optional(),
  postalCode: z.string().trim().refine(Validations.notEmpty, params),
  phone: z.string().trim().refine(Validations.notEmpty, params),
  city: z.string().trim().refine(Validations.notEmpty, params),
  country: z.string().trim().refine(Validations.notEmpty, params),
  remember: z.boolean().optional().default(false),
})

export type NewAddressSchema = z.infer<typeof NewAddressSchema>
