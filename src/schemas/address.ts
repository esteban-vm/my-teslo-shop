import { z } from 'zod'
import { notEmpty } from './shared'

export const AddressInput = z.object({
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

export type AddressInput = z.infer<typeof AddressInput>
