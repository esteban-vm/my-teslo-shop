'use server'

import type { ProductResult } from '@/types'
import { prisma } from '@/lib/prisma'
import { safeClient } from '@/lib/safe-action'
import { WithSlug } from '@/schemas/shared'

export const getProductBySlug = safeClient
  .inputSchema(WithSlug)
  .action(async ({ parsedInput }): Promise<ProductResult | null> => {
    const product = await prisma.product.findFirst({
      where: { slug: parsedInput.slug },
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
