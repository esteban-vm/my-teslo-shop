'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'rsc-daisyui'
import { closeSidebar } from '@/lib/utils'

export interface NavLinkProps<T extends string> extends Props.WithChildren {
  href?: Route<T>
}

export function NavLink<T extends string>({ href = '/', children }: NavLinkProps<T>) {
  const pathname = usePathname()

  return (
    <Link href={href} onNavigate={closeSidebar} passHref>
      <Menu.Item active={pathname === href} as='span'>
        {children}
      </Menu.Item>
    </Link>
  )
}
