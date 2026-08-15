'use server'

import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { ProductDB } from '@/schemas/product'
import { WithID } from '@/schemas/shared'

export const getProductById = safeAdminClient
  .inputSchema(WithID)
  .outputSchema(ProductDB.nullable())
  .action(
    cache(async ({ parsedInput }) => {
      const { id } = parsedInput
      if (id === 'new') return null

      const product = await prisma.product.findFirstOrThrow({
        where: { id },
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
