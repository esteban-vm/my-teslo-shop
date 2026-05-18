'use server'

import type { Gender } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'

export interface PaginationOptions {
  page?: number
  take?: number
  gender?: Gender
}

export async function getProductsWithImages({ page = 1, take = 12, gender }: PaginationOptions) {
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
    currentPage: page,
    totalPages,
    products: products.map((product) => {
      return {
        ...product,
        images: product.images.map((image) => image.url),
      }
    }),
  }
}
