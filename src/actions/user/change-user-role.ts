'use server'

import type { Route } from 'next'
import { revalidatePath } from 'next/cache'
import { sleep } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { ChangeUserRole } from '@/schemas/user'

export const changeUserRole = safeAdminClient.inputSchema(ChangeUserRole).action(async ({ ctx, parsedInput }) => {
  await sleep(3)

  const { userId, role } = parsedInput
  if (userId === ctx.user.id) return null

  await prisma.user.update({ where: { id: userId }, data: { role } })
  revalidatePath('/admin/users' satisfies Route)
})
