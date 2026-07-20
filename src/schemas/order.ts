import { z } from 'zod'
import { Size } from '@/prisma/generated/client'
import { AddressDTO, AddressResult } from './address'
import { PaginatedResults } from './shared'

export const OrderResult = z.object({
  id: z.string(),
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
  quantity: z.number(),
  size: z.enum(Size),
})

export const OrderDTO = z.object({
  items: z.array(OrderItemDTO),
  address: AddressDTO,
})

export const OrderSummary = z.object({
  total: z.number(),
  subtotal: z.number(),
  tax: z.number(),
  totalItems: z.number(),
})

export const OrderByIdResult = z
  .object({
    isPaid: z.boolean().nullable(),
    shippingAddress: AddressResult.nullable(),
    items: z.array(
      z.object({
        quantity: z.number(),
        size: z.enum(Size),
        price: z.number(),
        product: z.object({
          id: z.string(),
          title: z.string(),
          slug: z.string(),
          images: z.array(z.object({ url: z.string() })),
        }),
      })
    ),
  })
  .extend(OrderSummary.shape)

export type OrderResult = z.infer<typeof OrderResult>
export type OrderResults = z.infer<typeof OrderResults>
export type PaginatedOrders = z.infer<typeof PaginatedOrders>
export type OrderItemDTO = z.infer<typeof OrderItemDTO>
export type OrderDTO = z.infer<typeof OrderDTO>
export type OrderSummary = z.infer<typeof OrderSummary>
export type OrderByIdResult = z.infer<typeof OrderByIdResult>
