'use server'

import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import { safeClient } from '@/lib/safe-action'
import { ProductDB } from '@/schemas/product'
import { WithSlug } from '@/schemas/shared'

export const getProductBySlug = safeClient
  .inputSchema(WithSlug)
  .outputSchema(ProductDB)
  .action(
    cache(async ({ parsedInput }) => {
      const product = await prisma.product.findFirstOrThrow({
        where: {
          slug: parsedInput.slug,
        },
        include: {
          images: {
            select: {
              id: true,
              url: true,
            },
          },
          category: {
            select: { name: true },
          },
        },
        omit: {
          categoryId: true,
        },
      })

      return product
    })
  )
