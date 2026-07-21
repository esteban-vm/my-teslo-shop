import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/prisma/generated/client'

const pgAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter: pgAdapter,
  errorFormat: 'pretty',
  log: ['query', 'error'],
})

const globalForPrisma = global as typeof global & {
  prisma: typeof prisma
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export { prisma }
