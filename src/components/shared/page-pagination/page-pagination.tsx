'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Join } from 'rsc-daisyui'
import { Pagination } from '@/lib/pagination'
import { PaginationButton } from './pagination-button'

export interface PagePaginationProps {
  totalPages: number
}

export function PagePagination({ totalPages }: PagePaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Pagination.getCurrentPage({ searchParams })
  const pageNumbers = Pagination.getPageNumbers({ currentPage, totalPages })

  const getPageUrl = (page: string | number) => {
    return Pagination.getPageUrl({ page, searchParams, pathname, totalPages })
  }

  return (
    <div className='mb-2 text-center'>
      <Join>
        <PaginationButton isDisabled={currentPage === 1} to={getPageUrl(currentPage - 1)}>
          <ChevronLeft />
        </PaginationButton>

        {pageNumbers.map((page) => {
          return (
            <PaginationButton isActive={currentPage === page} key={crypto.randomUUID()} to={getPageUrl(page)}>
              {page}
            </PaginationButton>
          )
        })}

        <PaginationButton isDisabled={totalPages === currentPage || totalPages === 0} to={getPageUrl(currentPage + 1)}>
          <ChevronRight />
        </PaginationButton>
      </Join>
    </div>
  )
}
