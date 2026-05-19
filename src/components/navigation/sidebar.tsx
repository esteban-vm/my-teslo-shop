import { LogIn, LogOut, Search, Shirt, Ticket, User, Users } from 'lucide-react'
import { Drawer, Input, Menu } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { DRAWER_ID } from '@/lib/constants'
import { CloseButton } from './close-button'
import { NavLink } from './nav-link'

export function Sidebar() {
  return (
    <Drawer.Side as='aside' className='z-10 h-full' drawerId={DRAWER_ID}>
      <Menu as='menu' className='min-h-full w-fit bg-base-200 p-4' vanilla>
        <Menu.Title className='items-end'>
          <CloseButton />
        </Menu.Title>
        <Menu.Title>
          <Input as='label'>
            <Search role='img' />
            <input placeholder='Buscar' type='search' />
          </Input>
        </Menu.Title>
        <NavLink href='/gender/men'>Hombres</NavLink>
        <NavLink href='/gender/women'>Mujeres</NavLink>
        <NavLink href='/gender/kids'>Niños</NavLink>
        <Separator />
        <NavLink>
          <User className='stroke-[1.5]' role='img' />
          Perfil
        </NavLink>
        <NavLink>
          <Ticket className='stroke-[1.5]' role='img' />
          Órdenes
        </NavLink>
        <NavLink>
          <LogIn className='stroke-[1.5]' role='img' />
          Ingresar
        </NavLink>
        <NavLink>
          <LogOut className='stroke-[1.5]' role='img' />
          Salir
        </NavLink>
        <Separator />
        <NavLink>
          <Shirt className='stroke-[1.5]' role='img' />
          Productos
        </NavLink>
        <NavLink>
          <Users className='stroke-[1.5]' role='img' />
          Usuarios
        </NavLink>
      </Menu>
    </Drawer.Side>
  )
}

const Separator = tw.hr`mx-3 my-2 opacity-25`
