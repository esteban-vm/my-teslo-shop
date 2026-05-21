'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'rsc-daisyui'
import { closeSidebar } from '@/lib/utils'

export interface NavLinkProps<T extends string> {
  text: string
  href?: Route<T>
  icon?: React.JSX.Element
}

export function NavLink<T extends string>({ text, href = '/', icon }: NavLinkProps<T>) {
  const pathname = usePathname()

  return (
    <Link href={href} onNavigate={closeSidebar} passHref>
      <Menu.Item active={pathname === href} as='span'>
        {icon}
        {text}
      </Menu.Item>
    </Link>
  )
}
