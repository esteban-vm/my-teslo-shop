'use server'

import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'
import { AddressDAO } from '@/schemas/address'

export const getBillingAddress = safeAuthClient.outputSchema(AddressDAO.nullable()).action(async ({ ctx }) => {
  const address = await prisma.billingAddress.findUnique({ where: { userId: ctx.user.id } })
  return address
})
