import { z } from 'zod'
import { notEmpty } from './shared'

export const AddressDTO = z.object({
  firstName: notEmpty,
  lastName: notEmpty,
  address: notEmpty,
  address2: z.string().nullable().optional(),
  postalCode: notEmpty,
  phone: notEmpty,
  city: notEmpty,
  countryId: notEmpty,
  remember: z.boolean().optional(),
})

export type AddressDTO = z.infer<typeof AddressDTO>
