'use server'

import { prisma } from '@/lib/prisma'

export async function getCountries() {
  const countries = await prisma.country.findMany({ orderBy: { name: 'asc' } })
  return countries
}
