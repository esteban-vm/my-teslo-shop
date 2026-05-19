'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { Menu } from 'rsc-daisyui'
import { closeSidebar } from '@/lib/utils'

export interface NavLinkProps<T extends string> extends Props.WithChildren {
  href?: Route<T>
}

export function NavLink<T extends string>({ href = '/', children }: NavLinkProps<T>) {
  return (
    <Link href={href} onNavigate={closeSidebar} passHref>
      <Menu.Item as='span' className='font-semibold'>
        {children}
      </Menu.Item>
    </Link>
  )
}
