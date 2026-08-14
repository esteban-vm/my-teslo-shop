'use server'

import { redirect } from 'next/navigation'
import { sleep } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'
import { AddressForm } from '@/schemas/address'

export const manageAddress = safeAuthClient.inputSchema(AddressForm).action(async ({ ctx, parsedInput }) => {
  await sleep(3)

  const userId = ctx.auth.user.id
  const { remember, ...rest } = parsedInput

  if (remember) {
    const data = { userId, ...rest }
    await prisma.billingAddress.upsert({ where: { userId }, create: data, update: data })
  } else {
    const address = await prisma.billingAddress.findUnique({ where: { userId } })

    if (address) {
      await prisma.billingAddress.delete({ where: { id: address.id } })
    }
  }

  redirect('/checkout')
})
