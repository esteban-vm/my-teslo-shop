import { z } from 'zod'
import { Size } from '@/prisma/generated/client'
import { AddressDTO } from './address'

export const OrderItem = z.object({
  productId: z.string(),
  quantity: z.int(),
  size: z.enum(Size),
})

export const OrderDTO = z.object({
  items: z.array(OrderItem),
  address: AddressDTO,
})

export const Transaction = z.object({
  orderId: z.string(),
  transactionId: z.string(),
})

export type OrderItem = z.infer<typeof OrderItem>
export type OrderDTO = z.infer<typeof OrderDTO>
export type Transaction = z.infer<typeof Transaction>
