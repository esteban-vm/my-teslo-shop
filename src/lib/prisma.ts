import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/prisma/generated/client'

const notProduction = process.env.NODE_ENV !== 'production'

const pgAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter: pgAdapter,
  errorFormat: 'minimal',
  log: notProduction ? ['query', 'error'] : undefined,
  transactionOptions: { timeout: 15_000 },
})

const globalForPrisma = global as typeof global & {
  prisma: typeof prisma
}

if (notProduction) {
  globalForPrisma.prisma = prisma
}

export { prisma }
