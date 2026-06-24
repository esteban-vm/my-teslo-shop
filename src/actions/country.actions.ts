'use server'

import type { Country } from '@/prisma/generated/client'
import { sleepExecution } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { actionClient } from '@/lib/safe-action'

export const getCountries = actionClient.action(async (): Promise<Country[]> => {
  await sleepExecution()
  const countries = await prisma.country.findMany({ orderBy: { name: 'asc' } })
  return countries
})
