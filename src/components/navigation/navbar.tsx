import { MenuIcon, Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Button, Navbar as DaisyNavbar, Indicator, Menu } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { DRAWER_ID } from '@/lib/constants'
import { NavLink } from './nav-link'

export function Navbar() {
  return (
    <DaisyNavbar as='nav' className='sticky top-0 z-10 w-full'>
      <Link className='ml-3 font-montserrat hover:opacity-75' href='/'>
        <span className='font-semibold text-rose-700'>Teslo</span> | Shop
      </Link>
      <MenuContainer>
        <Menu as='menu' className='gap-0.5 p-0!' horizontal vanilla>
          <NavLink href='/gender/men'>Hombres</NavLink>
          <NavLink href='/gender/women'>Mujeres</NavLink>
          <NavLink href='/gender/kids'>Niños</NavLink>
        </Menu>
      </MenuContainer>
      <div className='grow lg:hidden' />
      <ButtonContainer>
        <Button ghost shape='square' size='sm'>
          <Search aria-label='icon' className='size-[85%] stroke-[1.5]' role='img' />
        </Button>
        <Indicator>
          <Indicator.Badge ghost size='xs'>
            12
          </Indicator.Badge>
          <Button ghost shape='square' size='sm'>
            <ShoppingCart aria-label='icon' className='size-[85%] stroke-[1.5]' role='img' />
          </Button>
        </Indicator>
        <Button as='label' ghost htmlFor={DRAWER_ID} shape='square' size='sm'>
          <MenuIcon aria-label='icon' className='size-[90%] stroke-[1.5]' role='img' />
        </Button>
      </ButtonContainer>
    </DaisyNavbar>
  )
}

const MenuContainer = tw.div`hidden grow text-center lg:block`
const ButtonContainer = tw.div`mr-3 flex items-center justify-center gap-1.5`
