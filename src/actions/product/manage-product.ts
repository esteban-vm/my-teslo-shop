'use server'

import type { Product } from '@/prisma/generated/client'
import type { Size } from '@/prisma/generated/enums'
import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { ProductDTO } from '@/schemas/product'

export const manageProduct = safeAdminClient.inputSchema(ProductDTO).action(async ({ parsedInput }) => {
  await sleepExecution(3)

  await prisma.$transaction(async (_tx) => {
    const { id, ...rest } = parsedInput

    await prisma.product.upsert({
      where: { id },
      create: {} as Product,
      update: {
        ...rest,
        sizes: { set: rest.sizes as Size[] },
      },
    })
  })
})
