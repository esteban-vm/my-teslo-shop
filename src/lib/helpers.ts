import type { WithPagination } from '@/schemas/shared'
import type { CartProduct } from '@/types'

export function formatProductPrice(price: number) {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
}

export function sleepExecution(seconds = 1) {
  if (process.env.NODE_ENV !== 'development') return

  return new Promise((resolve) => {
    setTimeout(() => resolve(true), seconds * 1000)
  })
}

export function isSameProduct(product1: CartProduct, product2: CartProduct) {
  return product1.id === product2.id && product1.size === product2.size
}

export async function getSearchParams(searchParams: Promise<Record<string, string | string[] | undefined>>) {
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
