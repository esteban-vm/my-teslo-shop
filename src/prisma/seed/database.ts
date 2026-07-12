import type { CategoryName, Prisma } from '../generated/client'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { countries, products, users } from '../data'

async function main() {
  await Promise.all([
    prisma.user.deleteMany(),
    prisma.verification.deleteMany(),
    prisma.country.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ])

  await prisma.country.createMany({ data: countries })

  for (const seedUser of users) {
    const { email, name, role } = seedUser
    await auth.api.signUpEmail({ body: { email, name, password: 'Abcd123*' } })
    await prisma.user.update({ where: { email }, data: { role, emailVerified: true } })
  }

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

  for (const seedProduct of products) {
    const { images, category, ...rest } = seedProduct

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
