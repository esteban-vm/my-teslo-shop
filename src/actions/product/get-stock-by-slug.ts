'use server'

import { sleep } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeClient } from '@/lib/safe-action'
import { WithSlug } from '@/schemas/shared'

export const getStockBySlug = safeClient.inputSchema(WithSlug).action(async ({ parsedInput }) => {
  await sleep(2)

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
