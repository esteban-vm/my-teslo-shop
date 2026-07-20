'use server'

import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'
import { OrderByIdResult } from '@/schemas/order'
import { WithID } from '@/schemas/shared'

export const getOrderById = safeAuthClient
  .inputSchema(WithID)
  .outputSchema(OrderByIdResult.nullable())
  .action(async ({ ctx, parsedInput }) => {
    const order = await prisma.order.findUnique({
      where: {
        id: parsedInput.id,
        userId: ctx.user.id,
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
