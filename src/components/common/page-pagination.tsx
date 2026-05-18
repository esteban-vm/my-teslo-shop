'use client'

import type { Route } from 'next'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Join } from 'rsc-daisyui'
import { ELLIPSIS_CHAR } from '@/lib/constants'
import { generatePaginationNumbers } from '@/lib/pagination'

export interface PagePaginationProps {
  totalPages: number
}

export function PagePagination({ totalPages }: PagePaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Math.floor(Math.abs(Number(searchParams.get('page')))) || 1
  const allPages = generatePaginationNumbers(currentPage, totalPages)

  const createPageUrl = (page: number | string): Route => {
    const params = new URLSearchParams(searchParams)
    const pageNumber = +page

    if (page === ELLIPSIS_CHAR || pageNumber > totalPages) {
      return `${pathname}?${params.toString()}` as Route
    }

    if (pageNumber <= 0) {
      return `${pathname}` as Route
    }

    params.set('page', page.toString())
    return `${pathname}?${params.toString()}` as Route
  }

  return (
    <div className='mb-4 text-center'>
      <Join>
        <Join.Button
          as={Link}
          disabled={currentPage === 1}
          href={createPageUrl(currentPage - 1)}
          shape='square'
          size='sm'
        >
          <ChevronLeft />
        </Join.Button>

        {allPages.map((page) => {
          return (
            <Join.Button
              active={currentPage === page}
              as={Link}
              href={createPageUrl(page)}
              key={crypto.randomUUID()}
              shape='square'
              size='sm'
            >
              {page}
            </Join.Button>
          )
        })}

        <Join.Button
          as={Link}
          disabled={totalPages === currentPage}
          href={createPageUrl(currentPage + 1)}
          shape='square'
          size='sm'
        >
          <ChevronRight />
        </Join.Button>
      </Join>
    </div>
  )
}
