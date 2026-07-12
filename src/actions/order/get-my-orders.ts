'use server'

import type { OrderResult } from '@/types'
import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'

export const getMyOrders = safeAuthClient.action(async ({ ctx }): Promise<OrderResult[]> => {
  const orders = await prisma.order.findMany({
    where: {
      userId: ctx.user.id,
    },
    include: {
      shippingAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    omit: {
      userId: true,
      total: true,
      subtotal: true,
      tax: true,
      totalItems: true,
      createdAt: true,
      updatedAt: true,
      paidAt: true,
      transactionId: true,
    },
  })

  return orders
})
