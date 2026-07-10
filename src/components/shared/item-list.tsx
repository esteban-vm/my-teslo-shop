import type { Route } from 'next'
import type { ReactNode } from 'react'
import NextLink from 'next/link'
import { Link, List } from 'rsc-daisyui'

export interface ItemListProps {
  title?: string
  link?: Route
  linkTitle?: string
  children: ReactNode
}

export function ItemList({ title, link, linkTitle, children }: ItemListProps) {
  return (
    <List>
      {!title ? (
        <div className='pt-1.5' />
      ) : (
        <li className='px-4 pt-2'>
          <h2 className='font-semibold text-lg'>{title}</h2>
        </li>
      )}
      {link && linkTitle && (
        <li className='px-4'>
          <NextLink href={link} passHref prefetch={false}>
            <Link as='span' color='info' hover>
              {linkTitle}
            </Link>
          </NextLink>
        </li>
      )}
      {children}
    </List>
  )
}
