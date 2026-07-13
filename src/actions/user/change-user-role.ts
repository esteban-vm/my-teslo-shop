'use server'

import type { Route } from 'next'
import { revalidatePath } from 'next/cache'
import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { ChangeUserRole } from '@/schemas/user'

export const changeUserRole = safeAdminClient.inputSchema(ChangeUserRole).action(async ({ ctx, parsedInput }) => {
  await sleepExecution(3)
  const { userId, role } = parsedInput
  if (userId === ctx.user.id) return
  await prisma.user.update({ where: { id: userId }, data: { role } })
  revalidatePath('/admin/users' satisfies Route)
})
