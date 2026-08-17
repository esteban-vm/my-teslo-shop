import type { CartProduct } from '@/types'
import { DEFAULT_IMAGE_URL } from './constants'

export function getProductImage(src: string) {
  let imageSrc: string
  if (src.startsWith('http') || src === DEFAULT_IMAGE_URL) imageSrc = src
  else imageSrc = `/products/${src}`
  return imageSrc
}

export function formatPrice(price: number) {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
}

export function isSameProduct(product1: CartProduct, product2: CartProduct) {
  return product1.id === product2.id && product1.size === product2.size
}
