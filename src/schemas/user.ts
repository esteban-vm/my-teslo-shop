import { z } from 'zod'
import { Role } from '@/prisma/generated/client'
import { PaginatedResults, WithID } from './shared'

export const UserResult = WithID.extend({
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
