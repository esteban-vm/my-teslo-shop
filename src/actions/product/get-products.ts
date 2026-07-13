'use server'

import type { Paginated, ProductResult } from '@/types'
import { prisma } from '@/lib/prisma'
import { safeClient } from '@/lib/safe-action'
import { Products } from '@/schemas/product'

export const getProducts = safeClient
  .inputSchema(Products)
  .action(async ({ parsedInput }): Promise<Paginated<{ products: ProductResult[] }>> => {
    let { page = 1, take = 12, gender } = parsedInput
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
