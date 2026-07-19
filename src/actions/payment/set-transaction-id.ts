'use server'

import z from 'zod'
import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'

export const setTransactionId = safeAuthClient
  .inputSchema(z.object({ orderId: z.string(), transactionId: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    const { orderId, transactionId } = parsedInput

    await prisma.order.update({
      where: {
        id: orderId,
        userId: ctx.user.id,
      },
      data: { transactionId },
    })
  })
