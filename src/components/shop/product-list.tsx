import type { Route } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Button, List } from 'rsc-daisyui'

export interface ProductListProps {
  title?: string
  link?: Route
  linkTitle?: string
  children: ReactNode
}

export function ProductList({ title, link, linkTitle, children }: ProductListProps) {
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
          <Button as={Link} className='p-0 hover:opacity-75' color='info' href={link} link size='sm'>
            {linkTitle}
          </Button>
        </li>
      )}
      {children}
    </List>
  )
}
