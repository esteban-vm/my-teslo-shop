'use server'

import type { OrderResult, Paginated } from '@/types'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { WithPagination } from '@/schemas/shared'

export const getAllOrders = safeAdminClient
  .inputSchema(WithPagination)
  .action(async ({ parsedInput }): Promise<Paginated<{ orders: OrderResult[] }>> => {
    let { page = 1, take = 12 } = parsedInput
    if (Number.isNaN(page) || page < 1) page = 1

    const orders = await prisma.order.findMany({
      take,
      skip: (page - 1) * take,
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

    const totalOrders = await prisma.order.count()
    const totalPages = Math.ceil(totalOrders / take)

    return {
      totalPages,
      currentPage: page,
      orders,
    }
  })
