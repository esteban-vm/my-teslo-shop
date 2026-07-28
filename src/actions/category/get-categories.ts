'use server'

import { cache } from 'react'
import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeClient } from '@/lib/safe-action'
import { CategoryResults } from '@/schemas/category'

export const getCategories = safeClient.outputSchema(CategoryResults).action(
  cache(async () => {
    await sleepExecution()
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })
    return categories
  })
)
