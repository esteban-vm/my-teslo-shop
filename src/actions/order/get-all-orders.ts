'use server'

import { getPagination } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { PaginatedOrders } from '@/schemas/order'
import { WithPagination } from '@/schemas/shared'

export const getAllOrders = safeAdminClient
  .inputSchema(WithPagination)
  .outputSchema(PaginatedOrders)
  .action(async ({ parsedInput }) => {
    const { page, take } = getPagination(parsedInput)

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
