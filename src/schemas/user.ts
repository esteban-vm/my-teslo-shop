import { z } from 'zod'
import { Role } from '@/prisma/generated/enums'
import { PaginatedResults } from './shared'
import './config'

export const UserResult = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  role: z.enum(Role).nullable(),
})

export const UserResults = z.array(UserResult)
export const PaginatedUsers = PaginatedResults.extend({ users: UserResults })

export const UserRoleDTO = z.object({
  userId: z.string(),
  role: z.enum(Role).nullable(),
})

export type UserRoleDTO = z.infer<typeof UserRoleDTO>
export type UserResult = z.infer<typeof UserResult>
export type UserResults = z.infer<typeof UserResults>
export type PaginatedUsers = z.infer<typeof PaginatedUsers>
