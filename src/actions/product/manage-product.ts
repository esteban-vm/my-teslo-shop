'use server'

import type { Route } from 'next'
import type { Prisma } from '@/prisma/generated/client'
import { revalidatePath } from 'next/cache'
import { uploadImage } from '@/lib/cloudinary'
import { DEFAULT_IMAGE_URL } from '@/lib/constants'
import { capitalize, sleep } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeAdminClient } from '@/lib/safe-action'
import { ProductForm } from '@/schemas/product'

export const manageProduct = safeAdminClient.inputSchema(ProductForm).action(async ({ parsedInput }) => {
  await sleep(3)

  const { productId, productSlug } = await prisma.$transaction(async (tx) => {
    const { id = '', title, slug, tags, price, category, uploads, ...rest } = parsedInput

    const { id: categoryId } = await tx.category.findUniqueOrThrow({
      where: { name: category },
      select: { id: true },
    })

    const data = {
      ...rest,
      categoryId,
      title: capitalize(title),
      price: Number(price.toFixed(2)),
      slug: slug.toLowerCase().replace(/\s+|\W/g, '_'),
      tags: tags.toLowerCase().split(', '),
    }

    const { id: productId, slug: productSlug } = await tx.product.upsert({
      where: { id },
      create: data,
      update: data,
      select: { id: true, slug: true },
    })

    if (uploads) {
      const urls: string[] = []

      for (const upload of uploads) {
        const buffer = await upload.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')
        const { secure_url } = await uploadImage(`data:image/png;base64,${base64Image}`)
        urls.push(secure_url)
      }

      await tx.picture.createMany({ data: urls.map((url) => ({ url, productId })) })
    } else if (!id) {
      const pictureInput: Prisma.PictureCreateManyInput = { url: DEFAULT_IMAGE_URL, productId }
      await tx.picture.createMany({ data: [pictureInput, pictureInput] })
    }

    return { productId, productSlug }
  })

  revalidatePath('/admin/products' satisfies Route)
  revalidatePath(`/admin/product/${productId}` satisfies Route<`/admin/product/${string}`>)
  revalidatePath(`/product/${productSlug}` satisfies Route<`/product/${string}`>)

  return { productId, productSlug }
})
