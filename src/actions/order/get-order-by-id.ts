'use server'

import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'
import { OrderById } from '@/schemas/order'
import { WithID } from '@/schemas/shared'

export const getOrderById = safeAuthClient
  .inputSchema(WithID)
  .outputSchema(OrderById.nullable())
  .action(
    cache(async ({ ctx, parsedInput }) => {
      const { id, role } = ctx.user

      const order = await prisma.order.findUnique({
        where: {
          id: parsedInput.id,
          userId: role === 'admin' ? undefined : id,
        },
        include: {
          shippingAddress: {
            omit: { id: true, orderId: true },
          },
          items: {
            select: {
              price: true,
              quantity: true,
              size: true,
              product: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                  images: {
                    select: {
                      url: true,
                    },
                    take: 1,
                  },
                },
              },
            },
          },
        },
        omit: {
          id: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
          paidAt: true,
          transactionId: true,
        },
      })

      return order
    })
  )
