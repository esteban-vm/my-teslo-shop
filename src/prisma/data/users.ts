import type { Prisma } from '../generated/client'

type SeedUser = Omit<Prisma.UserCreateManyInput, 'emailVerified' | 'createdAt' | 'updatedAt'>

export const users: SeedUser[] = [
  {
    email: 'user1@example.com',
    name: 'Test User',
    role: 'client',
  },
  {
    email: 'user2@example.com',
    name: 'Test User 2',
    role: 'client',
  },
  {
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
  },
]
