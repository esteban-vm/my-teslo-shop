'use server'

import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'

export async function getStockBySlug(slug: string): Promise<number> {
  try {
    await sleepExecution(3)

    const { stock } = await prisma.product.findFirstOrThrow({
      where: { slug },
      select: { stock: true },
    })

    return stock
  } catch {
    return 0
  }
}
