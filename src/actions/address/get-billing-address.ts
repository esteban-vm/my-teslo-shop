'use server'

import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'

export const getBillingAddress = safeAuthClient.action(async ({ ctx }) => {
  const address = await prisma.billingAddress.findUnique({ where: { userId: ctx.user.id } })
  if (!address) return
  return address
})
