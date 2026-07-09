import { z } from 'zod'
import { Size } from '@/prisma/generated/client'
import { AddressDTO } from './address'

export const OrderItemDTO = z.object({
  productId: z.string(),
  quantity: z.int(),
  size: z.enum(Size),
})

export const OrderDTO = z.object({
  items: z.array(OrderItemDTO),
  address: AddressDTO,
})

export type OrderItemDTO = z.infer<typeof OrderItemDTO>
export type OrderDTO = z.infer<typeof OrderDTO>
