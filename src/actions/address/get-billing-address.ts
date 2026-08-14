'use server'

import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'
import { AddressDB } from '@/schemas/address'

export const getBillingAddress = safeAuthClient.outputSchema(AddressDB).action(async ({ ctx }) => {
  const address = await prisma.billingAddress.findUniqueOrThrow({ where: { userId: ctx.user.id } })
  return address
})
