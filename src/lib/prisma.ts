import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/prisma/generated/client'

const pgAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const isNotProduction = process.env.NODE_ENV !== 'production'

export const prisma = new PrismaClient({
  adapter: pgAdapter,
  errorFormat: 'pretty',
  log: isNotProduction ? ['query'] : undefined,
})

const globalForPrisma = global as typeof global & { prisma: typeof prisma }

if (isNotProduction) {
  globalForPrisma.prisma = prisma
}
