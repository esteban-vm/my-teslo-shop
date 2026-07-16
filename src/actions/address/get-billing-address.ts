'use server'

import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'
import { AddressResult } from '@/schemas/address'

export const getBillingAddress = safeAuthClient.outputSchema(AddressResult.nullable()).action(async ({ ctx }) => {
  const address = await prisma.billingAddress.findUnique({ where: { userId: ctx.user.id } })
  return address
})
