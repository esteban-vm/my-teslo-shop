'use server'

import { sleep } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { ProductForm } from '@/schemas/product'

export const manageProduct = safeAdminClient.inputSchema(ProductForm).action(async ({ parsedInput }) => {
  await sleep(3)

  const { id: productId } = await prisma.$transaction(async (tx) => {
    const { id, slug, tags, ...rest } = parsedInput

    const data = {
      ...rest,
      slug: slug.replace(/\s+|\W/g, '_'),
      tags: tags.split(', '),
    }

    return await tx.product.upsert({
      where: { id },
      create: data,
      update: data,
      select: { id: true },
    })
  })

  return { productId }
})
