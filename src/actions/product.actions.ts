'use server'

import type { Gender } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'

type ProductWithImageProps = Partial<{
  page: number
  take: number
  gender: Gender
}>

export async function getProductsWithImages({ page = 1, take = 12, gender }: ProductWithImageProps) {
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

interface ProductBySlugProps {
  slug: string
}

export async function getProductBySlug({ slug }: ProductBySlugProps) {
  const product = await prisma.product.findFirst({
    where: { slug },
    include: {
      images: {
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
