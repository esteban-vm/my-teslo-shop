import { z } from 'zod'
import { ErrorMap } from '@/lib/constants'
import { Validations } from '@/lib/validations'

export const NewAddress = z.object({
  firstName: z.string().trim().refine(Validations.notEmpty, ErrorMap.notEmpty),
  lastName: z.string().trim().refine(Validations.notEmpty, ErrorMap.notEmpty),
  address: z.string().trim().refine(Validations.notEmpty, ErrorMap.notEmpty),
  address2: z.string().optional(),
  postalCode: z.string().trim().refine(Validations.notEmpty, ErrorMap.notEmpty),
  phone: z.string().trim().refine(Validations.notEmpty, ErrorMap.notEmpty),
  city: z.string().trim().refine(Validations.notEmpty, ErrorMap.notEmpty),
  country: z.string().trim().refine(Validations.notEmpty, ErrorMap.notEmpty),
  remember: z.boolean().optional().default(false),
})

export type NewAddress = z.infer<typeof NewAddress>
