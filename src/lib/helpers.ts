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

export async function getPageNumber(searchParams: Promise<Record<string, string | string[] | undefined>>) {
  let { page = '1' } = await searchParams
  if (Array.isArray(page)) page = '1'
  return Number.parseInt(page, 10)
}
