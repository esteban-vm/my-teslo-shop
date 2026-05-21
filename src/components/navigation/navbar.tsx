import { MenuIcon, Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Button, Indicator, Menu, Navbar } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { DRAWER_ID } from '@/lib/constants'
import { NavLink } from './nav-link'

export { MyNavbar as Navbar }

function MyNavbar() {
  return (
    <Navbar as='nav' className='sticky top-0 z-10 w-full'>
      <HomeLink $as={Link} href='/'>
        <span className='font-bold text-rose-700'>Teslo</span> | Shop
      </HomeLink>

      <MenuContainer>
        <Menu as='menu' className='gap-0.5 p-0!' horizontal vanilla>
          <NavLink href='/gender/men' text='Hombres' />
          <NavLink href='/gender/women' text='Mujeres' />
          <NavLink href='/gender/kids' text='Niños' />
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
          <MenuIcon />
        </Button>
      </ButtonContainer>
    </Navbar>
  )
}

const MenuContainer = tw.div`hidden grow text-center lg:block`
const ButtonContainer = tw.div`mr-3 flex items-center justify-center gap-1.5 [&_svg]:size-[90%]`
const HomeLink = tw.a`ml-3 font-montserrat font-semibold hover:opacity-75`
