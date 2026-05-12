import type { ReactNode } from 'react'
import { Menu as MenuIcon } from 'lucide-react'
import { Button, Drawer, Menu, Navbar } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'

export function Navigation({ children }: { children: ReactNode }) {
  return (
    <Drawer className='min-h-screen rounded' end id='my-drawer-3' theme=''>
      <Drawer.Content className='relative flex flex-col'>
        <Navbar className='sticky top-0 z-10 w-full'>
          <div className='mx-2 flex-1 px-2'>Navbar Title</div>
          <div className='hidden flex-none lg:block'>
            <Menu horizontal vanilla>
              <Menu.Item>Navbar Item 1</Menu.Item>
              <Menu.Item>Navbar Item 2</Menu.Item>
            </Menu>
          </div>
          <div className='flex-none lg:hidden'>
            <Button as='label' ghost htmlFor='my-drawer-3' shape='square'>
              <MenuIcon aria-label='icon' className='inline-block size-6 stroke-current' role='img' />
            </Button>
          </div>
        </Navbar>
        <PageContainer>{children}</PageContainer>
      </Drawer.Content>
      <Drawer.Side className='z-10 h-full lg:hidden' drawerId='my-drawer-3'>
        <Menu as='menu' className='min-h-full w-fit bg-base-200 p-4' vanilla>
          <Menu.Item>Sidebar Item 1</Menu.Item>
          <Menu.Item>Sidebar Item 2</Menu.Item>
        </Menu>
      </Drawer.Side>
    </Drawer>
  )
}

const PageContainer = tw.main`container mx-auto grid grid-cols-[repeat(auto-fit,minmax(--spacing(60),1fr))] gap-4 p-4`
