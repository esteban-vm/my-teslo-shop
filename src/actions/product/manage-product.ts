'use server'

import type { Product } from '@/prisma/generated/client'
import { sleep } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { ProductDTO } from '@/schemas/product'

export const manageProduct = safeAdminClient.inputSchema(ProductDTO).action(async ({ parsedInput }) => {
  await sleep(3)

  await prisma.$transaction(async (_tx) => {
    const { id, slug, tags, ...rest } = parsedInput

    await prisma.product.upsert({
      where: { id },
      create: {} as Product,
      update: {
        ...rest,
        slug: slug.replace(/\s+|\W/g, '_'),
        tags: tags.split(', '),
      },
    })
  })
})
