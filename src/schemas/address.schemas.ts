import { z } from 'zod'
import { notEmpty } from './shared.schemas'

export const NewAddress = z.object({
  firstName: notEmpty,
  lastName: notEmpty,
  address: notEmpty,
  address2: z.string().optional(),
  postalCode: notEmpty,
  phone: notEmpty,
  city: notEmpty,
  country: notEmpty,
  remember: z.boolean().optional().default(false),
})

export type NewAddress = z.infer<typeof NewAddress>
