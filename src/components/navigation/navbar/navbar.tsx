import { Search } from 'lucide-react'
import { Navbar as $Navbar, Button, Menu } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { NavLink } from '@/components/shared'
import { CartLink } from './cart-link'
import { HomeLink } from './home-link'
import { MenuButton } from './menu-button'

export function Navbar() {
  return (
    <$Navbar as='nav' className='sticky top-0 z-20 w-full'>
      <HomeLink />
      <MenuContainer>
        <Menu as='menu' className='gap-0.5 p-0!' horizontal vanilla>
          <NavLink href='/gender/men' text='Hombres' type='navbar' />
          <NavLink href='/gender/women' text='Mujeres' type='navbar' />
          <NavLink href='/gender/kids' text='Niños' type='navbar' />
        </Menu>
      </MenuContainer>
      <div className='grow lg:hidden' />
      <ButtonContainer>
        <Button ghost shape='square' size='sm'>
          <Search />
        </Button>
        <CartLink />
        <MenuButton />
      </ButtonContainer>
    </$Navbar>
  )
}

const MenuContainer = tw.div`hidden grow text-center lg:block`
const ButtonContainer = tw.div`mr-3 flex items-center justify-center gap-1.5`
