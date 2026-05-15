'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { Menu } from 'rsc-daisyui'
import { closeSidebar } from '@/lib/utils'

export interface NavLinkProps extends Props.WithChildren {
  href?: Route
}

export function NavLink({ href = '/', children }: NavLinkProps) {
  return (
    <Link href={href} onNavigate={closeSidebar} passHref>
      <Menu.Item as='span' className='font-semibold'>
        {children}
      </Menu.Item>
    </Link>
  )
}
