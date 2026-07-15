import type { Route } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Join } from 'rsc-daisyui'

interface PaginationButtonProps {
  to: Route
  isActive?: boolean
  isDisabled?: boolean
  children: ReactNode
}

export function PaginationButton({ to, isActive, isDisabled, children }: PaginationButtonProps) {
  return (
    <Join.Button active={isActive} as={Link} disabled={isDisabled} href={to} shape='square' size='sm'>
      {children}
    </Join.Button>
  )
}
