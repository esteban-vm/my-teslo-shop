'use server'

import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeClient } from '@/lib/safe-action'
import { WithSlug } from '@/schemas/shared'

export const getStockBySlug = safeClient.inputSchema(WithSlug).action(async ({ parsedInput }): Promise<number> => {
  try {
    await sleepExecution(3)

    const { stock } = await prisma.product.findFirstOrThrow({
      where: { slug: parsedInput.slug },
      select: { stock: true },
    })

    return stock
  } catch {
    return 0
  }
})
