'use server'

import { cache } from 'react'
import { sleep } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { safeClient } from '@/lib/safe-action'

export const getCountries = safeClient.action(
  cache(async () => {
    await sleep()
    const countries = await prisma.country.findMany({ orderBy: { name: 'asc' } })
    return countries
  })
)
