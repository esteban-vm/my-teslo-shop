'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'rsc-daisyui'
import { closeSidebar } from '@/lib/ui'

export interface NavLinkProps<T extends string> {
  text: string
  href: Route<T>
  type?: 'navbar' | 'sidebar'
  icon?: React.JSX.Element
}

export function NavLink<T extends string>({ text, href, type = 'sidebar', icon }: NavLinkProps<T>) {
  const pathname = usePathname()

  return (
    <Link href={href} onNavigate={type === 'sidebar' ? closeSidebar : undefined} passHref>
      <Menu.Item active={type === 'navbar' ? pathname === href : undefined} as='span'>
        {type === 'sidebar' ? icon : null}
        {text}
      </Menu.Item>
    </Link>
  )
}
