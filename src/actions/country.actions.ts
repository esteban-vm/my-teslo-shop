'use server'

import type { Country } from '@/prisma/generated/client'
import { prisma } from '@/lib/prisma'

export async function getCountries(): Promise<Country[]> {
  const countries = await prisma.country.findMany({ orderBy: { name: 'asc' } })
  return countries
}
