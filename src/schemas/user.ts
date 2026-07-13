import { z } from 'zod'
import { Role } from '@/prisma/generated/client'

export const ChangeUserRole = z.object({
  role: z.enum(Role),
  userId: z.string(),
})

export type ChangeUserRole = z.infer<typeof ChangeUserRole>
