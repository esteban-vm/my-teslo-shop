import { Baby, LogIn, Mars, Shirt, Ticket, User, Users, Venus } from 'lucide-react'
import { Divider, Menu } from 'rsc-daisyui'
import { NavLink } from '@/components/shared'
import { CloseButton } from './close-button'
import { LogoutButton } from './logout-button'
import { SearchInput } from './search-input'

export function Sidebar() {
  return (
    <Menu as='menu' className='min-h-full w-fit bg-base-200 p-4' vanilla>
      <Menu.Title className='items-end'>
        <CloseButton />
      </Menu.Title>
      <Menu.Title>
        <SearchInput />
      </Menu.Title>
      <NavLink href='/gender/men' icon={<Mars />} text='Hombres' />
      <NavLink href='/gender/women' icon={<Venus />} text='Mujeres' />
      <NavLink href='/gender/kids' icon={<Baby />} text='Niños' />
      <Divider className='mx-4 my-0' />
      <NavLink href='/' icon={<User />} text='Perfil' />
      <NavLink href='/' icon={<Ticket />} text='Órdenes' />
      <NavLink href='/auth/login' icon={<LogIn />} text='Ingresar' />
      <Divider className='mx-4 my-0' />
      <LogoutButton />
      <NavLink href='/' icon={<Shirt />} text='Productos' />
      <NavLink href='/' icon={<Users />} text='Usuarios' />
    </Menu>
  )
}
