'use server'

import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { ProductResult } from '@/schemas/product'
import { WithID } from '@/schemas/shared'

export const getProductById = safeAdminClient
  .inputSchema(WithID)
  .outputSchema(ProductResult.nullable())
  .action(
    cache(async ({ parsedInput }) => {
      const product = await prisma.product.findFirst({
        where: {
          id: parsedInput.id,
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
  )
