'use server'

import { cache } from 'react'
import { ServerError } from '@/lib/errors'
import { prisma } from '@/lib/prisma'
import { safeClient } from '@/lib/safe-action'
import { ProductDB } from '@/schemas/product'
import { WithSlug } from '@/schemas/shared'

export const getProductBySlug = safeClient
  .inputSchema(WithSlug)
  .outputSchema(ProductDB)
  .action(
    cache(async ({ parsedInput }) => {
      const product = await prisma.product.findFirst({
        where: {
          slug: parsedInput.slug,
        },
        include: {
          images: {
            take: 2,
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
