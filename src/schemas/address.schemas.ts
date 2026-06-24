import { z } from 'zod'
import { notEmpty } from './shared.schemas'

export const AddressDTO = z.object({
  firstName: notEmpty,
  lastName: notEmpty,
  address: notEmpty,
  address2: z.string().optional(),
  postalCode: notEmpty,
  phone: notEmpty,
  city: notEmpty,
  countryId: notEmpty,
  remember: z.boolean().optional().default(false),
})

export type AddressDTO = z.infer<typeof AddressDTO>
