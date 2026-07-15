import type { Route } from 'next'
import type { ReadonlyURLSearchParams } from 'next/navigation'
import { ELLIPSIS_CHAR } from './constants'

export function Pagination() {}

Pagination.getPageNumbers = getPageNumbers
Pagination.getPageUrl = getPageUrl
Pagination.getCurrentPage = getCurrentPage

interface GetPageNumbersParams {
  currentPage: number
  totalPages: number
}

function getPageNumbers({ currentPage, totalPages }: GetPageNumbersParams) {
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

interface GetPageUrlParams extends GetCurrentPageParams {
  page: number | string
  totalPages: number
  pathname: string
}

function getPageUrl({ page, searchParams, totalPages, pathname }: GetPageUrlParams): Route {
  const params = new URLSearchParams(searchParams)
  const pageNumber = +page

  if (page === ELLIPSIS_CHAR || pageNumber > totalPages) {
    return `${pathname}?${params.toString()}` as Route
  }

  if (pageNumber <= 0) {
    return pathname as Route
  }

  params.set('page', page.toString())
  return `${pathname}?${params.toString()}` as Route
}

interface GetCurrentPageParams {
  searchParams: ReadonlyURLSearchParams
}

function getCurrentPage({ searchParams }: GetCurrentPageParams) {
  return Math.floor(Math.abs(Number(searchParams.get('page')))) || 1
}
