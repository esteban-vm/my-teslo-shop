import { z } from 'zod'
import { notEmpty } from './shared'

export const AddressResult = z.object({
  id: z.string(),
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  address2: z.string().nullable(),
  postalCode: z.string(),
  phone: z.string(),
  city: z.string(),
  countryId: z.string(),
})

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

export type AddressResult = z.infer<typeof AddressResult>
export type AddressDTO = z.infer<typeof AddressDTO>
