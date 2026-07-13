'use server'

import type { UserResult } from '@/types'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'

export const getUsers = safeAdminClient.action(async (): Promise<UserResult[]> => {
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

  return users
})
