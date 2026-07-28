import { z } from 'zod'
import { CategoryName } from '@/prisma/generated/enums'
import './config'

export const CategoryResult = z.object({ id: z.string(), name: z.enum(CategoryName) })
export const CategoryResults = z.array(CategoryResult)

export type CategoryResult = z.infer<typeof CategoryResult>
export type CategoryResults = z.infer<typeof CategoryResults>
