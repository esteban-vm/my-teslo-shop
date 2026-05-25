import { ELLIPSIS_CHAR } from './constants'

export function generatePaginationNumbers(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, ELLIPSIS_CHAR, totalPages - 1, totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, ELLIPSIS_CHAR, totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, ELLIPSIS_CHAR, currentPage - 1, currentPage, currentPage + 1, ELLIPSIS_CHAR, totalPages]
}

export function formatProductPrice(price: number) {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  })
}
