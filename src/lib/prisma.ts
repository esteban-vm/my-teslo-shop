import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/prisma/generated/client'

const isNotProduction = process.env.NODE_ENV !== 'production'

const pgAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter: pgAdapter,
  errorFormat: 'pretty',
  log: isNotProduction ? ['query', 'error', 'info', 'warn'] : undefined,
})

const globalForPrisma = global as typeof global & {
  prisma: typeof prisma
}

if (isNotProduction) {
  globalForPrisma.prisma = prisma
}

export { prisma }
