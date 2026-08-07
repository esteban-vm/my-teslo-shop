'use server'

import { cache } from 'react'
import { ServerError } from '@/lib/errors'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { ProductDB } from '@/schemas/product'
import { WithID } from '@/schemas/shared'

export const getProductById = safeAdminClient
  .inputSchema(WithID)
  .outputSchema(ProductDB)
  .action(
    cache(async ({ parsedInput }) => {
      const product = await prisma.product.findFirst({
        where: {
          id: parsedInput.id,
        },
        include: {
          images: {
            select: {
              id: true,
              url: true,
            },
          },
        },
      })

      if (!product) {
        throw new ServerError('Producto no encontrado')
      }

      return product
    })
  )
