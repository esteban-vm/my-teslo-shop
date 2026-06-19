import type { Prisma } from '../generated/client'
import { hashSync } from 'bcryptjs'

export const initialUsers: Prisma.UserCreateManyInput[] = [
  {
    email: 'admin@email.com',
    name: 'Test Admin',
    password: hashSync('Abcd123*'),
    role: 'admin',
  },
  {
    email: 'client1@email.com',
    name: 'Test Client 1',
    password: hashSync('Abcd123*'),
    role: 'client',
  },
  {
    email: 'client2@email.com',
    name: 'Test Client 2',
    password: hashSync('Abcd123*'),
    role: 'client',
  },
  {
    email: 'client3@email.com',
    name: 'Test Client 3',
    password: hashSync('Abcd123*'),
    role: 'client',
  },
]
