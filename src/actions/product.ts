'use server'

import type { Gender } from '@/prisma/generated/client'
import type { ProductResult } from '@/types'
import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'

interface GetProductsParams {
  page: number
  take: number
  gender: Gender
}

interface GetProductsResult {
  currentPage: number
  totalPages: number
  products: ProductResult[]
}

export async function getProducts({
  page = 1,
  take = 12,
  gender,
}: Partial<GetProductsParams>): Promise<GetProductsResult> {
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

export async function getProductBySlug(slug: string): Promise<ProductResult | null> {
  const product = await prisma.product.findFirst({
    where: { slug },
    include: {
      images: {
        take: 2,
        select: { url: true },
      },
    },
  })

  if (!product) return null

  return {
    ...product,
    images: product.images.map((image) => image.url),
  }
}

export async function getStockBySlug(slug: string): Promise<number> {
  try {
    await sleepExecution(3)

    const { stock } = await prisma.product.findFirstOrThrow({
      where: { slug },
      select: { stock: true },
    })

    return stock
  } catch {
    return 0
  }
}
