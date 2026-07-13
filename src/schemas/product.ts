import { z } from 'zod'
import { Gender } from '@/prisma/generated/client'
import { WithPagination } from './shared'

export const Products = WithPagination.extend({
  gender: z.enum(Gender).optional(),
})

export type Products = z.infer<typeof Products>
