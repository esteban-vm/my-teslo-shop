import type { ReactNode } from 'react'
import { Drawer } from 'rsc-daisyui'
import { DRAWER_ID } from '@/lib/constants'
import { Navbar } from './navbar'
import { Sidebar } from './sidebar'

export function Navigation({ children }: { children: ReactNode }) {
  return (
    <Drawer className='min-h-screen' end id={DRAWER_ID} theme=''>
      <Drawer.Content>
        <Navbar />
        {children}
      </Drawer.Content>
      <Drawer.Side as='aside' className='z-20 h-full' drawerId={DRAWER_ID}>
        <Sidebar />
      </Drawer.Side>
    </Drawer>
  )
}
