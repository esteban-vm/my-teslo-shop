'use server'

import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'
import { AddressDB } from '@/schemas/address'

export const getBillingAddress = safeAuthClient.outputSchema(AddressDB.nullable()).action(
  cache(async ({ ctx }) => {
    const address = await prisma.billingAddress.findUnique({ where: { userId: ctx.auth.user.id } })
    return address
  })
)
