import type { ReactNode } from 'react'
import { MenuIcon, Search, ShoppingCart } from 'lucide-react'
import { Button, Drawer, Indicator, Input, Menu, Navbar } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { DRAWER_ID, navbarLinks, sidebarLinks } from '@/lib/constants'
import { CloseButton, HomeLink, NavLink } from './components'

export function Navigation({ children }: { children: ReactNode }) {
  return (
    <Drawer className='min-h-screen' end id={DRAWER_ID} theme=''>
      <Drawer.Content className='relative flex flex-col'>
        <Navbar as='nav' className='sticky top-0 z-20 w-full'>
          <HomeLink />
          <MenuContainer>
            <Menu as='menu' className='gap-0.5 p-0!' horizontal vanilla>
              {navbarLinks.map((link) => (
                <NavLink key={link.text} {...link} />
              ))}
            </Menu>
          </MenuContainer>
          <div className='grow lg:hidden' />
          <ButtonContainer>
            <Button ghost shape='square' size='sm'>
              <Search />
            </Button>
            <Indicator>
              <Indicator.Badge ghost size='xs'>
                5
              </Indicator.Badge>
              <Button ghost shape='square' size='sm'>
                <ShoppingCart />
              </Button>
            </Indicator>
            <Button as='label' ghost htmlFor={DRAWER_ID} shape='square' size='sm'>
              <MenuIcon className='size-[90%]' />
            </Button>
          </ButtonContainer>
        </Navbar>
        {children}
      </Drawer.Content>
      <Drawer.Side as='aside' className='z-20 h-full' drawerId={DRAWER_ID}>
        <Menu as='menu' className='min-h-full w-fit bg-base-200 p-4' vanilla>
          <Menu.Title className='items-end'>
            <CloseButton />
          </Menu.Title>
          <Menu.Title>
            <Input as='label'>
              <Search />
              <input placeholder='Buscar' type='search' />
            </Input>
          </Menu.Title>
          {navbarLinks.map((link) => (
            <NavLink key={link.text} {...link} />
          ))}
          <Separator />
          {sidebarLinks.slice(0, 4).map((link) => (
            <NavLink key={link.text} {...link} />
          ))}
          <Separator />
          {sidebarLinks.slice(4).map((link) => (
            <NavLink key={link.text} {...link} />
          ))}
        </Menu>
      </Drawer.Side>
    </Drawer>
  )
}

const MenuContainer = tw.div`hidden grow text-center lg:block`
const ButtonContainer = tw.div`mr-3 flex items-center justify-center gap-1.5`
const Separator = tw.hr`mx-3 my-2 opacity-25`
