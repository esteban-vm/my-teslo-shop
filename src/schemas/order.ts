import { z } from 'zod'
import { Size } from '@/prisma/generated/client'
import { Address } from './address'

export const OrderItem = z.object({
  productId: z.string(),
  quantity: z.int(),
  size: z.enum(Size),
})

export const Order = z.object({
  items: z.array(OrderItem),
  address: Address,
})

export const Transaction = z.object({
  orderId: z.string(),
  transactionId: z.string(),
})

export type OrderItem = z.infer<typeof OrderItem>
export type Order = z.infer<typeof Order>
export type Transaction = z.infer<typeof Transaction>
