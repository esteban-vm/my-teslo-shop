import { Drawer } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { DRAWER_ID } from '@/lib/constants'
import { Navbar } from './navbar'
import { Sidebar } from './sidebar'

export function Navigation({ children }: Props.WithChildren) {
  return (
    <Drawer className='min-h-screen' end id={DRAWER_ID} theme=''>
      <Drawer.Content className='relative flex flex-col'>
        <Navbar />
        <PageContainer>{children}</PageContainer>
      </Drawer.Content>
      <Sidebar />
    </Drawer>
  )
}

const PageContainer = tw.main`container mx-auto grid grid-cols-[repeat(auto-fit,minmax(--spacing(80),1fr))] gap-4 p-4`
