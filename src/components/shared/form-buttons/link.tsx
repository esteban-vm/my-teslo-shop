'use client'

import type { Route } from 'next'
import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Link } from 'rsc-daisyui'
import { Toasts } from '@/lib/toasts'

export interface LinkButtonProps {
  to: Route
  children: ReactNode
}

export function LinkButton({ to, ...rest }: LinkButtonProps) {
  const router = useRouter()

  const onNavigate = () => {
    Toasts.close()
    router.replace(to)
  }

  return (
    <Link
      as='button'
      className='mx-auto w-fit font-semibold disabled:cursor-not-allowed disabled:opacity-50'
      color='info'
      hover
      onClick={onNavigate}
      type='button'
      {...rest}
    />
  )
}
