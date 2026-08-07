'use server'

import { cache } from 'react'
import { getPagination } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeClient } from '@/lib/safe-action'
import { PaginatedProducts } from '@/schemas/product'
import { WithPaginationAndGender } from '@/schemas/shared'

export const getProducts = safeClient
  .inputSchema(WithPaginationAndGender)
  .outputSchema(PaginatedProducts)
  .action(
    cache(async ({ parsedInput }) => {
      const { gender, ...rest } = parsedInput
      const { page, take } = getPagination(rest)

      const products = await prisma.product.findMany({
        take,
        where: { gender },
        skip: (page - 1) * take,
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

      const totalProducts = await prisma.product.count({ where: { gender } })
      const totalPages = Math.ceil(totalProducts / take)

      return {
        totalPages,
        currentPage: page,
        products,
      }
    })
  )
