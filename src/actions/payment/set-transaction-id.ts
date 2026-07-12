'use server'

import { prisma } from '@/lib/prisma'
import { safeAuthClient } from '@/lib/safe-action'
import { TransactionDTO } from '@/schemas/order'

export const setTransactionId = safeAuthClient.inputSchema(TransactionDTO).action(async ({ ctx, parsedInput }) => {
  const { orderId, transactionId } = parsedInput

  await prisma.order.update({
    where: {
      id: orderId,
      userId: ctx.user.id,
    },
    data: { transactionId },
  })
})
