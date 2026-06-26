import { z } from 'zod'

export const OrderDTO = z.object({
  total: z.number(),
  subtotal: z.number(),
  tax: z.number(),
  totalItems: z.number(),
})

export type OrderDTO = z.infer<typeof OrderDTO>
