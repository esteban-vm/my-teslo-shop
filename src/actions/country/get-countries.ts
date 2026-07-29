'use server'

import { cache } from 'react'
import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeClient } from '@/lib/safe-action'

export const getCountries = safeClient.action(
  cache(async () => {
    await sleepExecution()
    const countries = await prisma.country.findMany({ orderBy: { name: 'asc' } })
    return countries
  })
)
