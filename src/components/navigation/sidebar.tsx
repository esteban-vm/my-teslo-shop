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
            <Search />
            <input placeholder='Buscar' type='search' />
          </Input>
        </Menu.Title>
        <NavLink>Hombres</NavLink>
        <NavLink>Mujeres</NavLink>
        <NavLink>Niños</NavLink>
        <Separator />
        <NavLink>
          <User />
          Perfil
        </NavLink>
        <NavLink>
          <Ticket />
          Órdenes
        </NavLink>
        <NavLink>
          <LogIn />
          Ingresar
        </NavLink>
        <NavLink>
          <LogOut />
          Salir
        </NavLink>
        <Separator />
        <NavLink>
          <Shirt />
          Productos
        </NavLink>
        <NavLink>
          <Users />
          Usuarios
        </NavLink>
      </Menu>
    </Drawer.Side>
  )
}

const Separator = tw.hr`mx-3 my-2 opacity-25`
