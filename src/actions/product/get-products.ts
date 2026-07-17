'use server'

import { prisma } from '@/lib/prisma'
import { safeClient } from '@/lib/safe-action'
import { PaginatedProducts, WithPaginationAndGender } from '@/schemas/product'

export const getProducts = safeClient
  .inputSchema(WithPaginationAndGender)
  .outputSchema(PaginatedProducts)
  .action(async ({ parsedInput }) => {
    let { page, take, gender } = parsedInput
    if (Number.isNaN(page) || page < 1) page = 1

    const products = await prisma.product.findMany({
      take,
      where: { gender },
      skip: (page - 1) * take,
      include: {
        images: {
          take: 2,
          select: { url: true },
        },
      },
    })

    const totalProducts = await prisma.product.count({ where: { gender } })
    const totalPages = Math.ceil(totalProducts / take)

    return {
      totalPages,
      currentPage: page,
      products: products.map((product) => {
        return {
          ...product,
          images: product.images.map((image) => image.url),
        }
      }),
    }
  })
