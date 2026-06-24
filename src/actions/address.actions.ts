'use server'

import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { authClient } from '@/lib/safe-action'
import { AddressSchemas } from '@/schemas'

export const setAddress = authClient.inputSchema(AddressSchemas.AddressDTO).action(async ({ ctx, parsedInput }) => {
  await sleepExecution(1)

  const userId = ctx.user.id
  const { remember: _, ...rest } = parsedInput
  const data = { userId, ...rest }

  const address = await prisma.userAddress.upsert({
    where: { userId },
    create: data,
    update: data,
  })

  return address
})
