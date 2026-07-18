'use server'

import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'
import { PaginatedOrders } from '@/schemas/order'
import { WithPagination } from '@/schemas/shared'

export const getMyOrders = safeAuthClient
  .inputSchema(WithPagination)
  .outputSchema(PaginatedOrders)
  .action(async ({ ctx, parsedInput }) => {
    let { page, take } = parsedInput
    if (Number.isNaN(page) || page < 1) page = 1
    const userId = ctx.user.id

    const orders = await prisma.order.findMany({
      take,
      skip: (page - 1) * take,
      where: { userId },
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

    const totalOrders = await prisma.order.count({ where: { userId } })
    const totalPages = Math.ceil(totalOrders / take)

    return {
      totalPages,
      currentPage: page,
      orders,
    }
  })
