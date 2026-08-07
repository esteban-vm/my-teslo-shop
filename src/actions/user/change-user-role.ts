'use server'

import type { Route } from 'next'
import { revalidatePath } from 'next/cache'
import { sleep } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { UserDB, UserRole } from '@/schemas/user'

export const changeUserRole = safeAdminClient
  .inputSchema(UserRole)
  .outputSchema(UserDB.nullable())
  .action(async ({ ctx, parsedInput }) => {
    await sleep(3)

    const { userId, role } = parsedInput
    if (userId === ctx.user.id) return null

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    revalidatePath('/admin/users' satisfies Route)
    return user
  })
