'use server'

import { redirect } from 'next/navigation'
import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { authClient } from '@/lib/safe-action'
import { AddressSchemas } from '@/schemas'

export const manageAddress = authClient.inputSchema(AddressSchemas.AddressDTO).action(async ({ ctx, parsedInput }) => {
  await sleepExecution(3)

  const userId = ctx.user.id
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

export const getBillingAddress = authClient.action(async ({ ctx }) => {
  const address = await prisma.billingAddress.findUnique({ where: { userId: ctx.user.id } })
  if (!address) return
  return address
})
