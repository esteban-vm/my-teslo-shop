import type { ReactNode } from 'react'
import { Drawer } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { Navbar } from './navbar'
import { Sidebar } from './sidebar'

export function Navigation({ children }: { children: ReactNode }) {
  const id = crypto.randomUUID()

  return (
    <Drawer className='min-h-screen' end id={id} theme=''>
      <Drawer.Content className='relative flex flex-col'>
        <Navbar drawerId={id} />
        <PageContainer>{children}</PageContainer>
      </Drawer.Content>
      <Sidebar drawerId={id} />
    </Drawer>
  )
}

const PageContainer = tw.main`container mx-auto grid grid-cols-[repeat(auto-fit,minmax(--spacing(80),1fr))] gap-4 p-4`
