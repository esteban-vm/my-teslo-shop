'use server'

import z from 'zod'
import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeClient } from '@/lib/safe-action'
import { WithSlug } from '@/schemas/shared'

export const getStockBySlug = safeClient
  .inputSchema(WithSlug)
  .outputSchema(z.number())
  .action(async ({ parsedInput }) => {
    await sleepExecution(2)

    try {
      const { stock } = await prisma.product.findFirstOrThrow({
        where: {
          slug: parsedInput.slug,
        },
        select: {
          stock: true,
        },
      })

      return stock
    } catch {
      return 0
    }
  })
