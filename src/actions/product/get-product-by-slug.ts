'use server'

import type { ProductResult } from '@/types'
import { prisma } from '@/lib/prisma'

export async function getProductBySlug(slug: string): Promise<ProductResult | null> {
  const product = await prisma.product.findFirst({
    where: { slug },
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
}
