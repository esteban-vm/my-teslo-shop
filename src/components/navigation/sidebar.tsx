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
        <NavLink href='/gender/men' text='Hombres' />
        <NavLink href='/gender/women' text='Mujeres' />
        <NavLink href='/gender/kids' text='Niños' />
        <Separator />
        <NavLink icon={<User />} text='Perfil' />
        <NavLink icon={<Ticket />} text='Órdenes' />
        <NavLink icon={<LogIn />} text='Ingresar' />
        <NavLink icon={<LogOut />} text='Salir' />
        <Separator />
        <NavLink icon={<Shirt />} text='Productos' />
        <NavLink icon={<Users />} text='Usuarios' />
      </Menu>
    </Drawer.Side>
  )
}

const Separator = tw.hr`mx-3 my-2 opacity-25`
