import { Baby, LogIn, Mars, Shirt, Ticket, User, Users, Venus } from 'lucide-react'
import { Divider, Menu } from 'rsc-daisyui'
import { NavLink } from '@/components/shared'
import { getSession } from '@/lib/auth'
import { CloseButton } from './close-button'
import { LogoutButton } from './logout-button'
import { SearchInput } from './search-input'
import { ThemeSwitch } from './theme-switch'

export async function Sidebar() {
  const session = await getSession()
  const isLoggedIn = !!session?.user
  const isAdmin = session?.user.role === 'admin'

  return (
    <Menu as='menu' className='min-h-full w-fit bg-base-200 p-4' id='app_sidebar' vanilla>
      <Menu.Title className='items-end'>
        <CloseButton />
      </Menu.Title>
      <Menu.Title>
        <SearchInput />
      </Menu.Title>
      <NavLink icon={<Mars />} text='Hombres' to='/gender/men' />
      <NavLink icon={<Venus />} text='Mujeres' to='/gender/women' />
      <NavLink icon={<Baby />} text='Niños' to='/gender/kids' />
      <Divider />

      {isLoggedIn ? (
        <>
          <NavLink icon={<User />} text='Mi perfil' to='/profile' />
          <NavLink icon={<Ticket />} text='Mis órdenes' to='/orders' />
          <Divider />
        </>
      ) : (
        <NavLink icon={<LogIn />} text='Ingresar' to='/auth/login' />
      )}

      {isAdmin && (
        <>
          <NavLink icon={<Shirt />} text='Productos' to='/' />
          <NavLink icon={<Ticket />} text='Órdenes' to='/admin/orders' />
          <NavLink icon={<Users />} text='Usuarios' to='/admin/users' />
        </>
      )}

      {isLoggedIn && <LogoutButton />}
      <Divider />
      <ThemeSwitch />
    </Menu>
  )
}
