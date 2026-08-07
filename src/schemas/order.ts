import { z } from 'zod'
import { Size } from '@/prisma/generated/client'
import { AddressDB, AddressForm } from './address'
import { PaginatedResults } from './shared'
import './config'

export const OrderDB = z.object({
  id: z.string(),
  isPaid: z.boolean().nullable(),
  shippingAddress: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
    })
    .nullable(),
})

export const OrdersDB = z.array(OrderDB)
export const PaginatedOrders = PaginatedResults.extend({ orders: OrdersDB })

export const OrderItem = z.object({
  productId: z.string(),
  quantity: z.number(),
  size: z.enum(Size),
})

export const OrderDTO = z.object({
  items: z.array(OrderItem),
  address: AddressForm,
})

export const OrderSummary = z.object({
  total: z.number(),
  subtotal: z.number(),
  tax: z.number(),
  totalItems: z.number(),
})

export const OrderById = z
  .object({
    isPaid: z.boolean().nullable(),
    shippingAddress: AddressDB.nullable(),
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

export type OrderDB = z.infer<typeof OrderDB>
export type OrdersDB = z.infer<typeof OrdersDB>
export type PaginatedOrders = z.infer<typeof PaginatedOrders>
export type OrderItem = z.infer<typeof OrderItem>
export type OrderDTO = z.infer<typeof OrderDTO>
export type OrderSummary = z.infer<typeof OrderSummary>
export type OrderById = z.infer<typeof OrderById>
