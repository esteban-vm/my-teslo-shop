import { Baby, LogIn, Mars, Shirt, Ticket, User, Users, Venus } from 'lucide-react'
import { Divider, Menu } from 'rsc-daisyui'
import { auth } from '@/auth'
import { NavLink } from '@/components/shared'
import { CloseButton } from './close-button'
import { LogoutButton } from './logout-button'
import { SearchInput } from './search-input'

export async function Sidebar() {
  const session = await auth()
  const isLoggedIn = !!session?.user
  const isAdmin = session?.user.role === 'admin'

  return (
    <Menu as='menu' className='min-h-full w-fit bg-base-200 p-4' vanilla>
      <Menu.Title className='items-end'>
        <CloseButton />
      </Menu.Title>
      <Menu.Title>
        <SearchInput />
      </Menu.Title>
      <NavLink icon={<Mars />} text='Hombres' to='/gender/men' />
      <NavLink icon={<Venus />} text='Mujeres' to='/gender/women' />
      <NavLink icon={<Baby />} text='Niños' to='/gender/kids' />
      <Divider className='mx-4 my-0' />

      {isLoggedIn ? (
        <>
          <NavLink icon={<User />} text='Perfil' to='/' />
          <NavLink icon={<Ticket />} text='Órdenes' to='/' />
          <Divider className='mx-4 my-0' />
        </>
      ) : (
        <NavLink icon={<LogIn />} text='Ingresar' to='/auth/login' />
      )}

      {isAdmin && (
        <>
          <NavLink icon={<Shirt />} text='Productos' to='/' />
          <NavLink icon={<Users />} text='Usuarios' to='/' />
        </>
      )}

      {isLoggedIn && <LogoutButton />}
    </Menu>
  )
}
