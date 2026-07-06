'use client'

import type { Route } from 'next'
import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Link } from 'rsc-daisyui'

export interface LinkButtonProps {
  disabled: boolean
  to: Route
  children: ReactNode
}

export function LinkButton({ to, ...rest }: LinkButtonProps) {
  const router = useRouter()

  return (
    <Link
      as='button'
      className='font-semibold disabled:cursor-not-allowed disabled:opacity-80'
      color='info'
      hover
      onClick={() => router.push(to)}
      type='button'
      {...rest}
    />
  )
}
