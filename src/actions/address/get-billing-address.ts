'use server'

import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'
import { AddressDB } from '@/schemas/address'

export const getBillingAddress = safeAuthClient.outputSchema(AddressDB.nullable()).action(async ({ ctx }) => {
  const address = await prisma.billingAddress.findUnique({ where: { userId: ctx.user.id } })
  return address
})
