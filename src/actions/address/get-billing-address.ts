'use server'

import { ServerError } from '@/lib/errors'
import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'
import { AddressDB } from '@/schemas/address'

export const getBillingAddress = safeAuthClient.outputSchema(AddressDB).action(async ({ ctx }) => {
  const address = await prisma.billingAddress.findUnique({ where: { userId: ctx.user.id } })

  if (!address) {
    throw new ServerError('Dirección no encontrada')
  }

  return address
})
