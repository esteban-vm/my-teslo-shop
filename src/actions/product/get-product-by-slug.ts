'use server'

import { prisma } from '@/lib/prisma'
import { safeClient } from '@/lib/safe-action'
import { ProductResult } from '@/schemas/product'
import { WithSlug } from '@/schemas/shared'

export const getProductBySlug = safeClient
  .inputSchema(WithSlug)
  .outputSchema(ProductResult.nullable())
  .action(async ({ parsedInput }) => {
    const product = await prisma.product.findFirst({
      where: {
        slug: parsedInput.slug,
      },
      include: {
        images: {
          take: 2,
          select: { url: true },
        },
      },
    })

    if (!product) return null

    return {
      ...product,
      images: product.images.map((image) => image.url),
    }
  })
