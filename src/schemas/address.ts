import { z } from 'zod'

export const AddressResult = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  address2: z.string().optional().nullable(),
  postalCode: z.string(),
  phone: z.string(),
  city: z.string(),
  countryId: z.string(),
})

export const AddressDTO = z.object({
  firstName: z.string().trim().nonempty().min(3),
  lastName: z.string().trim().nonempty().min(3),
  address: z.string().trim().nonempty().min(5),
  address2: z.string().optional().nullable(),
  postalCode: z.string().trim().nonempty().min(4),
  phone: z.string().trim().nonempty().min(4),
  city: z.string().trim().nonempty().min(5),
  countryId: z.string().length(2, 'Selecciona un país'),
  remember: z.boolean().optional(),
})

export type AddressResult = z.infer<typeof AddressResult>
export type AddressDTO = z.infer<typeof AddressDTO>
