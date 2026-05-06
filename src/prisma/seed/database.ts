import type { CategoryName, Prisma } from '@/generated/prisma/client'
import prisma from '@/lib/prisma'
import { initialProducts } from '@/prisma/data'

async function main() {
  await Promise.all([prisma.picture.deleteMany(), prisma.product.deleteMany(), prisma.category.deleteMany()])

  const categoriesDB = await prisma.category.createManyAndReturn({
    data: [{ name: 'Shirts' }, { name: 'Pants' }, { name: 'Hoodies' }, { name: 'Hats' }],
  })

  const categoriesMap = categoriesDB.reduce(
    (map, category) => {
      map[category.name] = category.id
      return map
    },
    {} as Record<CategoryName, string>
  )

  for (const { images, category, ...product } of initialProducts) {
    const productDB = await prisma.product.create({
      data: { ...product, categoryId: categoriesMap[category] },
    })

    await prisma.picture.createMany({
      data: images.map((image): Prisma.PictureCreateManyInput => {
        return { url: image, productId: productDB.id }
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
