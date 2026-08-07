import { z } from 'zod'
import { Role } from '@/prisma/generated/enums'
import { PaginatedResults } from './shared'
import './config'

export const UserDB = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  role: z.enum(Role).nullable(),
})

export const UsersDB = z.array(UserDB)
export const PaginatedUsers = PaginatedResults.extend({ users: UsersDB })

export const UserRole = z.object({
  userId: z.string(),
  role: z.enum(Role).nullable(),
})

export type UserDB = z.infer<typeof UserDB>
export type UsersDB = z.infer<typeof UsersDB>
export type PaginatedUsers = z.infer<typeof PaginatedUsers>
export type UserRole = z.infer<typeof UserRole>
