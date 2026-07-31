'use server'

import { cache } from 'react'
import { sleep } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeClient } from '@/lib/safe-action'

export const getCategories = safeClient.action(
  cache(async () => {
    await sleep()
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })
    return categories
  })
)
