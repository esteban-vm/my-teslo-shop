'use server'

import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { ProductDB } from '@/schemas/product'
import { WithID } from '@/schemas/shared'

export const getProductById = safeAdminClient
  .inputSchema(WithID)
  .outputSchema(ProductDB)
  .action(
    cache(async ({ parsedInput }) => {
      const product = await prisma.product.findFirstOrThrow({
        where: {
          id: parsedInput.id,
        },
        include: {
          images: {
            take: 2,
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
