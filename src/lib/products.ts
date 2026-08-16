import type { CartProduct } from '@/types'

export function getProductImage(src?: string) {
  let imageSrc: string

  if (typeof src === 'string') {
    if (src.startsWith('http') || src.startsWith('/imgs')) imageSrc = src
    else imageSrc = `/products/${src}`
  } else {
    imageSrc = '/imgs/placeholder.jpg'
  }

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
