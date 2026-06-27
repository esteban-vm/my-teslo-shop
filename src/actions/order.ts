'use server'

import type { OrderSummary } from '@/types'
import z from 'zod'
import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { authClient } from '@/lib/safe-action'
import { AddressDTO } from '@/schemas/address'
import { OrderItemDTO } from '@/schemas/order'

export const placeOrder = authClient
  .inputSchema(z.object({ items: z.array(OrderItemDTO), address: AddressDTO }))
  .action(async ({ ctx, parsedInput }) => {
    await sleepExecution(3)
    const userId = ctx.user.id
    const { items, address } = parsedInput

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: items.map((item) => item.productId),
        },
      },
    })

    const totalItems = items.reduce((total, p) => total + p.quantity, 0)

    const info = items.reduce(
      (acc, item) => {
        const product = products.find((product) => product.id === item.productId)

        if (!product) {
          throw new Error('Producto no encontrado')
        }

        const subtotal = product.price * item.quantity

        acc.subtotal += subtotal
        acc.tax += subtotal * 0.15
        acc.total += subtotal * 1.15

        return acc
      },
      { total: 0, subtotal: 0, tax: 0 }
    )

    const summary: OrderSummary = {
      totalItems,
      ...info,
    }

    console.log({ userId, address })
    console.log({ summary })
  })
