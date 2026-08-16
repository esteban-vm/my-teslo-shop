import type { ParamValue } from 'next/dist/server/request/params'
import type { WithPagination } from '@/schemas/shared'

export function sleep(seconds = 1) {
  if (process.env.NODE_ENV !== 'development') return

  return new Promise((resolve) => {
    setTimeout(() => resolve(true), seconds * 1000)
  })
}

export async function getParams(searchParams: Promise<Record<string, ParamValue>>) {
  let { page = '1', take = '12' } = await searchParams

  if (Array.isArray(page)) page = '1'
  if (Array.isArray(take)) take = '12'

  return {
    page: Number.parseInt(page, 10),
    take: Number.parseInt(take, 10),
  }
}

export function getPagination(input: WithPagination) {
  const { page, take } = input

  let pageNumber = Number(page)
  let takeNumber = Number(take)

  if (Number.isNaN(pageNumber) || pageNumber < 1) pageNumber = 1
  if (Number.isNaN(takeNumber) || takeNumber < 1) takeNumber = 12

  return {
    page: pageNumber,
    take: takeNumber,
  }
}

export function capitalize(value: string) {
  return value
    .toLowerCase()
    .split(' ')
    .filter((p) => p.trim() !== '')
    .map((p) => {
      return p
        .split(/([-'])/)
        .map((part) => {
          return part.match(/[-']/) ? part : part[0]?.toUpperCase() + part.slice(1)
        })
        .join('')
    })
    .join(' ')
}
