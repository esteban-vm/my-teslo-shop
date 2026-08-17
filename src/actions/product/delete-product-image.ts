'use server'

import type { Route } from 'next'
import { revalidatePath } from 'next/cache'
import { deleteImage } from '@/lib/cloudinary'
import { DEFAULT_IMAGE_URL } from '@/lib/constants'
import { sleep } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { ProductImage } from '@/schemas/product'

export const deleteProductImage = safeAdminClient.inputSchema(ProductImage).action(async ({ parsedInput }) => {
  await sleep(3)

  const { id, url } = parsedInput
  if (!url.startsWith('http')) return

  const { id: productId, slug: productSlug } = await prisma.$transaction(async (tx) => {
    const imageName = url.split('/').pop()?.split('.')[0] ?? ''
    await deleteImage(imageName)

    const { product } = await tx.picture.delete({
      where: { id },
      select: {
        product: {
          select: {
            id: true,
            slug: true,
          },
        },
      },
    })

    await tx.picture.create({ data: { url: DEFAULT_IMAGE_URL, productId: product.id } })
    return product
  })

  revalidatePath('/admin/products' satisfies Route)
  revalidatePath(`/admin/product/${productId}` satisfies Route<`/admin/product/${string}`>)
  revalidatePath(`/product/${productSlug}` satisfies Route<`/product/${string}`>)
})
