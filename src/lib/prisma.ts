import type { Prisma } from '@/prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/prisma/generated/client'

const isNotProduction = process.env.NODE_ENV !== 'production'

const omitConfig = {
  user: {
    active: true,
    password: true,
    createdAt: true,
    updatedAt: true,
  },
} as const satisfies Prisma.GlobalOmitConfig

const pgAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  omit: omitConfig,
  adapter: pgAdapter,
  errorFormat: 'pretty',
  log: isNotProduction ? ['query'] : undefined,
})

const globalForPrisma = global as typeof global & {
  prisma: typeof prisma
}

if (isNotProduction) {
  globalForPrisma.prisma = prisma
}

export type UserOmittedFields = keyof (typeof omitConfig)['user']

export { prisma }
