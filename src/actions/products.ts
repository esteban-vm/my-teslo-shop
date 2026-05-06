'use server'

import { prisma } from '@/lib/prisma'

export async function getProductsWithImages({ page = 1, take = 12 }: { page?: number; take?: number }) {
  if (Number.isNaN(page) || page < 1) page = 1

  const products = await prisma.product.findMany({
    take,
    skip: (page - 1) * take,
    include: {
      images: {
        take: 2,
        select: { url: true },
      },
    },
  })

  const totalProducts = await prisma.product.count()
  const totalPages = Math.ceil(totalProducts / take)

  return { currentPage: page, totalPages, products }
}
