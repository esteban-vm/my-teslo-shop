import type { CategoryName, Prisma } from '../generated/client'
import { prisma } from '@/lib/prisma'
import { countries, products } from '../data'

async function main() {
  await prisma.user.deleteMany()
  await prisma.verification.deleteMany()
  await prisma.country.deleteMany()
  await prisma.picture.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  await prisma.country.createMany({ data: countries })

  const categories = await prisma.category.createManyAndReturn({
    data: [{ name: 'Shirts' }, { name: 'Pants' }, { name: 'Hoodies' }, { name: 'Hats' }],
  })

  const categoryMap = categories.reduce(
    (map, category) => {
      map[category.name] = category.id
      return map
    },
    {} as Record<CategoryName, string>
  )

  for (const initialProduct of products) {
    const { images, category, ...rest } = initialProduct

    const product = await prisma.product.create({
      data: { ...rest, categoryId: categoryMap[category] },
    })

    await prisma.picture.createMany({
      data: images.map((image): Prisma.PictureCreateManyInput => {
        return { url: image, productId: product.id }
      }),
    })
  }
}

void (async () => {
  if (process.env.NODE_ENV === 'production') return

  try {
    console.log('Starting seeding.')
    await main()
    console.log('Seeding completed successfully.')
  } catch (error) {
    console.log(error)
  }
})()
