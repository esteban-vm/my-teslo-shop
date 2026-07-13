import { z } from 'zod'
import { Role } from '@/prisma/generated/client'

export const UserRole = z.object({
  role: z.enum(Role).nullable(),
  userId: z.string(),
})

export type UserRole = z.infer<typeof UserRole>
