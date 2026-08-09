'use server'

import type { Route } from 'next'
import { revalidatePath } from 'next/cache'
import { sleep } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { ProductForm } from '@/schemas/product'

export const manageProduct = safeAdminClient.inputSchema(ProductForm).action(async ({ parsedInput }) => {
  await sleep(3)

  const { id: productId, slug: productSlug } = await prisma.$transaction(async (tx) => {
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
      select: { id: true, slug: true },
    })
  })

  revalidatePath('/admin/products' satisfies Route)
  revalidatePath(`/admin/product/${productId}` satisfies Route<`/admin/product/${string}`>)
  revalidatePath(`/product/${productSlug}` satisfies Route<`/product/${string}`>)

  return { productId, productSlug }
})
