import { z } from 'zod'
import { Size } from '@/prisma/generated/client'

export const OrderDTO = z.object({
  total: z.number(),
  subtotal: z.number(),
  tax: z.number(),
  totalItems: z.int(),
})

export const OrderItemDTO = z.object({
  productId: z.cuid2(),
  quantity: z.int(),
  size: z.enum(Size),
})

export type OrderDTO = z.infer<typeof OrderDTO>
export type OrderItemDTO = z.infer<typeof OrderItemDTO>
