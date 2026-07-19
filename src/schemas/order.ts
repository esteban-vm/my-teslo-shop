import { z } from 'zod'
import { Size } from '@/prisma/generated/client'
import { AddressDTO } from './address'
import { PaginatedResults, WithID } from './shared'

export const OrderResult = WithID.extend({
  isPaid: z.boolean().nullable(),
  shippingAddress: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
    })
    .nullable(),
})

export const OrderResults = z.array(OrderResult)
export const PaginatedOrders = PaginatedResults.extend({ orders: OrderResults })

export const OrderItemDTO = z.object({
  productId: z.string(),
  quantity: z.int(),
  size: z.enum(Size),
})

export const OrderDTO = z.object({
  items: z.array(OrderItemDTO),
  address: AddressDTO,
})

export type OrderResult = z.infer<typeof OrderResult>
export type OrderResults = z.infer<typeof OrderResults>
export type PaginatedOrders = z.infer<typeof PaginatedOrders>
export type OrderItemDTO = z.infer<typeof OrderItemDTO>
export type OrderDTO = z.infer<typeof OrderDTO>
