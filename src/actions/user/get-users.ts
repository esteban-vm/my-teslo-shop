'use server'

import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { WithPagination } from '@/schemas/shared'
import { PaginatedUsers } from '@/schemas/user'

export const getUsers = safeAdminClient
  .inputSchema(WithPagination)
  .outputSchema(PaginatedUsers)
  .action(async ({ parsedInput }) => {
    let { page = 1, take = 12 } = parsedInput
    if (Number.isNaN(page) || page < 1) page = 1

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
      orderBy: {
        name: 'desc',
      },
    })

    const totalUsers = await prisma.user.count()
    const totalPages = Math.ceil(totalUsers / take)

    return {
      totalPages,
      currentPage: page,
      users,
    }
  })
