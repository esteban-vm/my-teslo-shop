import type { CategoryName, Prisma } from '../generated/client'
import { prisma } from '@/lib/prisma'
import { initialProducts, initialUsers } from '../data'

async function main() {
  await prisma.user.deleteMany()
  await prisma.picture.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  await prisma.user.createMany({ data: initialUsers })

  const categories = await prisma.category.createManyAndReturn({
    data: [{ name: 'Shirts' }, { name: 'Pants' }, { name: 'Hoodies' }, { name: 'Hats' }],
  })

  const categoriesMap = categories.reduce(
    (map, category) => {
      map[category.name] = category.id
      return map
    },
    {} as Record<CategoryName, string>
  )

  for (const initialProduct of initialProducts) {
    const { images, category, ...rest } = initialProduct

    const product = await prisma.product.create({
      data: { ...rest, categoryId: categoriesMap[category] },
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
