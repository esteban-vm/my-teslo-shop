'use server'

import { cache } from 'react'
import { ServerError } from '@/lib/errors'
import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'
import { AddressDB } from '@/schemas/address'

export const getBillingAddress = safeAuthClient.outputSchema(AddressDB).action(
  cache(async ({ ctx }) => {
    const address = await prisma.billingAddress.findUnique({ where: { userId: ctx.user.id } })

    if (!address) {
      throw new ServerError('Dirección no encontrada')
    }

    return address
  })
)
