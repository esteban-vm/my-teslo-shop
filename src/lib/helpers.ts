import type { ParamValue } from 'next/dist/server/request/params'
import type { StaticImport } from 'next/dist/shared/lib/get-img-props'
import type { WithPagination } from '@/schemas/shared'
import type { CartProduct } from '@/types'

export function formatPrice(price: number) {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
}

export function sleep(seconds = 1) {
  if (process.env.NODE_ENV !== 'development') return

  return new Promise((resolve) => {
    setTimeout(() => resolve(true), seconds * 1000)
  })
}

export function isSameProduct(product1: CartProduct, product2: CartProduct) {
  return product1.id === product2.id && product1.size === product2.size
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

export function getProductImage(src?: string | StaticImport) {
  let imageSrc: string | StaticImport

  if (typeof src === 'string') {
    if (src.startsWith('http')) imageSrc = src
    else imageSrc = `/products/${src}`
  } else if (src === undefined) {
    imageSrc = '/imgs/placeholder.jpg'
  } else {
    imageSrc = src
  }

  return imageSrc
}
