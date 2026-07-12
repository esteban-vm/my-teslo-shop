'use server'

import type { OrderResult } from '@/types'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'

export const getAllOrders = safeAdminClient.action(async (): Promise<OrderResult[]> => {
  const orders = await prisma.order.findMany({
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
    orderBy: {
      createdAt: 'desc',
    },
  })

  return orders
})
