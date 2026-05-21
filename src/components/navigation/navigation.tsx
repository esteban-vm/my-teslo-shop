import type { ReactNode } from 'react'
import { Drawer } from 'rsc-daisyui'
import { DRAWER_ID } from '@/lib/constants'
import { Navbar } from './navbar'
import { Sidebar } from './sidebar'

export function Navigation({ children }: { children: ReactNode }) {
  return (
    <Drawer className='min-h-screen' end id={DRAWER_ID} theme=''>
      <Drawer.Content className='relative flex flex-col'>
        <Navbar />
        {children}
      </Drawer.Content>
      <Sidebar />
    </Drawer>
  )
}
