import type { DefaultSession } from 'next-auth'
import type { UserOmittedFields } from '@/lib/prisma'
import type { User as UserPrisma } from '@/prisma/generated/client'
import 'next-auth'
import 'next-auth/jwt'

type UserType = Omit<UserPrisma, UserOmittedFields>

declare module 'next-auth' {
  interface User extends UserType {}

  interface Session {
    user: UserType & DefaultSession['user']
  }
}
