import { z } from 'zod'
import { Gender } from '@/prisma/generated/client'

export const ProductsDTO = z.object({
  page: z.number(),
  take: z.number(),
  gander: z.enum(Gender),
})
