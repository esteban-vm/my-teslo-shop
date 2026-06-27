import { z } from 'zod'
import { Size } from '@/prisma/generated/client'

export const OrderItemDTO = z.object({
  productId: z.cuid2(),
  quantity: z.int(),
  size: z.enum(Size),
})

export type OrderItemDTO = z.infer<typeof OrderItemDTO>
